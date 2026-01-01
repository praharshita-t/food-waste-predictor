# Food Waste Predictor - Backend API

## Overview

This is the backend API for the Food Waste Predictor application. It provides prediction services for estimating food waste based on attendance, menu type, and food quantity.

## Architecture

The backend follows a three-layer architecture:

1. **Server Layer** (`server.js`) - Receives HTTP requests
2. **Routes & Services Layer** - Processes data and business logic
3. **External Services Layer** - ML predictions, Google Gemini AI, and Google Sheets integration

## API Endpoints

### POST `/api/predict`

Predicts food waste based on input parameters.

**Request Body:**
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
  "suggestion": "✅ Excellent planning! Waste level is minimal (5.2%). Continue with current preparation strategy.",
  "ai_enhanced": true,
  "ai_insights": [
    "Monitor portion sizes during peak hours to minimize waste.",
    "Consider implementing a feedback system to track actual consumption patterns."
  ]
}
```

**Response Fields:**
- `waste_level` - Predicted waste level (low/medium/high)
- `waste_kg` - Estimated waste in kilograms
- `waste_percentage` - Waste as percentage of prepared food
- `suggestion` - Actionable suggestion (AI-enhanced if Gemini API key is set)
- `ai_enhanced` - Boolean indicating if AI was used
- `ai_insights` - Additional AI-generated tips (only if Gemini is enabled)

**Menu Types:**
- `veg` - Vegetarian
- `nonveg` - Non-Vegetarian
- `special` - Special Event

**Waste Levels:**
- `low` - 2-5% waste
- `medium` - 6-15% waste
- `high` - 16-30% waste

## Project Structure

```
backend/
├── server.js                 # Express server entry point
├── routes/
│   └── foodRoutes.js        # API endpoint definitions
├── services/
│   ├── dataProcessor.js     # Input validation and cleaning
│   ├── predictionService.js # Prediction logic
│   ├── geminiService.js     # Google Gemini AI integration
│   └── sheetsService.js     # Google Sheets integration (optional)
├── config/
│   └── googleSheetsAuth.js  # Google Sheets authentication
├── package.json
└── README.md
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:5000` by default.

## Environment Variables

Optional environment variables:
- `PORT` - Server port (default: 5000)
- `GOOGLE_GEMINI_API_KEY` - Google Gemini API key for AI-enhanced suggestions (optional)
- `GOOGLE_SHEETS_ID` - Google Sheets spreadsheet ID (for future use)

### Setting up Google Gemini AI

1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Set it as an environment variable:
   ```bash
   # Windows PowerShell
   $env:GOOGLE_GEMINI_API_KEY="your-api-key-here"
   
   # Linux/Mac
   export GOOGLE_GEMINI_API_KEY="your-api-key-here"
   ```
3. Restart the server

**Note:** If the API key is not set, the system will automatically fall back to default rule-based suggestions. The application works perfectly without it, but AI enhancement provides more intelligent, contextual recommendations.

## How It Works

1. **Request Reception**: `server.js` receives HTTP requests
2. **Route Handling**: `foodRoutes.js` handles the `/api/predict` endpoint
3. **Data Processing**: `dataProcessor.js` validates and cleans input
4. **Prediction**: `predictionService.js` uses historical data to predict waste
5. **Response**: Returns prediction results to the frontend

## Prediction Logic

The prediction service uses historical data matching:
- Filters historical records by menu type
- Finds the closest attendance match
- Returns the corresponding waste level
- Calculates waste amount and percentage
- Generates actionable suggestions

### AI Enhancement (Google Gemini)

When `GOOGLE_GEMINI_API_KEY` is set, the system uses Google's Gemini AI to:
- Generate intelligent, contextual suggestions based on prediction data
- Provide additional actionable tips for waste reduction
- Create personalized recommendations for different menu types and attendance levels

The AI enhancement is optional - if the API key is not available, the system automatically uses rule-based suggestions.

## Google AI Technologies Used

### ✅ Google Gemini AI
- **Purpose**: Generate intelligent, contextual suggestions for food waste reduction
- **Integration**: `backend/services/geminiService.js`
- **Model**: `gemini-pro`
- **Features**:
  - AI-powered suggestion generation
  - Additional insights and tips
  - Context-aware recommendations
- **Status**: Fully integrated (optional - works without API key)

### 🔄 Google Sheets API
- **Purpose**: Data persistence and historical data storage
- **Status**: Infrastructure prepared, ready for implementation

## Future Enhancements

- Complete Google Sheets integration for data persistence
- Machine learning model integration
- Historical data analysis endpoints
- Real-time data updates
- Advanced AI features (trend analysis, predictive insights)

