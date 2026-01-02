// Get form and result elements
const form = document.getElementById('predictionForm');
const resultsDiv = document.getElementById('results');
const wasteLevelSpan = document.getElementById('wasteLevel');
const wasteAmountP = document.getElementById('wasteAmount');
const suggestionP = document.getElementById('suggestion');

// Remove AI status check (no longer needed)

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
    
    // Show results card
    resultsDiv.style.display = 'block';
    
    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
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