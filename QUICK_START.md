# Quick Start - Food Waste Predictor 🚀

## Super Simple Setup (2 Steps!)

### Step 1: Install Dependencies
Open PowerShell or Command Prompt in the `backend` folder and run:
```bash
npm install
```

### Step 2: Run the Application

**Option A: Use the Run Script (Easiest)**
- Double-click `run.bat` (Windows) or run `.\run.ps1` (PowerShell)
- This will start both backend and frontend automatically

**Option B: Manual Start**

1. **Start Backend:**
   ```bash
   cd backend
   npm start
   ```
   You should see: `🚀 Server running on http://localhost:5000`

2. **Start Frontend (in a new terminal):**
   ```bash
   cd frontend
   node server.js
   ```
   You should see: `🚀 Frontend server running at http://localhost:8000/`

3. **Open in Browser:**
   Go to: `http://localhost:8000`

## That's It! 🎉

No API keys needed. No external services. Just install and run!

## Troubleshooting

**"npm is not recognized"**
- Install Node.js from https://nodejs.org/

**"Port 5000 already in use"**
- Close other applications using port 5000
- Or change PORT in `backend/server.js`

**"Cannot find module"**
- Make sure you ran `npm install` in the `backend` folder

**Frontend shows "Failed to get prediction"**
- Make sure the backend is running on port 5000
- Check that you see the backend server message in the terminal

