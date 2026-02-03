// Demo farmer data with comprehensive profile information
// Password is simple "demo123" for all (in real app, would be hashed)
// All data is persisted to localStorage

const STORAGE_KEY = 'farmers_data';

// Initialize farmers from localStorage or use defaults
function loadFarmers(): FarmerData[] {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('Error loading farmers from localStorage:', error);
    }
    return getDefaultFarmers();
}

// Save farmers to localStorage
function saveFarmers(farmers: FarmerData[]): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(farmers));
    } catch (error) {
        console.error('Error saving farmers to localStorage:', error);
    }
}

export interface FarmerData {
    id: string;
    username: string;
    password: string;
    fullName: string;
    aadharNumber: string;
    fatherName: string;
    mobileNumber: string;
    age: number;
    annualIncome: number;
    accountDetails: {
        bankName: string;
        accountNumber: string;
        ifscCode: string;
    };
    location: {
        state: string;
        district: string;
        village: string;
        latitude: number;
        longitude: number;
    };
    farmSetupComplete: boolean;
    farmBoundary?: Array<{ latitude: number; longitude: number }>;
    farmAreaAcres?: number;
    cropDetails?: {
        cropType: string;
        cropVariety: string;
        sowingDate: string;
        harvestingDate: string;
    };
    phone: string;
    village: string;
    farmId: string;
    farmName: string;
    areaAcres: number;
}

// Default farmers data
function getDefaultFarmers(): FarmerData[] {
    return [
        {
            id: 'farmer-1',
            username: 'ramesh_kumar',
            aadharNumber: '1234-5678-9101',
            password: 'demo123',
            fullName: 'Ramesh Kumar',
            fatherName: 'Sharma Kumar',
            mobileNumber: '+91 98765 43210',
            age: 45,
            annualIncome: 250000,
            accountDetails: {
                bankName: 'ICICI Bank',
                accountNumber: '1234567890',
                ifscCode: 'ICIC0000001',
            },
            location: {
                state: 'Karnataka',
                district: 'Bangalore',
                village: 'Kadugodi',
                latitude: 12.978,
                longitude: 77.673,
            },
            farmSetupComplete: true,
            farmBoundary: [
                { latitude: 12.978, longitude: 77.673 },
                { latitude: 12.979, longitude: 77.673 },
                { latitude: 12.979, longitude: 77.674 },
            ],
            farmAreaAcres: 10.5,
            cropDetails: {
                cropType: 'Rice',
                cropVariety: 'Basmati',
                sowingDate: '2026-01-15',
                harvestingDate: '2026-06-15',
            },
            phone: '+91 98765 43210',
            village: 'Kadugodi',
            farmId: 'farm-1',
            farmName: 'Ramesh Farm',
            areaAcres: 10.5,
        },
        {
            id: 'farmer-2',
            username: 'suresh_patel',
            aadharNumber: '2345-6789-1012',
            password: 'demo123',
            fullName: 'Suresh Patel',
            fatherName: 'Patel Narendrabhai',
            mobileNumber: '+91 98765 43211',
            age: 38,
            annualIncome: 280000,
            accountDetails: {
                bankName: 'HDFC Bank',
                accountNumber: '9876543210',
                ifscCode: 'HDFC0000001',
            },
            location: {
                state: 'Karnataka',
                district: 'Bangalore',
                village: 'Kadugodi',
                latitude: 12.977,
                longitude: 77.672,
            },
            farmSetupComplete: true,
            farmBoundary: [
                { latitude: 12.977, longitude: 77.672 },
                { latitude: 12.978, longitude: 77.672 },
                { latitude: 12.978, longitude: 77.673 },
            ],
            farmAreaAcres: 9.8,
            cropDetails: {
                cropType: 'Wheat',
                cropVariety: 'Indian',
                sowingDate: '2025-12-01',
                harvestingDate: '2026-05-01',
            },
            phone: '+91 98765 43211',
            village: 'Kadugodi',
            farmId: 'farm-2',
            farmName: 'Suresh Farm',
            areaAcres: 9.8,
        },
    ];
}

export let demoFarmers: FarmerData[] = loadFarmers();

/**
 * Authenticate farmer with username and password
 */
export function authenticateFarmer(username: string, password: string): FarmerData | null {
    demoFarmers = loadFarmers();
    const farmer = demoFarmers.find(
        f => f.username === username && f.password === password
    );
    return farmer || null;
}

/**
 * Get farmer by username
 */
export function getFarmerByUsername(username: string): FarmerData | undefined {
    demoFarmers = loadFarmers();
    return demoFarmers.find(f => f.username === username);
}

/**
 * Get farmer by ID
 */
export function getFarmerById(id: string): FarmerData | undefined {
    demoFarmers = loadFarmers();
    return demoFarmers.find(f => f.id === id);
}

/**
 * Get farmer by Aadhaar
 */
export function getFarmerByAadhar(aadhar: string): FarmerData | undefined {
    demoFarmers = loadFarmers();
    return demoFarmers.find(f => f.aadharNumber === aadhar);
}

/**
 * Check if username exists
 */
export function usernameExists(username: string): boolean {
    demoFarmers = loadFarmers();
    return demoFarmers.some(f => f.username === username);
}

/**
 * Check if Aadhaar exists
 */
export function aadharExists(aadhar: string): boolean {
    demoFarmers = loadFarmers();
    return demoFarmers.some(f => f.aadharNumber === aadhar);
}

/**
 * Generate unique username from full name
 */
export function generateUsername(fullName: string): string {
    const base = fullName.toLowerCase().replace(/\s+/g, '_');
    let username = base;
    let counter = 1;
    
    while (usernameExists(username)) {
        username = `${base}_${counter}`;
        counter++;
    }
    
    return username;
}

/**
 * Register a new farmer - persisted to localStorage
 */
export function registerFarmer(userData: Omit<FarmerData, 'id' | 'username' | 'farmId' | 'farmName'>): FarmerData | null {
    demoFarmers = loadFarmers();
    
    if (aadharExists(userData.aadharNumber)) {
        return null; // Aadhaar already registered
    }
    
    const username = generateUsername(userData.fullName);
    const newFarmer: FarmerData = {
        ...userData,
        id: `farmer-${Date.now()}`,
        username,
        farmId: `farm-${Date.now()}`,
        farmName: `${userData.fullName}'s Farm`,
    };
    
    demoFarmers.push(newFarmer);
    saveFarmers(demoFarmers);
    return newFarmer;
}

/**
 * Update farmer farm setup - persisted to localStorage
 */
export function updateFarmerFarmSetup(
    farmerId: string,
    farmBoundary: Array<{ latitude: number; longitude: number }>,
    cropDetails: any,
    farmSize?: number
): boolean {
    demoFarmers = loadFarmers();
    const farmer = demoFarmers.find(f => f.id === farmerId);
    if (!farmer) return false;
    
    farmer.farmBoundary = farmBoundary;
    farmer.cropDetails = cropDetails;
    farmer.farmSetupComplete = true;
    
    // Use provided farm size or calculate it
    if (farmSize && farmSize > 0) {
        farmer.farmAreaAcres = farmSize;
        farmer.areaAcres = farmSize;
    } else if (farmBoundary.length >= 3) {
        farmer.farmAreaAcres = calculateFarmArea(farmBoundary);
        farmer.areaAcres = farmer.farmAreaAcres;
    } else {
        // Default farm size if no boundary provided
        farmer.farmAreaAcres = 5.0;
        farmer.areaAcres = 5.0;
    }
    
    saveFarmers(demoFarmers);
    return true;
}

/**
 * Simple calculation of farm area from polygon points (in real app, use proper GIS)
 */
export function calculateFarmArea(points: Array<{ latitude: number; longitude: number }>): number {
    if (points.length < 3) return 0;
    
    // Shoelace formula
    let area = 0;
    for (let i = 0; i < points.length; i++) {
        const j = (i + 1) % points.length;
        area += points[i].latitude * points[j].longitude;
        area -= points[j].latitude * points[i].longitude;
    }
    
    // Convert to acres (rough approximation: 1 degree ≈ 110.57 km ≈ 27,350 acres)
    return Math.abs(area) / 2 * 27350;
}
