// Demo farmer data - 10 farmers with Aadhaar-based login
// Password is simple "demo123" for all (in real app, would be hashed)

export interface FarmerData {
    id: string;
    aadharNumber: string;
    password: string;
    name: string;
    phone: string;
    village: string;
    farmId: string;
    farmName: string;
    areaAcres: number;
}

export const demoFarmers: FarmerData[] = [
    {
        id: 'farmer-1',
        aadharNumber: '1234-5678-9101',
        password: 'demo123',
        name: 'Ramesh Kumar',
        phone: '+91 98765 43210',
        village: 'Kadugodi',
        farmId: 'farm-1',
        farmName: 'Ramesh Farm',
        areaAcres: 10.5,
    },
    {
        id: 'farmer-2',
        aadharNumber: '2345-6789-1012',
        password: 'demo123',
        name: 'Suresh Patel',
        phone: '+91 98765 43211',
        village: 'Kadugodi',
        farmId: 'farm-2',
        farmName: 'Suresh Farm',
        areaAcres: 9.8,
    },
    {
        id: 'farmer-3',
        aadharNumber: '3456-7891-0123',
        password: 'demo123',
        name: 'Lakshmi Devi',
        phone: '+91 98765 43212',
        village: 'Kadugodi',
        farmId: 'farm-3',
        farmName: 'Lakshmi Farm',
        areaAcres: 11.2,
    },
    {
        id: 'farmer-4',
        aadharNumber: '4567-8910-1234',
        password: 'demo123',
        name: 'Prakash Reddy',
        phone: '+91 98765 43213',
        village: 'Kadugodi',
        farmId: 'farm-4',
        farmName: 'Prakash Farm',
        areaAcres: 8.9,
    },
    {
        id: 'farmer-5',
        aadharNumber: '5678-9101-2345',
        password: 'demo123',
        name: 'Anita Singh',
        phone: '+91 98765 43214',
        village: 'Kadugodi',
        farmId: 'farm-5',
        farmName: 'Anita Farm',
        areaAcres: 10.1,
    },
    {
        id: 'farmer-6',
        aadharNumber: '6789-1012-3456',
        password: 'demo123',
        name: 'Ganesh Rao',
        phone: '+91 98765 43215',
        village: 'Whitefield',
        farmId: 'farm-6',
        farmName: 'Ganesh Farm',
        areaAcres: 9.5,
    },
    {
        id: 'farmer-7',
        aadharNumber: '7891-0123-4567',
        password: 'demo123',
        name: 'Vijay Sharma',
        phone: '+91 98765 43216',
        village: 'Whitefield',
        farmId: 'farm-7',
        farmName: 'Vijay Farm',
        areaAcres: 10.8,
    },
    {
        id: 'farmer-8',
        aadharNumber: '8910-1234-5678',
        password: 'demo123',
        name: 'Meena Verma',
        phone: '+91 98765 43217',
        village: 'Whitefield',
        farmId: 'farm-8',
        farmName: 'Meena Farm',
        areaAcres: 9.3,
    },
    {
        id: 'farmer-9',
        aadharNumber: '9101-2345-6789',
        password: 'demo123',
        name: 'Arun Nair',
        phone: '+91 98765 43218',
        village: 'Whitefield',
        farmId: 'farm-9',
        farmName: 'Arun Farm',
        areaAcres: 10.7,
    },
    {
        id: 'farmer-10',
        aadharNumber: '1012-3456-7890',
        password: 'demo123',
        name: 'Radha Krishnan',
        phone: '+91 98765 43219',
        village: 'Whitefield',
        farmId: 'farm-10',
        farmName: 'Radha Farm',
        areaAcres: 9.2,
    },
];

/**
 * Simple authentication (in real app, use Supabase auth)
 */
export function authenticateFarmer(aadhar: string, password: string): FarmerData | null {
    const farmer = demoFarmers.find(
        f => f.aadharNumber === aadhar && f.password === password
    );
    return farmer || null;
}

/**
 * Get farmer by ID
 */
export function getFarmerById(id: string): FarmerData | undefined {
    return demoFarmers.find(f => f.id === id);
}

/**
 * Get farmer by Aadhaar
 */
export function getFarmerByAadhar(aadhar: string): FarmerData | undefined {
    return demoFarmers.find(f => f.aadharNumber === aadhar);
}
