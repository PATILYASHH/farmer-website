import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { FarmerData } from '../data/demoFarmers';
import { authenticateFarmer, getFarmerByAadhar } from '../data/demoFarmers';

interface AuthContextType {
    farmer: FarmerData | null;
    login: (aadhar: string, password: string) => boolean;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [farmer, setFarmer] = useState<FarmerData | null>(null);

    // Load farmer from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('farmer_aadhar');
        if (stored) {
            const f = getFarmerByAadhar(stored);
            if (f) setFarmer(f);
        }
    }, []);

    const login = (aadhar: string, password: string): boolean => {
        const authenticated = authenticateFarmer(aadhar, password);
        if (authenticated) {
            setFarmer(authenticated);
            localStorage.setItem('farmer_aadhar', aadhar);
            return true;
        }
        return false;
    };

    const logout = () => {
        setFarmer(null);
        localStorage.removeItem('farmer_aadhar');
    };

    return (
        <AuthContext.Provider
            value={{
                farmer,
                login,
                logout,
                isAuthenticated: !!farmer,
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
