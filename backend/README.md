# Food Waste Predictor - Backend API

## Overview

This is the backend API for the Food Waste Predictor application. It provides prediction services for estimating food waste based on attendance, menu type, and food quantity.

## Architecture

The backend follows a three-layer architecture:

1. **Server Layer** (`server.js`) - Receives HTTP requests
2. **Routes & Services Layer** - Processes data and business logic
3. **External Services Layer** - ML predictions and optional Google Sheets integration

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
- `suggestion` - Actionable suggestion based on prediction data

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
- `GOOGLE_SHEETS_ID` - Google Sheets spreadsheet ID (for future use)

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

## Google Technologies Used

### 🔄 Google Sheets API
- **Purpose**: Data persistence and historical data storage
- **Status**: Infrastructure prepared, ready for implementation

## Future Enhancements

- Complete Google Sheets integration for data persistence
- Machine learning model integration
- Historical data analysis endpoints
- Real-time data updates
- Advanced AI features (trend analysis, predictive insights)

