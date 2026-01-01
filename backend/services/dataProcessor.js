/**
 * Data Processor Service
 * Purpose: Prepare and validate data before prediction
 * 
 * This file answers: "Is the input safe and usable?"
 */

/**
 * Process and validate input data
 * @param {Object} rawInput - Raw input from request
 * @returns {Object} - Cleaned and validated input
 */
function processInput(rawInput) {
    // Convert attendance to number
    let attendance = parseInt(rawInput.attendance);
    if (isNaN(attendance) || attendance < 1) {
        attendance = 100; // Default value
    }
    
    // Validate and normalize menu type
    const validMenuTypes = ['veg', 'nonveg', 'special'];
    let menuType = (rawInput.menu_type || '').toLowerCase();
    if (!validMenuTypes.includes(menuType)) {
        menuType = 'veg'; // Default to vegetarian
    }
    
    // Convert food quantity to number
    let foodQuantity = parseFloat(rawInput.food_quantity);
    if (isNaN(foodQuantity) || foodQuantity <= 0) {
        // Calculate default based on attendance if not provided
        foodQuantity = attendance * 0.3; // Default 0.3 kg per person
    }
    
    return {
        attendance: attendance,
        menu_type: menuType,
        food_quantity: foodQuantity
    };
}

module.exports = {
    processInput
};

