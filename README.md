# Food Waste Predictor 🍽️

A web application that predicts food waste in canteens and hostels based on expected attendance, menu type, and food quantity.

## ⚡ Quick Start (Just Cloned?)

```bash
# 1. Install dependencies
cd backend
npm install

# 2. Start backend (Terminal 1)
npm start

# 3. Start frontend (Terminal 2)
cd ../frontend
node server.js

# 4. Open http://localhost:8000 in your browser
```

**Or use the run script:** Double-click `run.bat` (Windows) or run `.\run.ps1` (PowerShell)

**That's it!** No API keys, no configuration needed. Just install and run.

---

## 🚀 Getting Started (Detailed Instructions)

### Prerequisites

Before you begin, make sure you have:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd food-waste-predictor
```

### Step 2: Install Dependencies

```bash
cd backend
npm install
```

This will install all required packages (Express, CORS, etc.)

### Step 3: Start the Application

**Option A: Use the Run Script (Easiest - Windows)**

Double-click `run.bat` in the project root, or run:
```bash
.\run.bat
```

**Option B: Manual Start**

1. **Start Backend Server** (Terminal 1):
   ```bash
   cd backend
   npm start
   ```
   You should see: `🚀 Server running on http://localhost:5000`

2. **Start Frontend Server** (Terminal 2):
   ```bash
   cd frontend
   node server.js
   ```
   You should see: `🚀 Frontend server running at http://localhost:8000/`

3. **Open in Browser:**
   Go to: `http://localhost:8000`

### Step 4: Test It!

1. Enter attendance: `150`
2. Select menu type: `Vegetarian`
3. Enter food quantity: `50` kg
4. Click **Get Prediction**

You should see the prediction results! 🎉

**That's it!** No API keys, no external services, no complex setup needed.

## 🏗️ Architecture

The application consists of three main components:

1. **Frontend** - User interface built with HTML, CSS, and JavaScript
2. **Backend** - Node.js/Express API server
3. **ML Model** - Python-based prediction logic (can be integrated later)


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

## 📋 Quick Reference

**Install dependencies:**
```bash
cd backend && npm install
```

**Start backend:**
```bash
cd backend && npm start
```

**Start frontend:**
```bash
cd frontend && node server.js
```

**Or use the run script:**
```bash
.\run.bat  # Windows
.\run.ps1  # PowerShell
```

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
- **services/sheetsService.js** - Google Sheets integration (optional)
- **config/googleSheetsAuth.js** - Google Sheets auth (optional)

## 📝 Notes

- The ML model (`ml-model/`) contains Python code that can be integrated later
- The backend uses historical data embedded in the code (can be moved to a database)
- **No external dependencies required**: The application runs immediately after installing npm packages

## 🐛 Troubleshooting

**"npm is not recognized" or "node is not recognized"**
- Install Node.js from [nodejs.org](https://nodejs.org/)
- Restart your terminal after installation

**"Cannot find module" errors**
- Make sure you ran `npm install` in the `backend` folder
- Delete `node_modules` folder and `package-lock.json`, then run `npm install` again

**Backend won't start:**
- Make sure port 5000 is not in use
- Check that all dependencies are installed: `npm install`
- Look for error messages in the terminal

**Frontend shows "Failed to get prediction":**
- Ensure backend is running on `http://localhost:5000`
- Check that you see the backend server message: `🚀 Server running on http://localhost:5000`
- Open browser console (F12) to see detailed error messages

**Port already in use:**
- Close other applications using ports 5000 or 8000
- Or change the PORT in `backend/server.js` (line 6) and `frontend/server.js` (line 6)

**Still having issues?**
- Make sure both servers are running (backend on port 5000, frontend on port 8000)
- Check that you're opening `http://localhost:8000` (not 5000)
- Verify Node.js version: `node --version` (should be v14 or higher)

## 📄 License

ISC

