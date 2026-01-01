# Food Waste Predictor 🍽️

A web application that predicts food waste in canteens and hostels based on expected attendance, menu type, and food quantity. Enhanced with **Google Gemini AI** for intelligent, contextual suggestions.

## 🏗️ Architecture

The application consists of three main components:

1. **Frontend** - User interface built with HTML, CSS, and JavaScript
2. **Backend** - Node.js/Express API server with **Google Gemini AI** integration
3. **ML Model** - Python-based prediction logic (can be integrated later)

## 🤖 Google AI Technologies

### ✅ Google Gemini AI (Integrated)
- **Purpose**: Generate intelligent, contextual suggestions for food waste reduction
- **Status**: Fully integrated and optional
- **Setup**: See [GEMINI_SETUP.md](GEMINI_SETUP.md) for configuration
- **Benefits**: 
  - AI-powered, personalized recommendations
  - Context-aware suggestions based on prediction data
  - Additional actionable tips for waste reduction

### 🔄 Google Sheets API (Prepared)
- **Purpose**: Data persistence and historical data storage
- **Status**: Infrastructure ready, implementation pending

## 📁 Project Structure

```
food-waste-predictor/
├── frontend/
│   ├── index.html      # Main HTML page
│   ├── app.js          # Frontend JavaScript
│   └── styles.css      # Styling
├── backend/
│   ├── server.js       # Express server entry point
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── config/         # Configuration files
│   └── package.json    # Backend dependencies
├── ml-model/
│   ├── waste_prediction.py  # ML prediction logic
│   ├── app.py          # Flask API (alternative)
│   └── sample_data.csv # Historical data
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 2: Start the Backend Server

```bash
npm start
```

The backend will run on `http://localhost:5000`

### Step 3: Open the Frontend

Open `frontend/index.html` in your web browser, or use a local server:

**Option A: Using Python (if installed)**
```bash
cd frontend
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

**Option B: Using Node.js http-server**
```bash
npm install -g http-server
cd frontend
http-server -p 8000
```

**Option C: Direct file open**
Simply double-click `frontend/index.html` (may have CORS issues with fetch API)

## 🎯 How to Use

1. Enter the **Expected Attendance** (number of people)
2. Select the **Menu Type**:
   - Vegetarian
   - Non-Vegetarian
   - Special Event
3. Enter the **Food Quantity** in kilograms
4. Click **Get Prediction**

The system will show:
- **Waste Level**: Low, Medium, or High
- **Estimated Waste**: Amount in kg and percentage
- **Suggestion**: Actionable advice for food preparation

## 🔌 API Endpoints

### POST `/api/predict`

Predicts food waste based on input parameters.

**Request:**
```json
{
  "attendance": 150,
  "menu_type": "veg",
  "food_quantity": 50
}
```

**Response:**
```json
{
  "waste_level": "low",
  "waste_kg": "2.5",
  "waste_percentage": "5.2",
  "suggestion": "✅ Excellent planning! Waste level is minimal..."
}
```

## 🧠 How It Works

The prediction system uses historical data matching:

1. Filters historical records by menu type
2. Finds the closest attendance match
3. Returns the corresponding waste level (low/medium/high)
4. Calculates waste amount and percentage
5. Generates actionable suggestions

## 🔧 Development

### Backend Development

```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

### Backend Structure

- **server.js** - Express app setup and server start
- **routes/foodRoutes.js** - API endpoint definitions
- **services/dataProcessor.js** - Input validation
- **services/predictionService.js** - Prediction logic
- **services/geminiService.js** - Google Gemini AI integration ✨
- **services/sheetsService.js** - Google Sheets integration (optional)
- **config/googleSheetsAuth.js** - Google Sheets auth (optional)

## 📝 Notes

- **Google Gemini AI**: Optional but recommended for enhanced suggestions. See [GEMINI_SETUP.md](GEMINI_SETUP.md)
- The ML model (`ml-model/`) contains Python code that can be integrated later
- Google Sheets integration is prepared but not required for basic functionality
- The backend uses historical data embedded in the code (can be moved to a database)
- **Works without API keys**: The application functions perfectly without Google services, but AI enhancement provides better recommendations

## 🐛 Troubleshooting

**Backend won't start:**
- Make sure port 5000 is not in use
- Check that all dependencies are installed: `npm install`

**Frontend can't connect to backend:**
- Ensure backend is running on `http://localhost:5000`
- Check browser console for CORS errors
- If opening HTML directly, use a local server instead

**CORS errors:**
- Backend has CORS enabled, but if issues persist, check the CORS configuration in `server.js`

## 📄 License

ISC

