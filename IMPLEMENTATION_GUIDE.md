# Farmer Website - New UI & Flow Implementation Guide

## Overview
This document describes the complete redesign of the Farmer Insurance Platform with a new authentication flow, farm setup process, and enhanced dashboard with weather and disaster simulation features.

## System Architecture

### User Flow
```
1. Login/Signup Page
   ├─ Existing User → Login with Username/Password
   └─ New User → 5-Step Registration (Signup Page)
       ├─ Step 1: Personal Information (Full Name, Aadhar, Father's Name, Mobile)
       ├─ Step 2: Financial Details (Age, Annual Income)
       ├─ Step 3: Bank Account Details
       ├─ Step 4: Location Information (State, District, Village, Coordinates)
       └─ Step 5: Password Setup

2. New User Onboarding
   ├─ Farm Definition Page
   │   └─ Draw farm boundary on map using polygon tool
   │   └─ Auto-calculate farm size in acres
   └─ Crop Details Page
       └─ Select crop type, variety, sowing & harvesting dates

3. Dashboard (Fully Authenticated)
   ├─ Overview Tab: Farm & Personal Information
   ├─ Weather Tab: Current weather + 7-day forecast
   └─ Disaster Simulation Tab: Simulate disasters & view insurance coverage
```

## Key Components

### Authentication (Updated)

#### File: `src/contexts/AuthContext.tsx`
**Key Changes:**
- Added `signup()` method for new user registration
- Changed login from Aadhar-based to username/password
- Added `isNewUser` state to track new users needing farm setup
- Added `completeFarmSetup()` to mark farm setup as complete

**New Methods:**
```typescript
signup(data: SignupData): { success: boolean; message: string; username?: string }
completeFarmSetup(farmBoundary: any[], cropDetails: any): boolean
```

#### File: `src/data/demoFarmers.ts`
**Updated FarmerData Interface:**
```typescript
interface FarmerData {
    id: string;
    username: string;  // Auto-generated from full name
    password: string;
    fullName: string;
    aadharNumber: string;
    fatherName: string;
    mobileNumber: string;
    age: number;
    annualIncome: number;
    accountDetails: { bankName; accountNumber; ifscCode }
    location: { state; district; village; latitude; longitude }
    farmSetupComplete: boolean;
    farmBoundary?: Array<{ latitude; longitude }>
    farmAreaAcres?: number;
    cropDetails?: { cropType; cropVariety; sowingDate; harvestingDate }
}
```

**New Utility Functions:**
- `generateUsername(fullName)` - Creates unique username
- `registerFarmer(userData)` - Registers new farmer
- `updateFarmerFarmSetup()` - Updates farm & crop info
- `calculateFarmArea()` - Calculates acres from polygon

### Pages

#### 1. LoginPage (`src/pages/LoginPage.tsx`)
**Features:**
- Username/password login (instead of Aadhar)
- Toggle to SignupPage
- Demo credentials display
- Clean, professional UI

**Demo Credentials:**
```
Username: ramesh_kumar
Password: demo123
```

#### 2. SignupPage (`src/pages/SignupPage.tsx`)
**Features:**
- 5-step multi-step form
- Progress indicator (numbered circles)
- Form validation at each step
- Auto-generated username display on completion
- Success screen before redirect

**Steps:**
1. Personal Information
2. Financial Information (Age, Income)
3. Bank Account Details
4. Location Details with Coordinates
5. Password Setup

#### 3. FarmDefinitionPage (`src/pages/FarmDefinitionPage.tsx`)
**Features:**
- Interactive map using React-Leaflet
- Polygon drawing tool (draw farm boundary)
- Real-time farm size calculation
- Clear instructions for users
- Coordinates display

**Map Features:**
- OpenStreetMap base layer
- Drawing tools (polygon only)
- Auto-calculation of farm area
- Clear button to reset

#### 4. CropDetailsPage (`src/pages/CropDetailsPage.tsx`)
**Features:**
- 10 common crop types (Rice, Wheat, Corn, etc.)
- Variety selection for each crop
- Sowing and harvesting date pickers
- Growth duration calculation
- Farm summary display

**Supported Crops:**
- Rice, Wheat, Corn, Sugarcane, Cotton
- Potato, Tomato, Onion, Chili, Soybean

#### 5. Dashboard (`src/pages/Dashboard.tsx`)
**Features:**
- Three main tabs: Overview, Weather, Disaster Simulation
- Personal information display
- Location information
- Crop details summary
- Responsive grid layout

**Overview Tab:**
- Farm size, crop type, annual income cards
- Personal and location information
- Crop details in highlighted box

**Weather Tab:**
- Current weather conditions
- 7-day forecast
- Mock weather data (can integrate real API)

**Disaster Simulation Tab:**
- 5 disaster scenarios (Flood, Drought, Hailstorm, Pest, Rain)
- Damage percentage visualization
- Insurance eligibility calculation
- Affected area display
- Insurance payout estimation

### Components

#### WeatherComponent (`src/components/WeatherComponent.tsx`)
**Features:**
- Current weather display (temp, humidity, wind, visibility)
- 7-day forecast cards
- Weather icons based on condition
- Responsive grid layout

**Data Interface:**
```typescript
interface WeatherData {
    condition: string;
    temp: number;
    humidity: number;
    windSpeed: number;
    visibility: number;
    feelsLike: number;
}

interface ForecastDay {
    date: string;
    high: number;
    low: number;
    condition: string;
    precipitation: number;
}
```

#### DisasterSimulation (`src/components/DisasterSimulation.tsx`)
**Features:**
- 5 pre-configured disaster scenarios
- Damage percentage display
- Affected area calculation
- Insurance eligibility check (>10% damage)
- Insurance payout calculation
- Farm boundary visualization on map
- Key insights summary

**Disaster Scenarios:**
1. Flood - 85% damage
2. Drought - 70% damage
3. Hailstorm - 60% damage
4. Pest Infestation - 45% damage
5. Heavy Rain - 40% damage

**Insurance Calculation Logic:**
```
- Minimum 10% damage required for eligibility
- Insurance = MIN(50% of annual income, 60% of damage value)
- Income replacement % = (Insurance / Annual Income) × 100
```

### Updated App.tsx
**Routing Logic:**
```typescript
if (!isAuthenticated) {
    // Show Login/Signup
} else if (isNewUser) {
    // Show Farm Definition → Crop Details flow
} else {
    // Show Dashboard
}
```

## User Data Persistence

**localStorage Keys:**
- `farmer_username` - Stores logged-in farmer's username
- `farmer_is_new` - Boolean flag for new user status

**Note:** Data is stored in-memory for demo. In production, integrate with Supabase or backend API.

## Testing Demo Flow

### Existing User Login
1. Go to login page
2. Enter: `Username: ramesh_kumar`, `Password: demo123`
3. View dashboard with existing farm data

### New User Registration
1. Click "Sign up here"
2. Fill 5-step form:
   - **Step 1:** Full Name, Aadhar (12 digits), Father's Name, Mobile (10 digits)
   - **Step 2:** Age (≥18), Annual Income
   - **Step 3:** Bank Name, Account Number, IFSC Code
   - **Step 4:** State, District, Village, Latitude, Longitude
   - **Step 5:** Password (min 6 chars) & Confirm
3. View success screen with auto-generated username
4. Get redirected to Farm Definition Page
5. Draw farm boundary on map (click polygon tool, place points, double-click to complete)
6. Click "Continue" to proceed
7. Fill crop details (select crop, variety, dates)
8. Click "Complete Farm Setup"
9. View dashboard

## Key Features Implemented

### ✅ Authentication
- [x] Username/password login
- [x] Multi-step signup with validation
- [x] Auto-generated usernames
- [x] Unique Aadhar constraint
- [x] User persistence via localStorage

### ✅ Farm Setup
- [x] Interactive map with drawing tools
- [x] Polygon-based farm boundary
- [x] Auto-calculate farm size
- [x] Crop type selection
- [x] Sowing/harvesting date tracking

### ✅ Dashboard
- [x] Overview with farm statistics
- [x] Personal information display
- [x] Location details
- [x] Current crop information
- [x] Tabbed interface

### ✅ Weather Integration
- [x] Current weather display
- [x] 7-day forecast
- [x] Weather icons
- [x] Mock data (ready for real API)

### ✅ Disaster Simulation
- [x] 5 disaster scenarios
- [x] Damage calculation
- [x] Insurance eligibility check
- [x] Payout estimation
- [x] Farm boundary visualization
- [x] Risk insights

## Customization & Enhancement

### To Add Real Weather API
Replace mock data in `Dashboard.tsx`:
```typescript
// Replace mockCurrentWeather and mockForecast with API calls
const { data } = await fetch('weather-api-endpoint').then(r => r.json());
```

### To Integrate Supabase Backend
1. Replace `demoFarmers.ts` with Supabase client calls
2. Update `registerFarmer()` to use Supabase auth
3. Store farm data in Supabase tables
4. Update localStorage to use session tokens

### To Add More Crop Types
Edit `CROP_TYPES` array in `CropDetailsPage.tsx`:
```typescript
const CROP_TYPES = [
    { name: 'NewCrop', varieties: ['var1', 'var2', ...] },
    // ...
];
```

### To Customize Disaster Scenarios
Edit `DISASTER_SCENARIOS` in `DisasterSimulation.tsx`:
```typescript
const DISASTER_SCENARIOS = [
    { name: 'CustomDisaster', damagePercentage: 75, color: '#...' },
    // ...
];
```

## Technical Stack
- **Framework:** React 19
- **Language:** TypeScript
- **Maps:** React-Leaflet + Leaflet
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Build:** Vite

## Dependencies
All required dependencies are in `package.json` and should be installed via `npm install`.

## Running the Application
```bash
cd c:\code\farmer-website
npm install  # Install dependencies
npm run dev   # Start development server
npm run build # Build for production
```

## Notes
- All farmer data is stored in-memory. For production, integrate with a real database
- Weather data is mocked. Real API integration recommended
- Insurance calculations are simplified for demo purposes
- Coordinates are in decimal degrees (latitude/longitude)
- Farm area calculation uses shoelace formula approximation

## File Structure
```
src/
├── App.tsx (Updated with routing)
├── contexts/
│   └── AuthContext.tsx (Updated)
├── pages/
│   ├── LoginPage.tsx (Updated)
│   ├── SignupPage.tsx (NEW)
│   ├── FarmDefinitionPage.tsx (NEW)
│   ├── CropDetailsPage.tsx (NEW)
│   └── Dashboard.tsx (Updated)
├── components/
│   ├── WeatherComponent.tsx (NEW)
│   └── DisasterSimulation.tsx (NEW)
└── data/
    └── demoFarmers.ts (Updated)
```

---

**Last Updated:** February 3, 2026
**Version:** 2.0 - Complete Redesign
