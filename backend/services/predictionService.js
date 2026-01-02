/**
 * Prediction Service
 * Purpose: This is the brain of the backend (but not ML training)
 * 
 * This file answers: "Given input, what is the waste prediction?"
 */


// Historical data (based on sample_data.csv)
// In production, this could be loaded from a database or Google Sheets
const historicalData = [
    { attendance: 50, menu_type: 'veg', waste_level: 'low' },
    { attendance: 80, menu_type: 'veg', waste_level: 'low' },
    { attendance: 120, menu_type: 'veg', waste_level: 'medium' },
    { attendance: 150, menu_type: 'veg', waste_level: 'medium' },
    { attendance: 200, menu_type: 'veg', waste_level: 'high' },
    { attendance: 50, menu_type: 'nonveg', waste_level: 'low' },
    { attendance: 80, menu_type: 'nonveg', waste_level: 'medium' },
    { attendance: 120, menu_type: 'nonveg', waste_level: 'medium' },
    { attendance: 150, menu_type: 'nonveg', waste_level: 'high' },
    { attendance: 200, menu_type: 'nonveg', waste_level: 'high' },
    { attendance: 50, menu_type: 'special', waste_level: 'medium' },
    { attendance: 80, menu_type: 'special', waste_level: 'medium' },
    { attendance: 120, menu_type: 'special', waste_level: 'high' },
    { attendance: 150, menu_type: 'special', waste_level: 'high' },
    { attendance: 200, menu_type: 'special', waste_level: 'high' }
];

/**
 * Predict waste level based on historical data
 * Uses the same logic as the ML model: find closest attendance match
 */
function predictWasteLevel(attendance, menuType) {
    // Filter data for same menu type
    const filtered = historicalData.filter(item => item.menu_type === menuType);
    
    // If no data exists, return medium by default
    if (filtered.length === 0) {
        return 'medium';
    }
    
    // Find closest attendance match
    let closest = filtered[0];
    let minDiff = Math.abs(closest.attendance - attendance);
    
    for (const item of filtered) {
        const diff = Math.abs(item.attendance - attendance);
        if (diff < minDiff) {
            minDiff = diff;
            closest = item;
        }
    }
    
    return closest.waste_level;
}

/**
 * Calculate waste amount and percentage
 * Matches the ML model's calculation approach
 */
function calculateWaste(foodQuantity, attendance, wasteLevel) {
    // Waste percentage ranges based on waste level (matches ML model)
    const wastePercentageMap = {
        'low': { min: 2, max: 5 },
        'medium': { min: 6, max: 15 },
        'high': { min: 16, max: 30 }
    };
    
    const { min, max } = wastePercentageMap[wasteLevel] || wastePercentageMap['medium'];
    const wastePercentage = max; // Use max value (matches ML model approach)
    
    // Calculate waste in kg using ML model formula: (attendance * 0.3) * (max_w / 100)
    const expectedConsumption = attendance * 0.3; // Average consumption per person
    const wasteKg = expectedConsumption * (wastePercentage / 100);
    
    return {
        wasteKg: Math.max(0, wasteKg.toFixed(2)),
        wastePercentage: wastePercentage.toFixed(1)
    };
}

/**
 * Generate suggestion based on waste level
 */
function generateSuggestion(wasteLevel, wasteKg, wastePercentage, foodQuantity, attendance) {
    const expectedConsumption = attendance * 0.3;
    const recommendedQuantity = expectedConsumption * 1.1; // 10% buffer
    
    switch (wasteLevel) {
        case 'high':
            return `⚠️ High waste predicted! Consider reducing preparation by ${wastePercentage}%. Prepare around ${recommendedQuantity.toFixed(1)} kg instead of ${foodQuantity} kg. Monitor portions during service.`;
        
        case 'medium':
            return `⚡ Moderate waste expected (${wastePercentage}%). Monitor portions during service and adjust if needed. Consider preparing ${recommendedQuantity.toFixed(1)} kg for better efficiency.`;
        
        case 'low':
            return `✅ Excellent planning! Waste level is minimal (${wastePercentage}%). Continue with current preparation strategy.`;
        
        default:
            return 'Monitor food consumption and adjust preparation accordingly.';
    }
}

/**
 * Main prediction function
 * @param {Object} input - Processed input { attendance, menu_type, food_quantity }
 * @returns {Object} - Prediction result
 */
function predict(input) {
    const { attendance, menu_type, food_quantity } = input;
    
    // Predict waste level
    const wasteLevel = predictWasteLevel(attendance, menu_type);
    
    // Calculate waste amounts
    const { wasteKg, wastePercentage } = calculateWaste(food_quantity, attendance, wasteLevel);
    
    // Generate suggestion using default rule-based approach
    const suggestion = generateSuggestion(wasteLevel, wasteKg, wastePercentage, food_quantity, attendance);
    
    // Build response
    const response = {
        waste_level: wasteLevel,
        waste_kg: wasteKg,
        waste_percentage: wastePercentage,
        suggestion: suggestion
    };
    
    return response;
}

module.exports = {
    predict
};

