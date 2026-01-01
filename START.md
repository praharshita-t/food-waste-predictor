# Quick Start Guide 🚀

## Step 1: Install Backend Dependencies

Open a terminal in the project root and run:

```bash
cd backend
npm install
```

## Step 2: Start the Backend

Keep the terminal open and run:

```bash
npm start
```

You should see:
```
🚀 Server running on http://localhost:5000
📡 API available at http://localhost:5000/api
```

## Step 3: Open the Frontend

### Option A: Using a Local Server (Recommended)

Open a **new terminal** and run:

**Using Python:**
```bash
cd frontend
python -m http.server 8000
```

**Using Node.js http-server:**
```bash
npm install -g http-server
cd frontend
http-server -p 8000
```

Then open `http://localhost:8000` in your browser.

### Option B: Direct File Open

Simply open `frontend/index.html` in your browser (may have CORS limitations).

## Step 4: Test the Application

1. Enter attendance: `150`
2. Select menu type: `Vegetarian`
3. Enter food quantity: `50` kg
4. Click "Get Prediction"

You should see the prediction results!

## Troubleshooting

- **Backend won't start?** Make sure port 5000 is free
- **Frontend can't connect?** Ensure backend is running first
- **CORS errors?** Use a local server (Option A) instead of opening HTML directly

