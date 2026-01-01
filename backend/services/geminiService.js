/**
 * Google Gemini AI Service
 * Purpose: Use Google's Gemini AI to generate intelligent, contextual suggestions
 * 
 * This file uses Google Gemini API to enhance predictions with AI-generated insights
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
// Get API key from environment variable or use default (for development)
const API_KEY = process.env.GOOGLE_GEMINI_API_KEY || '';
let genAI = null;
let model = null;

// Initialize Gemini if API key is available
if (API_KEY) {
    try {
        genAI = new GoogleGenerativeAI(API_KEY);
        // Use gemini-2.0-flash (fast and available) or fallback to gemini-2.5-flash
        try {
            model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
            console.log('✅ Google Gemini AI initialized successfully (using gemini-2.0-flash)');
        } catch (flashError) {
            try {
                model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
                console.log('✅ Google Gemini AI initialized successfully (using gemini-2.5-flash)');
            } catch (proError) {
                model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
                console.log('✅ Google Gemini AI initialized successfully (using gemini-2.5-pro)');
            }
        }
    } catch (error) {
        console.warn('⚠️ Failed to initialize Gemini AI:', error.message);
    }
} else {
    console.warn('⚠️ GOOGLE_GEMINI_API_KEY not set. Gemini AI features will be disabled.');
}

/**
 * Generate AI-powered suggestion using Gemini
 * @param {Object} predictionData - Prediction data
 * @param {string} predictionData.wasteLevel - Waste level (low/medium/high)
 * @param {number} predictionData.wasteKg - Waste in kilograms
 * @param {number} predictionData.wastePercentage - Waste percentage
 * @param {number} predictionData.attendance - Expected attendance
 * @param {string} predictionData.menuType - Menu type (veg/nonveg/special)
 * @param {number} predictionData.foodQuantity - Food quantity in kg
 * @returns {Promise<string>} - AI-generated suggestion
 */
async function generateAISuggestion(predictionData) {
    // If Gemini is not available, return null to fall back to default suggestions
    if (!model) {
        return null;
    }

    try {
        const { wasteLevel, wasteKg, wastePercentage, attendance, menuType, foodQuantity } = predictionData;
        
        // Calculate recommended quantity
        const expectedConsumption = attendance * 0.3;
        const recommendedQuantity = expectedConsumption * 1.1;

        // Create a detailed prompt for Gemini
        const prompt = `You are a food waste management expert for canteens and hostels. Based on the following prediction data, provide a concise, actionable suggestion (2-3 sentences max) to help reduce food waste.

Prediction Details:
- Expected Attendance: ${attendance} people
- Menu Type: ${menuType === 'veg' ? 'Vegetarian' : menuType === 'nonveg' ? 'Non-Vegetarian' : 'Special Event'}
- Food Quantity Prepared: ${foodQuantity} kg
- Predicted Waste Level: ${wasteLevel.toUpperCase()}
- Estimated Waste: ${wasteKg} kg (${wastePercentage}% of prepared food)
- Expected Consumption: ${expectedConsumption.toFixed(1)} kg
- Recommended Quantity: ${recommendedQuantity.toFixed(1)} kg

Provide a practical, actionable suggestion that:
1. Addresses the waste level (${wasteLevel})
2. Gives specific recommendations for food preparation
3. Includes tips for monitoring and reducing waste
4. Is encouraging and professional

Keep it concise (2-3 sentences), use emojis sparingly, and focus on actionable advice.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const suggestion = response.text().trim();

        if (!suggestion || suggestion.length === 0) {
            console.warn('AI returned empty suggestion');
            return null;
        }

        console.log('✅ AI suggestion generated:', suggestion.substring(0, 50) + '...');
        return suggestion;
    } catch (error) {
        if (error.status === 429) {
            console.warn('⚠️ Gemini API quota exceeded. Using default suggestions.');
            console.warn('   To enable AI: Check your quota at https://ai.dev/usage?tab=rate-limit');
        } else {
            console.error('❌ Error generating AI suggestion:', error.message);
        }
        // Return null to fall back to default suggestion
        return null;
    }
}

/**
 * Generate additional insights using Gemini
 * @param {Object} predictionData - Prediction data
 * @returns {Promise<Object>} - Additional AI insights
 */
async function generateAIInsights(predictionData) {
    if (!model) {
        return null;
    }

    try {
        const { attendance, menuType, wasteLevel } = predictionData;
        
        const prompt = `As a food waste management expert, provide 2-3 brief tips (one sentence each) for managing food waste in a ${menuType === 'veg' ? 'vegetarian' : menuType === 'nonveg' ? 'non-vegetarian' : 'special event'} canteen serving ${attendance} people, where the predicted waste level is ${wasteLevel}. Focus on practical, actionable tips. Format as a simple list.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const insights = response.text().trim();

        if (!insights || insights.length === 0) {
            console.warn('AI returned empty insights');
            return null;
        }

        const tips = insights.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0 && !line.match(/^\d+[\.\)]/)) // Remove numbered list markers
            .map(line => line.replace(/^[-•*]\s*/, '').trim()) // Remove bullet points
            .filter(line => line.length > 10); // Filter out very short lines

        if (tips.length === 0) {
            console.warn('No valid tips extracted from AI response');
            return null;
        }

        console.log(`✅ AI insights generated: ${tips.length} tips`);
        return {
            tips: tips
        };
    } catch (error) {
        if (error.status === 429) {
            console.warn('⚠️ Gemini API quota exceeded for insights.');
        } else {
            console.error('❌ Error generating AI insights:', error.message);
        }
        return null;
    }
}

module.exports = {
    generateAISuggestion,
    generateAIInsights,
    isAvailable: () => model !== null
};

