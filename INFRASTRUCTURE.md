# 📁 Complete File Reference & Structure

## Project Files Overview

### Authentication & User Management

#### [src/contexts/AuthContext.tsx](src/contexts/AuthContext.tsx)
**Purpose:** Central authentication context for the entire application
**Key Exports:**
- `AuthProvider` - Context provider component
- `useAuth()` - Hook to access auth context

**Functions Implemented:**
- `login(username, password)` - Username/password authentication
- `signup(data)` - New user registration with full profile
- `logout()` - Clear user session
- `completeFarmSetup()` - Mark farm setup as complete

**Context Values:**
```typescript
{
  farmer: FarmerData | null,
  login: (username: string, password: string) => boolean,
  signup: (data: SignupData) => { success: boolean; message: string; username?: string },
  logout: () => void,
  isAuthenticated: boolean,
  isNewUser: boolean,
  completeFarmSetup: (farmBoundary: any[], cropDetails: any) => boolean
}
```

---

#### [src/data/demoFarmers.ts](src/data/demoFarmers.ts)
**Purpose:** Farmer data storage and authentication logic
**Exports:**
- `FarmerData` - TypeScript interface for farmer profile
- `demoFarmers` - Array of demo farmer accounts
- `authenticateFarmer()` - Validate username/password
- `registerFarmer()` - Register new farmer
- `generateUsername()` - Auto-generate unique username
- `updateFarmerFarmSetup()` - Update farm & crop details
- `calculateFarmArea()` - Calculate farm size from coordinates
- `usernameExists()` - Check username availability
- `aadharExists()` - Check Aadhaar uniqueness
- `getFarmerByUsername()` - Retrieve farmer by username
- `getFarmerById()` - Retrieve farmer by ID

**Key Data Structures:**
```typescript
interface FarmerData {
  id: string;                    // Unique identifier
  username: string;              // Login username
  password: string;              // Hashed password
  fullName: string;              // Full legal name
  aadharNumber: string;          // 12-digit Aadhaar
  fatherName: string;            // Father's name
  mobileNumber: string;          // 10-digit mobile
  age: number;                   // Age in years
  annualIncome: number;          // Income in rupees
  accountDetails: {              // Bank account info
    bankName: string;
    accountNumber: string;
    ifscCode: string;
  };
  location: {                    // Geographic location
    state: string;
    district: string;
    village: string;
    latitude: number;
    longitude: number;
  };
  farmSetupComplete: boolean;    // Setup status
  farmBoundary?: Array<{         // Farm coordinates
    latitude: number;
    longitude: number;
  }>;
  farmAreaAcres?: number;        // Calculated farm size
  cropDetails?: {                // Current crop info
    cropType: string;
    cropVariety: string;
    sowingDate: string;
    harvestingDate: string;
  };
}
```

---

### Pages

#### [src/pages/LoginPage.tsx](src/pages/LoginPage.tsx)
**Purpose:** User login interface
**Features:**
- Username/password form
- Login validation
- Error display
- Demo credentials hint
- Toggle to signup page
- Responsive design

**Key Functions:**
- `handleSubmit()` - Process login
- `handleChange()` - Update form state

**Form Fields:**
- Username (text input)
- Password (password input)
- Submit button
- Signup toggle link

---

#### [src/pages/SignupPage.tsx](src/pages/SignupPage.tsx)
**Purpose:** Multi-step user registration
**Features:**
- 5-step form progression
- Progress indicator
- Form validation
- Success screen
- Username generation display
- Login toggle

**Steps:**
1. Personal Information (Name, Aadhar, Father's Name, Mobile)
2. Financial Information (Age, Annual Income)
3. Bank Account Details (Bank, Account, IFSC)
4. Location Information (State, District, Village, Coordinates)
5. Password Setup (Password, Confirm Password)

**Key Functions:**
- `handleInputChange()` - Update form fields
- `validateStep()` - Validate current step
- `handleNext()` - Move to next step
- `handlePrevious()` - Go to previous step
- `handleSubmit()` - Register new farmer

---

#### [src/pages/FarmDefinitionPage.tsx](src/pages/FarmDefinitionPage.tsx)
**Purpose:** Farm boundary definition using map
**Features:**
- Interactive React-Leaflet map
- Polygon drawing tools
- Real-time farm size calculation
- Instructions panel
- Clear drawing functionality

**Key Components:**
- `MapContainer` - Leaflet map wrapper
- `TileLayer` - OpenStreetMap tiles
- `EditControl` - Drawing tools
- Information display panel

**Key Functions:**
- `handleDraw()` - Process polygon drawing
- `handleClearDraw()` - Reset drawing
- `handleSubmit()` - Validate and proceed

---

#### [src/pages/CropDetailsPage.tsx](src/pages/CropDetailsPage.tsx)
**Purpose:** Crop information entry form
**Features:**
- 10 crop types grid
- Variety dropdown selection
- Date pickers for sowing/harvesting
- Growth duration calculation
- Form validation

**Supported Crops:**
1. Rice (4 varieties)
2. Wheat (4 varieties)
3. Corn (4 varieties)
4. Sugarcane (4 varieties)
5. Cotton (4 varieties)
6. Potato (4 varieties)
7. Tomato (4 varieties)
8. Onion (4 varieties)
9. Chili (4 varieties)
10. Soybean (4 varieties)

**Key Functions:**
- `handleCropTypeChange()` - Update selected crop
- `handleInputChange()` - Update form fields
- `validateForm()` - Validate all fields
- `handleSubmit()` - Save and complete setup

---

#### [src/pages/Dashboard.tsx](src/pages/Dashboard.tsx)
**Purpose:** Main dashboard with 3 tabs
**Features:**
- Overview tab (personal & farm info)
- Weather tab (current & forecast)
- Disaster simulation tab
- Header with logout
- Responsive layout

**Tabs:**
1. Overview - Personal, location, farm stats, crop details
2. Weather - Current weather and 7-day forecast
3. Disaster Simulation - Disaster scenarios and insurance

**Key Functions:**
- Tab navigation handling
- Data display from farmer context

---

### Components

#### [src/components/WeatherComponent.tsx](src/components/WeatherComponent.tsx)
**Purpose:** Weather display with forecast
**Features:**
- Current weather display
- 7-day forecast cards
- Weather icons
- Humidity, wind, visibility metrics
- Responsive grid

**Props:**
```typescript
interface WeatherComponentProps {
  currentWeather: WeatherData;
  forecast: ForecastDay[];
}
```

**Key Features:**
- `getWeatherIcon()` - Return icon for condition
- Weather card grid (4 columns)
- Forecast cards (auto-responsive)

---

#### [src/components/DisasterSimulation.tsx](src/components/DisasterSimulation.tsx)
**Purpose:** Disaster scenario simulation with insurance calculation
**Features:**
- 5 disaster scenarios
- Damage visualization
- Insurance eligibility check
- Payout calculation
- Farm boundary map display
- Risk insights

**Disaster Scenarios:**
1. Flood (85% damage)
2. Drought (70% damage)
3. Hailstorm (60% damage)
4. Pest Infestation (45% damage)
5. Heavy Rain (40% damage)

**Props:**
```typescript
interface DisasterSimulationProps {
  farmBoundary?: Array<{ latitude: number; longitude: number }>;
  farmAreaAcres: number;
  annualIncome: number;
  location: { latitude: number; longitude: number };
}
```

**Key Functions:**
- `simulateDisaster()` - Calculate impact
- `resetSimulation()` - Clear results
- Insurance calculation logic
- Impact visualization

---

### Main Application

#### [src/App.tsx](src/App.tsx)
**Purpose:** Main application routing and state management
**Features:**
- Authentication flow control
- Farm setup flow for new users
- Dashboard view for authenticated users
- State management for current flow

**Routing Logic:**
```
if (!isAuthenticated):
  - Show Login or Signup page
else if (isNewUser):
  - Show Farm Definition Page
  - Then Crop Details Page
else:
  - Show Dashboard
```

---

## Supporting Files

### Configuration Files
- [tsconfig.json](tsconfig.json) - TypeScript configuration
- [tsconfig.app.json](tsconfig.app.json) - App-specific TS config
- [tsconfig.node.json](tsconfig.node.json) - Node-specific TS config
- [vite.config.ts](vite.config.ts) - Vite build configuration
- [tailwind.config.js](tailwind.config.js) - Tailwind CSS configuration
- [postcss.config.js](postcss.config.js) - PostCSS configuration
- [eslint.config.js](eslint.config.js) - ESLint configuration

### Dependency Management
- [package.json](package.json) - Project dependencies and scripts

### Documentation
- [README.md](README.md) - Project overview
- [SUMMARY.md](SUMMARY.md) - Complete feature summary
- [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md) - Technical details
- [QUICKSTART.md](QUICKSTART.md) - Getting started guide
- [TESTING_GUIDE.md](TESTING_GUIDE.md) - Testing instructions
- [INFRASTRUCTURE.md](INFRASTRUCTURE.md) - This file

---

## Key Technologies Used

### Frontend Framework
- **React 19.2.0** - UI library
- **TypeScript ~5.9.3** - Type safety
- **Vite 7.2.4** - Build tool

### Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS
- **PostCSS 8.4.49** - CSS processor
- **Autoprefixer 10.4.20** - CSS prefixes

### Maps & Location
- **Leaflet 1.9.4** - Map library
- **React-Leaflet 5.0.0** - React wrapper for Leaflet
- **@types/leaflet 1.9.21** - TypeScript definitions

### UI Components
- **Lucide React 0.563.0** - Icon library

### Developer Tools
- **ESLint 9.39.1** - Code linting
- **TypeScript ESLint 8.46.4** - TS linting
- **Vite Plugin PWA 1.2.0** - PWA support

---

## Development Scripts

### Available Commands
```bash
npm run dev       # Start development server on port 5174
npm run build     # Build for production
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

---

## Project Statistics

### Lines of Code
- **Components:** ~1,500 lines
- **Pages:** ~2,500 lines
- **Contexts:** ~200 lines
- **Data:** ~400 lines
- **Total:** ~4,600 lines of TypeScript/JSX

### Component Count
- **Pages:** 5 (Login, Signup, FarmDef, CropDetails, Dashboard)
- **Components:** 2 (Weather, DisasterSimulation)
- **Contexts:** 1 (Auth)

### Features
- **Data Fields:** 14+ per farmer
- **Form Steps:** 5 in registration
- **Dashboard Tabs:** 3
- **Crops:** 10 types × 4 varieties
- **Disaster Scenarios:** 5
- **Weather Forecast:** 7 days

---

## Data Flow Diagram

```
┌─────────────────────┐
│   App.tsx (Main)    │
└──────────┬──────────┘
           │
     ┌─────▼──────────┐
     │  AuthContext   │
     │   (Provider)   │
     └─────┬──────────┘
           │
      ┌────┴─────────────────────────────┐
      │                                  │
  ┌───▼────┐                      ┌──────▼────┐
  │ Routes │                      │demoFarmers│
  └───┬────┘                      └───────────┘
      │
  ┌───┴──────────────────────────┬──────────────────┐
  │                              │                  │
┌─▼────────┐           ┌────────▼────┐    ┌────────▼─────┐
│  Login   │◄─────────►│ Signup      │    │   Dashboard  │
└──────────┘           └─────┬──────┘    └──────────────┘
                             │
                        ┌────▼──────────────┐
                        │ Farm Definition  │
                        └────┬─────────────┘
                             │
                        ┌────▼──────────────┐
                        │ Crop Details     │
                        └──────────────────┘
```

---

## Important Locations

### Where to Find...

**To modify login behavior:**
→ `src/pages/LoginPage.tsx` (lines 30-45)
→ `src/data/demoFarmers.ts` (authenticate function)

**To add new crops:**
→ `src/pages/CropDetailsPage.tsx` (lines 3-14)

**To customize disaster scenarios:**
→ `src/components/DisasterSimulation.tsx` (lines 19-25)

**To modify insurance calculation:**
→ `src/components/DisasterSimulation.tsx` (lines 46-70)

**To add weather data:**
→ `src/pages/Dashboard.tsx` (lines 13-41)

**To change UI styling:**
→ Tailwind classes in component files
→ `tailwind.config.js` for theme customization

**To add/modify form validations:**
→ `src/pages/SignupPage.tsx` (validate functions)
→ `src/pages/CropDetailsPage.tsx` (validate functions)

---

## Quick Reference: Class Names

### Colors
- **Primary:** `primary-500`, `primary-600`, `primary-700`
- **Success:** `green-500`, `green-600`, `emerald-50`
- **Danger:** `red-500`, `red-600`, `red-50`
- **Warning:** `yellow-500`, `yellow-600`, `yellow-50`
- **Info:** `blue-500`, `blue-600`, `blue-50`

### Spacing
- **Padding:** `p-1` to `p-8` (1 = 0.25rem, increments of 4)
- **Margin:** `m-1` to `m-8` (same scale)
- **Gap:** `gap-1` to `gap-8` (flex/grid spacing)

### Responsive Prefixes
- **Mobile:** Default (no prefix)
- **Tablet:** `md:` (768px+)
- **Desktop:** `lg:` (1024px+)

Example: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4`

---

## Database/Storage Notes

### Current Implementation
- Data stored in-memory in `demoFarmers.ts`
- localStorage for session persistence
- Keys: `farmer_username`, `farmer_is_new`

### For Production
Replace with:
- Supabase PostgreSQL
- or MongoDB
- or Firebase Firestore
- Add proper authentication service
- Add API backend (Node.js, Python, etc.)

---

## Performance Considerations

### Optimizations Implemented
- Lazy loading of map library
- Conditional rendering of components
- Minimal re-renders with proper state management
- Responsive images and icons

### Recommendations
- Add code splitting for large pages
- Implement React.memo for expensive components
- Add service workers for offline functionality
- Optimize images before production

---

## Security Notes

### Current Demo State
- Passwords stored in plaintext (DEMO ONLY)
- No server-side validation
- No authentication tokens
- Data stored locally

### Production Requirements
- Use Supabase Auth or similar
- Hash passwords with bcrypt
- Implement JWT tokens
- Add HTTPS requirement
- Add CORS protection
- Validate on server
- Rate limiting on APIs
- Sanitize user inputs

---

**This completes the comprehensive file reference for the Farmer Insurance Platform.**

For specific implementation questions, refer to the IMPLEMENTATION_GUIDE.md
For testing instructions, refer to the TESTING_GUIDE.md
For quick start, refer to the QUICKSTART.md
