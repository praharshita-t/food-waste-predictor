# ML Model Usage in Food Waste Predictor

## Overview

The `ml-model` folder contains the **original Python-based prediction logic** that serves as the foundation for the food waste prediction system. While the current Node.js backend implements the same logic, the ML model provides an alternative implementation and reference.

---

## 📁 ML Model Structure

```
ml-model/
├── waste_prediction.py    # Core prediction algorithm
├── app.py                 # Flask API server (alternative backend)
├── sample_data.csv        # Historical training/reference data
└── prediction_logic.md    # Documentation of the prediction approach
```

---

## 🧠 What is the ML Model?

### Core Functionality

The ML model uses a **nearest-neighbor matching algorithm** to predict food waste levels:

1. **Input**: Expected attendance and menu type
2. **Process**: Finds the closest historical match
3. **Output**: Predicted waste level (low/medium/high)

### Algorithm Details

```python
def predict(attendance, menu_type):
    # 1. Filter historical data by menu type
    filtered = data[data["menu_type"] == menu_type]
    
    # 2. Find closest attendance match
    filtered["diff"] = abs(filtered["attendance"] - attendance)
    closest_row = filtered.sort_values("diff").iloc[0]
    
    # 3. Return corresponding waste level
    return closest_row["waste_level"]
```

---

## 📊 Historical Data (`sample_data.csv`)

The model uses historical data with the following structure:

| attendance | menu_type | waste_level |
|------------|-----------|-------------|
| 50         | veg       | low         |
| 80         | veg       | low         |
| 120        | veg       | medium      |
| 150        | veg       | medium      |
| 200        | veg       | high        |
| 50         | nonveg    | low         |
| 80         | nonveg    | medium      |
| ...        | ...       | ...         |

**Data Points**: 15 historical records covering:
- **Menu Types**: Vegetarian, Non-Vegetarian, Special Event
- **Attendance Range**: 50-200 people
- **Waste Levels**: Low, Medium, High

---

## 🔄 Current Implementation Status

### ✅ **Reimplemented in Node.js Backend**

The prediction logic from `ml-model/waste_prediction.py` has been **reimplemented in JavaScript** in:
- **File**: `backend/services/predictionService.js`
- **Function**: `predictWasteLevel(attendance, menuType)`
- **Status**: ✅ **Currently Active**

### 🔄 **Python ML Model (Alternative)**

The original Python implementation is available as:
- **Standalone Script**: `ml-model/waste_prediction.py`
- **Flask API**: `ml-model/app.py`
- **Status**: 🔄 **Available but not actively used**

---

## 🎯 How It's Used

### Current Architecture

```
Frontend (HTML/JS)
    ↓
Backend (Node.js/Express)
    ↓
predictionService.js (JavaScript implementation)
    ↓
Uses same logic as ml-model/waste_prediction.py
    ↓
Returns prediction with actionable suggestions
```

### Why Reimplemented?

1. **Unified Stack**: Keep everything in Node.js/JavaScript
2. **No Python Dependency**: Avoids requiring Python runtime
3. **Same Logic**: Identical algorithm, different language
4. **Better Integration**: Easier to integrate with Express backend

---

## 🔀 Alternative: Using Python ML Model

### Option 1: Flask API Server

You can run the Python Flask server as an alternative backend:

```bash
cd ml-model
pip install flask pandas
python app.py
```

This would run on `http://localhost:5000` (or another port) and provide:
- **Endpoint**: `POST /predict`
- **Input**: `{ "attendance": 150, "menu_type": "veg" }`
- **Output**: `{ "waste_level": "medium", "waste_kg": "...", ... }`

### Option 2: Direct Python Script

Use the prediction function directly:

```python
from waste_prediction import predict

waste_level = predict(attendance=150, menu_type="veg")
print(waste_level)  # Output: "medium"
```

---

## 📈 Prediction Logic

### How It Works

1. **Historical Data Matching**
   - Filters past records by menu type
   - Finds attendance value closest to input
   - Returns corresponding waste level

2. **Waste Level Mapping**
   ```python
   waste_map = {
       "low": (2, 5),      # 2-5% waste
       "medium": (6, 15),  # 6-15% waste
       "high": (16, 30)    # 16-30% waste
   }
   ```

3. **Waste Calculation**
   ```python
   waste_kg = (attendance * 0.3) * (max_waste_percentage / 100)
   ```

### Why This Approach?

- ✅ **Simple & Fast**: No complex ML training required
- ✅ **Transparent**: Easy to understand and explain
- ✅ **Effective**: Historical patterns are reliable predictors
- ✅ **Real-time**: Suitable for live canteen use

---

## 🔗 Integration with Current Solution

### Current Flow

```
User Input (Frontend)
    ↓
POST /api/predict (Backend)
    ↓
dataProcessor.js (Validate input)
    ↓
predictionService.js (Predict waste level)
    ├─ Uses same logic as ml-model/waste_prediction.py
    └─ Historical data embedded in JavaScript
    ↓
    ↓
Return prediction + AI suggestions
```

### ML Model's Role

- **Reference Implementation**: Shows the original algorithm
- **Alternative Backend**: Can be used as Flask API if preferred
- **Documentation**: Explains the prediction approach
- **Historical Data**: Source of training/reference data

---

## 🚀 Future Enhancements

### Potential ML Model Improvements

1. **More Sophisticated Models**
   - Linear regression
   - Decision trees
   - Neural networks

2. **Feature Engineering**
   - Weather data
   - Day of week
   - Seasonal patterns
   - Previous day's waste

3. **Model Training**
   - Use historical data to train models
   - Cross-validation
   - Model evaluation metrics

4. **Real ML Integration**
   - TensorFlow.js for browser-side predictions
   - Scikit-learn models
   - Google Vertex AI for advanced models

---

## 📝 Files Explained

### `waste_prediction.py`
- **Purpose**: Core prediction function
- **Function**: `predict(attendance, menu_type)`
- **Returns**: Waste level string ("low", "medium", "high")
- **Algorithm**: Nearest-neighbor matching

### `app.py`
- **Purpose**: Flask API server
- **Endpoint**: `POST /predict`
- **Use Case**: Alternative backend implementation
- **Dependencies**: Flask, pandas

### `sample_data.csv`
- **Purpose**: Historical reference data
- **Format**: CSV with attendance, menu_type, waste_level
- **Usage**: Loaded by waste_prediction.py
- **Size**: 15 data points

### `prediction_logic.md`
- **Purpose**: Documentation
- **Content**: Explains the prediction approach
- **Audience**: Developers and stakeholders

---

## 🔧 Usage Examples

### Using Python ML Model Directly

```python
# Import the prediction function
from waste_prediction import predict

# Make predictions
result1 = predict(attendance=150, menu_type="veg")
print(result1)  # "medium"

result2 = predict(attendance=80, menu_type="nonveg")
print(result2)  # "medium"

result3 = predict(attendance=200, menu_type="special")
print(result3)  # "high"
```

### Using Flask API

```bash
# Start Flask server
cd ml-model
python app.py

# Make API call
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"attendance": 150, "menu_type": "veg"}'
```

---

## ✅ Summary

### Current Status

- **ML Model**: ✅ Available as reference/alternative
- **Backend Implementation**: ✅ Active in Node.js (same logic)
- **Integration**: ✅ Logic reimplemented in JavaScript
- **Usage**: 🔄 Can be used as alternative Flask backend

### Key Points

1. **Same Algorithm**: Both implementations use identical logic
2. **Different Languages**: Python (original) vs JavaScript (current)
3. **Historical Data**: Embedded in both implementations
4. **Flexibility**: Can switch between implementations if needed

### Recommendation

- **Current Solution**: Use Node.js backend (already implemented)
- **Alternative**: Use Python Flask API if you prefer Python
- **Future**: Can enhance with more sophisticated ML models

---

**The ML model serves as the foundation and reference implementation for the prediction logic, which is currently active in the Node.js backend.**

