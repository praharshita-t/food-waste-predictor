# Installation Guide 📦

## For First-Time Users

### 1. Prerequisites

Make sure you have:
- **Node.js** v14 or higher ([Download](https://nodejs.org/))
- **Git** (to clone the repository)

### 2. Clone the Repository

```bash
git clone <your-repo-url>
cd food-waste-predictor
```

### 3. Install Dependencies

```bash
cd backend
npm install
```

Wait for the installation to complete. You should see a `node_modules` folder created.

### 4. Verify Installation

Check that dependencies are installed:
```bash
npm list --depth=0
```

You should see:
- express
- cors
- nodemon (dev dependency)

### 5. Run the Application

See [README.md](README.md) for running instructions, or use the quick start:

**Windows:**
```bash
.\run.bat
```

**PowerShell:**
```bash
.\run.ps1
```

**Manual:**
- Terminal 1: `cd backend && npm start`
- Terminal 2: `cd frontend && node server.js`
- Open: `http://localhost:8000`

## What Gets Installed?

- **express**: Web framework for the backend API
- **cors**: Enables cross-origin requests
- **nodemon**: Auto-restarts server during development (optional)

## No Additional Setup Needed!

✅ No API keys required  
✅ No environment variables to set  
✅ No external services to configure  
✅ No database setup needed  

Just install and run!

