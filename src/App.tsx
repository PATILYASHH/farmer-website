import { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import FarmDefinitionPage from './pages/FarmDefinitionPage';
import CropDetailsPage from './pages/CropDetailsPage';
import Dashboard from './pages/Dashboard';

function App() {
    const { isAuthenticated, isNewUser } = useAuth();
    const [authView, setAuthView] = useState<'login' | 'signup'>('login');
    const [setupStep, setSetupStep] = useState<'farm' | 'crop'>('farm');

    // Not authenticated - show login/signup
    if (!isAuthenticated) {
        if (authView === 'login') {
            return <LoginPage onSwitchToSignup={() => setAuthView('signup')} />;
        } else {
            return <SignupPage onSwitchToLogin={() => setAuthView('login')} />;
        }
    }

    // New user - show farm setup flow
    if (isNewUser) {
        if (setupStep === 'farm') {
            return <FarmDefinitionPage onNext={() => setSetupStep('crop')} />;
        } else {
            return <CropDetailsPage onNext={() => window.location.reload()} />;
        }
    }

    // Authenticated user with complete setup - show dashboard
    return <Dashboard />;
}

export default App;
