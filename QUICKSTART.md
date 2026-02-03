# Farmer Insurance Platform - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation & Setup
```bash
# Navigate to project directory
cd c:\code\farmer-website

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

The application will be available at: **http://localhost:5174**

---

## 🔐 Login & Registration

### Option 1: Login as Existing User
1. On the login page, use these demo credentials:
   - **Username:** `ramesh_kumar`
   - **Password:** `demo123`
2. You'll be taken directly to the dashboard

### Option 2: Create New Account
1. Click "Sign up here" on the login page
2. Complete the 5-step registration:
   - **Step 1:** Personal Info (Name, Aadhar, Father's Name, Mobile)
   - **Step 2:** Financial Info (Age, Annual Income)
   - **Step 3:** Bank Details (Bank, Account Number, IFSC)
   - **Step 4:** Location (State, District, Village, Coordinates)
   - **Step 5:** Password Setup
3. Username will be auto-generated (e.g., `ramesh_kumar_1`)
4. After signup, proceed to farm setup

---

## 🌾 Farm Setup (New Users Only)

### Step 1: Define Your Farm
1. You'll see an interactive map
2. Click the **Polygon Drawing Tool** (top-left corner)
3. Click on the map to place corner points of your farm
4. Double-click to complete the polygon
5. The system will auto-calculate farm size in acres
6. Click **Continue**

**Tips:**
- Use at least 3 points to form a valid polygon
- The default location is set to Bangalore, India
- You can adjust coordinates in the signup form

### Step 2: Enter Crop Details
1. Select a crop type from the grid:
   - Rice, Wheat, Corn, Sugarcane, Cotton
   - Potato, Tomato, Onion, Chili, Soybean
2. Choose a variety from the dropdown
3. Select sowing date (when you planted/will plant)
4. Select harvesting date (when you'll harvest)
5. Growth duration will auto-calculate
6. Click **Complete Farm Setup**

---

## 📊 Dashboard Overview

Once you have a complete setup, you'll see the dashboard with 3 tabs:

### Tab 1: Overview
- **Personal Information:** Name, father's name, age, mobile
- **Location Details:** State, district, village, coordinates
- **Farm Stats:** Size in acres, current crop, annual income
- **Crop Details:** Crop type, variety, sowing & harvesting dates

### Tab 2: Weather & Forecast
- **Current Weather:** Temperature, humidity, wind speed, visibility
- **7-Day Forecast:** Daily high/low temperatures and precipitation chance
- Shows weather icons for visual representation

### Tab 3: Disaster Simulation
- **Select a Disaster:** Choose from 5 scenarios:
  - 🌊 Flood (85% damage)
  - 🏜️ Drought (70% damage)
  - 🧊 Hailstorm (60% damage)
  - 🐛 Pest Infestation (45% damage)
  - 🌧️ Heavy Rain (40% damage)

- **View Impact:**
  - Affected area in acres
  - Estimated damage value
  - Insurance eligibility (requires >10% damage)
  - Projected insurance payout
  - Your farm boundary shown on map

- **Insurance Calculation:**
  - Only eligible if damage > 10%
  - Payout = MIN(50% of annual income, 60% of damage)
  - Shows % of income recovered

---

## 📋 Sample Data for Testing

### Demo Farmer (Pre-existing)
- **Username:** ramesh_kumar
- **Password:** demo123
- **Farm:** 10.5 acres in Kadugodi, Bangalore
- **Crop:** Rice (Basmati variety)

### For New Registration Test
Use any of these to test the signup flow:
- **Aadhar:** Any 12-digit number you enter
- **Name:** Any name you choose
- **Location:** Use these real coordinates:
  - **Bangalore:** 12.978 N, 77.673 E
  - **Mumbai:** 19.076 N, 72.877 E
  - **Delhi:** 28.704 N, 77.102 E

---

## 🔄 User Flow Diagram

```
┌─────────────────────────────────────┐
│      Login / Sign Up Page           │
└────────────────┬────────────────────┘
                 │
         ┌───────┴─────────┐
         │                 │
    ┌────▼────┐      ┌─────▼──────┐
    │ Login    │      │ Sign Up    │
    │(Existing)│      │(5 Steps)   │
    └────┬─────┘      └─────┬──────┘
         │                  │
         │         ┌────────▼──────────┐
         │         │ Farm Definition   │
         │         │ (Draw on Map)     │
         │         └────────┬──────────┘
         │                  │
         │         ┌────────▼──────────┐
         │         │ Crop Details      │
         │         │ (Form Entry)      │
         │         └────────┬──────────┘
         │                  │
         └──────────┬───────┘
                    │
         ┌──────────▼──────────────┐
         │    Dashboard            │
         │ ┌─ Overview             │
         │ ├─ Weather & Forecast   │
         │ └─ Disaster Simulation  │
         └────────────────────────┘
```

---

## 🛠️ Common Tasks

### Change Login Credentials
Edit `src/data/demoFarmers.ts` and modify the `demoFarmers` array.

### Add New Crop Types
Edit `src/pages/CropDetailsPage.tsx`, update the `CROP_TYPES` array:
```typescript
const CROP_TYPES = [
    { name: 'Your Crop', varieties: ['Variety 1', 'Variety 2'] },
    // ...
];
```

### Add New Disaster Scenarios
Edit `src/components/DisasterSimulation.tsx`, update `DISASTER_SCENARIOS`:
```typescript
const DISASTER_SCENARIOS = [
    { name: 'Your Disaster', damagePercentage: 50, color: '#yourcolor' },
    // ...
];
```

### Modify Weather Data
Edit `src/pages/Dashboard.tsx`, replace `mockCurrentWeather` and `mockForecast` with real API data.

---

## 📱 Features at a Glance

✅ **Authentication**
- Username/password login
- Secure signup with validation
- Auto-generated usernames

✅ **Farm Management**
- Interactive map with drawing tools
- Auto-calculate farm size
- Store farm boundaries
- Track crop information

✅ **Dashboard**
- Personal information
- Location details
- Farm statistics
- Current crop tracking

✅ **Weather Integration**
- Current weather conditions
- 7-day forecast
- Real-time updates ready

✅ **Disaster Simulation**
- Multiple disaster scenarios
- Damage calculation
- Insurance eligibility
- Payout estimation
- Risk assessment

---

## 🐛 Troubleshooting

### Port Already in Use
If port 5174 is occupied, Vite will automatically try the next available port. Check the terminal output for the actual URL.

### Module Not Found
If you see module errors, run:
```bash
npm install
```

### TypeScript Errors
These are usually IDE issues and don't affect runtime. The build will complete successfully.

### Map Not Loading
Ensure you have internet connection for OpenStreetMap tiles to load.

---

## 📝 Important Notes

1. **Data Storage:** All data is currently stored in-memory. It will be lost on page refresh.
2. **Weather:** Uses mock data. Real API integration recommended for production.
3. **Insurance Calculations:** Simplified for demo. Adjust formulas as needed.
4. **Coordinates:** Use decimal degrees (latitude: -90 to 90, longitude: -180 to 180)

---

## 🎯 Next Steps

1. **Explore the Dashboard:** Log in and check all features
2. **Test New Registration:** Create a test account following the signup flow
3. **Simulate Disasters:** Try different scenarios and see insurance calculations
4. **Customize:** Modify data and settings for your use case
5. **Integrate APIs:** Connect real weather and user management services

---

## 📚 Documentation Files
- `IMPLEMENTATION_GUIDE.md` - Technical implementation details
- `README.md` - Project overview

---

**Happy Farming! 🌾**
