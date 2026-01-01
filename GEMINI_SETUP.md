# Google Gemini AI Setup Guide

## Overview

This project uses **Google Gemini AI** to enhance food waste predictions with intelligent, contextual suggestions. The AI integration is optional - the application works perfectly without it, but AI enhancement provides more sophisticated recommendations.

## What is Google Gemini AI?

Google Gemini is Google's advanced AI model that can understand context and generate human-like text. In this project, it's used to:
- Generate intelligent suggestions based on prediction data
- Provide contextual tips for waste reduction
- Create personalized recommendations

## Getting Started

### Step 1: Get Your API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### Step 2: Set the Environment Variable

#### Windows PowerShell
```powershell
$env:GOOGLE_GEMINI_API_KEY="your-api-key-here"
```

#### Windows Command Prompt
```cmd
set GOOGLE_GEMINI_API_KEY=your-api-key-here
```

#### Linux/Mac
```bash
export GOOGLE_GEMINI_API_KEY="your-api-key-here"
```

#### Permanent Setup (Windows)
1. Open System Properties → Environment Variables
2. Add new User Variable:
   - Name: `GOOGLE_GEMINI_API_KEY`
   - Value: `your-api-key-here`

#### Permanent Setup (Linux/Mac)
Add to `~/.bashrc` or `~/.zshrc`:
```bash
export GOOGLE_GEMINI_API_KEY="your-api-key-here"
```

### Step 3: Install Dependencies

Make sure you've installed the Gemini package:
```bash
cd backend
npm install
```

### Step 4: Restart the Server

Restart your backend server for the changes to take effect:
```bash
npm start
```

You should see:
```
✅ Google Gemini AI initialized successfully
```

## Verification

1. Make a prediction request through the frontend
2. Check the response - it should include:
   - `"ai_enhanced": true`
   - `"ai_insights"` array with additional tips
   - More intelligent, contextual suggestions

## How It Works

### Without API Key
- System uses rule-based suggestions
- Still provides accurate predictions
- Basic recommendations based on waste level

### With API Key
- System uses Google Gemini AI
- Generates intelligent, contextual suggestions
- Provides additional actionable tips
- More personalized recommendations

## API Usage

The Gemini API has a free tier with generous limits:
- **Free Tier**: 60 requests per minute
- **Pricing**: Very affordable for small to medium applications
- **No Credit Card Required**: For free tier usage

## Troubleshooting

### "GOOGLE_GEMINI_API_KEY not set"
- **Solution**: Set the environment variable as shown above
- **Impact**: System will use default suggestions (still works!)

### "Failed to initialize Gemini AI"
- **Solution**: Check your API key is correct
- **Check**: Verify the key at [Google AI Studio](https://makersuite.google.com/app/apikey)

### API Rate Limits
- **Solution**: The system gracefully falls back to default suggestions
- **Note**: Free tier should be sufficient for most use cases

## Security Notes

⚠️ **Important**: Never commit your API key to version control!

- Add `GOOGLE_GEMINI_API_KEY` to `.gitignore` if storing in a file
- Use environment variables (recommended)
- Keep your API key secure and private

## Example Response

**Without AI:**
```json
{
  "suggestion": "✅ Excellent planning! Waste level is minimal (5.2%). Continue with current preparation strategy."
}
```

**With AI:**
```json
{
  "suggestion": "Based on your predicted low waste level of 5.2%, your current preparation strategy is well-calibrated. To maintain this efficiency, consider implementing portion control measures during peak hours and monitoring actual consumption patterns to fine-tune future predictions.",
  "ai_enhanced": true,
  "ai_insights": [
    "Implement a feedback system to track actual consumption vs. predicted consumption.",
    "Consider batch preparation for popular items to reduce waste.",
    "Monitor portion sizes during different meal times to optimize food distribution."
  ]
}
```

## Support

For issues with:
- **API Key**: Check [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Integration**: Check `backend/services/geminiService.js`
- **Usage**: Review the backend logs for error messages

