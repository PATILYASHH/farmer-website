# PM Kisan Yojana - Farmer Insurance Platform

A Progressive Web App (PWA) for detecting flood-damaged farms using satellite imagery and providing insurance to affected farmers.

## 🌾 Features

- **Aadhaar-Based Authentication** - Secure farmer login
- **Interactive Farm Maps** - 10 farms (~100 acres) with river and flood visualization  
- **Satellite Damage Detection** - Toggle between normal and damaged views
- **AI-Powered Analysis** - Gemini AI for damage assessment and chatbot assistance
- **Smart Insurance** - Auto-calculate eligibility and payouts (₹50,000/acre)
- **Progressive Web App** - Install on any device, works offline

## 🚀 Quick Start

```bash
npm install
npm run dev
```

### Demo Login

**Password:** `demo123` (all farmers)

**Try these Aadhaar numbers:**
- `3456-7891-0123` - Lakshmi (75% damage, ₹4.2L) ✅ ELIGIBLE
- `2345-6789-1012` - Suresh (45% damage, ₹2.2L) ✅ ELIGIBLE  
- `6789-1012-3456` - Ganesh (2% damage) ❌ NOT ELIGIBLE

See `farmers.md` for all 10 farmers

## 🔧 Environment Variables

Create `.env`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

- **Gemini API**: Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Supabase**: Optional (uses demo data without it)

## 📊 How It Works

1. **10 Farms** - ~10 acres each, river through middle
2. **Damage Detection** - Color-coded: 🟢 Safe, 🟡 Low, 🟠 Medium, 🔴 High
3. **Insurance** - Minimum 10% damage required, ₹50K/acre
4. **AI Features** - Damage analysis, crop advisory, chatbot

## 📦 Tech Stack

- React + TypeScript + Vite
- TailwindCSS + Leaflet Maps
- Supabase + Gemini AI
- PWA with offline support

## 🏗️ Build

```bash
npm run build
npm run preview
```

## 🚀 Deploy to Netlify

This project is configured for easy deployment to Netlify. See [NETLIFY_DEPLOYMENT.md](NETLIFY_DEPLOYMENT.md) for detailed instructions.

**Quick Deploy:**
1. Push to GitHub
2. Connect repository to Netlify
3. Add environment variables in Netlify dashboard
4. Deploy automatically!

---

**Note**: Demo application with simulated data for hackathon demonstration.
