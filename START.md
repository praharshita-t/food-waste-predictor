# Quick Start Guide 🚀

## For First-Time Setup

### Step 1: Install Dependencies

If you just cloned the repo, install dependencies first:

```bash
cd backend
npm install
```

### Step 2: Start the Backend

Keep the terminal open and run:

```bash
npm start
```

You should see:
```
🚀 Server running on http://localhost:5000
📡 API available at http://localhost:5000/api
```

### Step 3: Start the Frontend

Open a **new terminal** and run:

```bash
cd frontend
node server.js
```

You should see:
```
🚀 Frontend server running at http://localhost:8000/
```

### Step 4: Open in Browser

Go to: **http://localhost:8000**

### Step 5: Test the Application

1. Enter attendance: `150`
2. Select menu type: `Vegetarian`
3. Enter food quantity: `50` kg
4. Click "Get Prediction"

You should see the prediction results! 🎉

## Quick Run (After First Setup)

**Windows:**
- Double-click `run.bat`

**PowerShell:**
```bash
.\run.ps1
```

This starts both servers automatically!

## Troubleshooting

- **Backend won't start?** Make sure port 5000 is free
- **Frontend can't connect?** Ensure backend is running first
- **"npm is not recognized"?** Install Node.js from [nodejs.org](https://nodejs.org/)
- **"Cannot find module"?** Run `npm install` in the `backend` folder

