# Setup Guide for New Users 👋

Welcome! This guide will help you get the Food Waste Predictor running on your computer.

## What You Need

1. **Node.js** installed on your computer
   - Download from: https://nodejs.org/
   - Choose the LTS (Long Term Support) version
   - This also installs `npm` (Node Package Manager)

2. **Git** (if cloning from a repository)
   - Usually already installed, or download from: https://git-scm.com/

## Step-by-Step Setup

### Step 1: Get the Code

**If cloning from Git:**
```bash
git clone <repository-url>
cd food-waste-predictor
```

**If you have a ZIP file:**
- Extract the ZIP file
- Open a terminal/command prompt in the extracted folder

### Step 2: Install Dependencies

Open a terminal/command prompt and navigate to the backend folder:

**Windows (Command Prompt or PowerShell):**
```bash
cd backend
npm install
```

**Mac/Linux:**
```bash
cd backend
npm install
```

Wait for the installation to complete. This may take 1-2 minutes.

**What's happening?** This downloads all the required packages (like Express.js for the server) into a `node_modules` folder.

### Step 3: Start the Backend Server

Keep the terminal open and run:

```bash
npm start
```

You should see:
```
🚀 Server running on http://localhost:5000
📡 API available at http://localhost:5000/api
```

**Keep this terminal window open!** The server needs to keep running.

### Step 4: Start the Frontend Server

Open a **NEW terminal/command prompt** window and run:

```bash
cd frontend
node server.js
```

You should see:
```
🚀 Frontend server running at http://localhost:8000/
```

**Keep this terminal window open too!**

### Step 5: Open in Browser

Open your web browser and go to:
```
http://localhost:8000
```

You should see the Food Waste Predictor interface!

### Step 6: Test It

1. Enter **150** in the "Expected Attendance" field
2. Select **Vegetarian** from the menu type dropdown
3. Enter **50** in the "Food Quantity (kg)" field
4. Click **Get Prediction**

You should see prediction results appear below!

## Using the Run Script (Easier Method)

Instead of manually starting both servers, you can use the provided script:

**Windows:**
- Double-click `run.bat` in the project root folder

**PowerShell:**
```bash
.\run.ps1
```

This automatically starts both servers for you!

## Common Issues

### "npm is not recognized" or "node is not recognized"

**Problem:** Node.js is not installed or not in your PATH.

**Solution:**
1. Install Node.js from https://nodejs.org/
2. Restart your terminal/command prompt
3. Verify installation: `node --version` and `npm --version`

### "Cannot find module 'express'"

**Problem:** Dependencies weren't installed.

**Solution:**
1. Make sure you're in the `backend` folder
2. Run `npm install` again
3. Wait for it to complete

### "Port 5000 already in use"

**Problem:** Another application is using port 5000.

**Solution:**
1. Close other applications that might be using port 5000
2. Or change the port in `backend/server.js` (line 6) to a different number like 5001

### Frontend shows "Failed to get prediction"

**Problem:** Backend server is not running.

**Solution:**
1. Check that the backend terminal shows: `🚀 Server running on http://localhost:5000`
2. Make sure you started the backend server (Step 3)
3. Try refreshing the browser page

### Nothing happens when I click "Get Prediction"

**Problem:** Backend might not be running or there's a connection issue.

**Solution:**
1. Open browser Developer Tools (Press F12)
2. Check the Console tab for error messages
3. Make sure both servers are running (backend on port 5000, frontend on port 8000)

## What's Next?

Once everything is running:
- Try different attendance numbers
- Test different menu types
- Experiment with various food quantities
- Check out the code to understand how it works!

## Need More Help?

- Check the main [README.md](README.md) for more details
- Look at [TROUBLESHOOTING.md](README.md#-troubleshooting) section
- Review the code comments for implementation details

## Summary

✅ Install Node.js  
✅ Clone/download the code  
✅ Run `npm install` in the `backend` folder  
✅ Start backend: `npm start`  
✅ Start frontend: `node server.js` (in frontend folder)  
✅ Open http://localhost:8000  

**No API keys, no external services, no complex setup!**

