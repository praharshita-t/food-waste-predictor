// Get form and result elements
const form = document.getElementById('predictionForm');
const resultsDiv = document.getElementById('results');
const wasteLevelSpan = document.getElementById('wasteLevel');
const wasteAmountP = document.getElementById('wasteAmount');
const suggestionP = document.getElementById('suggestion');
const aiInsightsDiv = document.getElementById('aiInsights');
const aiInsightsList = document.getElementById('aiInsightsList');
const aiStatusText = document.getElementById('aiStatusText');
const aiSetupStatus = document.getElementById('aiSetupStatus');
const aiSetupInstructions = document.getElementById('aiSetupInstructions');

// Check AI status on page load
checkAIStatus();

// Handle form submission
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form values
    const attendance = parseInt(document.getElementById('attendance').value);
    const menuType = document.getElementById('menuType').value;
    const foodQuantity = parseFloat(document.getElementById('foodQuantity').value);
    
    // Prepare data to send to backend
    const data = {
        attendance: attendance,
        menu_type: menuType,
        food_quantity: foodQuantity
    };
    
    // Show loading state
    const submitBtn = form.querySelector('.btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Predicting...';
    submitBtn.disabled = true;
    
    try {
        // Call backend API
        const response = await fetch('http://localhost:5000/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`Backend error: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Display results
        displayResults(result);
        
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to get prediction. Please check if backend is running.');
    } finally {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Display prediction results
function displayResults(result) {
    // Update waste level badge
    wasteLevelSpan.textContent = result.waste_level.toUpperCase();
    wasteLevelSpan.className = 'badge ' + result.waste_level;
    
    // Update waste amount
    wasteAmountP.textContent = `${result.waste_kg} kg (${result.waste_percentage}% of prepared food)`;
    
    // Update suggestion
    suggestionP.textContent = result.suggestion;
    
    // Show/hide AI insights if available
    if (result.ai_enhanced && result.ai_insights && result.ai_insights.length > 0) {
        aiInsightsList.innerHTML = '';
        result.ai_insights.forEach(tip => {
            const li = document.createElement('li');
            li.textContent = tip;
            aiInsightsList.appendChild(li);
        });
        aiInsightsDiv.style.display = 'block';
    } else {
        aiInsightsDiv.style.display = 'none';
    }
    
    // Update AI status indicator
    if (result.ai_enhanced) {
        aiStatusText.textContent = '🤖 AI-Enhanced (Google Gemini Active)';
        aiStatusText.className = 'ai-active';
    }
    
    // Show results card
    resultsDiv.style.display = 'block';
    
    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
}

// Check AI status from backend
async function checkAIStatus() {
    try {
        // Make a test prediction to check AI status
        const testResponse = await fetch('http://localhost:5000/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                attendance: 100,
                menu_type: 'veg',
                food_quantity: 30
            })
        });
        
        if (testResponse.ok) {
            const testResult = await testResponse.json();
            
            if (testResult.ai_enhanced) {
                aiStatusText.textContent = '🤖 AI-Enhanced (Google Gemini Active)';
                aiStatusText.className = 'ai-active';
                aiSetupStatus.textContent = '✅ Enabled';
                aiSetupStatus.style.color = '#4CAF50';
            } else {
                aiStatusText.textContent = '⚙️ Standard Mode (AI Not Configured)';
                aiStatusText.className = 'ai-inactive';
                aiSetupStatus.textContent = '❌ Not Configured';
                aiSetupStatus.style.color = '#f44336';
                aiSetupInstructions.style.display = 'block';
            }
        }
    } catch (error) {
        console.error('Error checking AI status:', error);
        aiStatusText.textContent = '⚠️ Unable to check AI status';
        aiStatusText.className = 'ai-error';
        aiSetupStatus.textContent = '❓ Unknown';
    }
}

// Backend response format:
/*
{
    "waste_level": "low" | "medium" | "high",
    "waste_kg": "2.5",
    "waste_percentage": "5.2",
    "suggestion": "Your suggestion text here"
}
*/