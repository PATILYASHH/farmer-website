import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { FarmerData } from '../data/demoFarmers';
import { authenticateFarmer, getFarmerByUsername, registerFarmer, updateFarmerFarmSetup } from '../data/demoFarmers';

interface SignupData {
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
    password: string;
}

interface AuthContextType {
    farmer: FarmerData | null;
    login: (username: string, password: string) => boolean;
    signup: (data: SignupData) => { success: boolean; message: string; username?: string };
    logout: () => void;
    isAuthenticated: boolean;
    isNewUser: boolean;
    completeFarmSetup: (farmBoundary: any[], cropDetails: any, farmSize?: number) => boolean;
    setTempFarmBoundary: (boundary: any[], farmSize: number) => void;
    tempFarmData: { boundary: any[]; size: number } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [farmer, setFarmer] = useState<FarmerData | null>(null);
    const [isNewUser, setIsNewUser] = useState(false);
    const [tempFarmData, setTempFarmData] = useState<{ boundary: any[]; size: number } | null>(null);

    // Load farmer from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('farmer_username');
        const isNew = localStorage.getItem('farmer_is_new') === 'true';
        
        if (stored) {
            const f = getFarmerByUsername(stored);
            if (f) {
                setFarmer(f);
                setIsNewUser(isNew && !f.farmSetupComplete);
            }
        }
    }, []);

    // Reload farmer data when localStorage changes
    useEffect(() => {
        const handleStorageChange = () => {
            const stored = localStorage.getItem('farmer_username');
            if (stored && farmer) {
                const f = getFarmerByUsername(stored);
                if (f) {
                    setFarmer(f);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [farmer]);

    const login = (username: string, password: string): boolean => {
        const authenticated = authenticateFarmer(username, password);
        if (authenticated) {
            setFarmer(authenticated);
            setIsNewUser(false);
            localStorage.setItem('farmer_username', username);
            localStorage.setItem('farmer_is_new', 'false');
            return true;
        }
        return false;
    };

    const signup = (data: SignupData): { success: boolean; message: string; username?: string } => {
        const newFarmer = registerFarmer({
            fullName: data.fullName,
            fatherName: data.fatherName,
            aadharNumber: data.aadharNumber,
            mobileNumber: data.mobileNumber,
            age: data.age,
            annualIncome: data.annualIncome,
            accountDetails: data.accountDetails,
            location: data.location,
            password: data.password,
            farmSetupComplete: false,
            phone: data.mobileNumber,
            village: data.location.village,
        } as any);

        if (newFarmer) {
            setFarmer(newFarmer);
            setIsNewUser(true);
            localStorage.setItem('farmer_username', newFarmer.username);
            localStorage.setItem('farmer_is_new', 'true');
            return {
                success: true,
                message: 'Account created successfully!',
                username: newFarmer.username,
            };
        }

        return {
            success: false,
            message: 'This Aadhaar number is already registered',
        };
    };

    const completeFarmSetup = (farmBoundary: any[], cropDetails: any, farmSize?: number): boolean => {
        if (!farmer) return false;

        // Update in the farmers data store with farm size
        const actualFarmSize = farmSize || tempFarmData?.size;
        const success = updateFarmerFarmSetup(farmer.id, farmBoundary, cropDetails, actualFarmSize);
        
        if (success) {
            // Reload the updated farmer data
            const updatedFarmer = getFarmerByUsername(farmer.username);
            if (updatedFarmer) {
                setFarmer(updatedFarmer);
            }
            setIsNewUser(false);
            setTempFarmData(null); // Clear temp data
            localStorage.setItem('farmer_is_new', 'false');
            return true;
        }
        
        return false;
    };

    const setTempFarmBoundary = (boundary: any[], farmSize: number) => {
        setTempFarmData({ boundary, size: farmSize });
    };

    const logout = () => {
        setFarmer(null);
        setIsNewUser(false);
        localStorage.removeItem('farmer_username');
        localStorage.removeItem('farmer_is_new');
    };

    return (
        <AuthContext.Provider
            value={{
                farmer,
                login,
                signup,
                logout,
                isAuthenticated: !!farmer,
                isNewUser,
                completeFarmSetup,
                setTempFarmBoundary,
                tempFarmData,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
