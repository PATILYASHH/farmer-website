# API Configuration Guide

## Required Free APIs

### 1. OpenWeatherMap API (Weather Data)
**Purpose:** Get current weather and forecasts for farmer locations

- **Website:** https://openweathermap.org/api
- **Sign up:** https://home.openweathermap.org/users/sign_up
- **Free Tier:** 
  - 1,000 calls/day
  - 60 calls/minute
  - Current weather & 5-day forecast
- **Cost:** Free forever for basic tier

**How to get API key:**
1. Go to https://openweathermap.org
2. Click "Sign Up" (top right)
3. Create free account
4. Go to "API keys" in your profile
5. Copy your default API key (or create new one)
6. Add to `.env` file as `VITE_OPENWEATHER_API_KEY=your_key_here`

**API Endpoints Used:**
- Current Weather: `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric`
- 5-Day Forecast: `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API_KEY}&units=metric`

---

### 2. Google Gemini AI (Optional - AI Assistant)
**Purpose:** AI-powered chat assistance for farmers (crop advice, insurance queries)

- **Website:** https://ai.google.dev
- **Get API Key:** https://makersuite.google.com/app/apikey
- **Free Tier:**
  - 60 requests per minute
  - 1,500 requests per day
  - No credit card required
- **Cost:** Free for moderate usage

**How to get API key:**
1. Go to https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Select existing Google Cloud project or create new one
5. Copy the API key
6. Add to `.env` file as `VITE_GEMINI_API_KEY=your_key_here`

**Note:** Gemini AI is optional. The app works without it (AI Assistant will be disabled).

---

## Setup Instructions

### 1. Create .env file
```bash
cp .env.example .env
```

### 2. Add your API keys to .env
```env
# Required for weather features
VITE_OPENWEATHER_API_KEY=your_openweather_api_key

# Optional for AI features
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 3. Restart development server
```bash
npm run dev
```

---

## Alternative Free APIs (Optional)

### Weather Alternatives:
1. **WeatherAPI.com**
   - Website: https://www.weatherapi.com
   - Free: 1M calls/month
   - API Key: https://www.weatherapi.com/signup.aspx

2. **Tomorrow.io (formerly Climacell)**
   - Website: https://www.tomorrow.io
   - Free: 500 calls/day
   - API Key: https://www.tomorrow.io/weather-api

3. **Open-Meteo** (No API key required!)
   - Website: https://open-meteo.com
   - Completely free
   - No API key needed
   - API: `https://api.open-meteo.com/v1/forecast`

---

## Data Storage

**All user data is stored in browser localStorage:**
- Farmer profiles
- Farm boundaries
- Crop details
- Login sessions

**No backend/database required for demo!**

---

## Features Working WITHOUT APIs:

✅ Authentication (localStorage)
✅ Farm boundary drawing
✅ Crop management
✅ Disaster simulation
✅ Insurance calculations
✅ Dashboard stats

## Features Requiring APIs:

🌤️ **Real-time weather** - Requires OpenWeatherMap API
🤖 **AI Assistant** - Requires Gemini API (optional)

---

## Mock Data Fallback

If you don't set up APIs, the app will use **mock/demo data**:
- Weather shows hardcoded data (28°C, Partly Cloudy)
- AI Assistant button disabled

**The app is fully functional without any APIs for demo purposes!**

---

## Security Notes

⚠️ **Important:**
- Never commit `.env` file to Git
- `.env` is in `.gitignore` by default
- API keys are client-side visible (use backend for production)
- Free tiers are sufficient for demo/testing

---

## Need Help?

- OpenWeatherMap Docs: https://openweathermap.org/api
- Gemini AI Docs: https://ai.google.dev/tutorials
- Open-Meteo Docs: https://open-meteo.com/en/docs

---

**Last Updated:** February 3, 2026
