import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Sprout, Shield } from 'lucide-react';

export default function LoginPage({ onSwitchToSignup }: { onSwitchToSignup: () => void }) {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simple validation
        if (!username || !password) {
            setError('Please enter both username and password');
            setLoading(false);
            return;
        }

        const success = login(username, password);
        if (!success) {
            setError('Invalid username or password');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-earth-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Logo & Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="bg-primary-500 p-4 rounded-2xl shadow-lg">
                            <Sprout className="w-12 h-12 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        PM Kisan Yojana
                    </h1>
                    <p className="text-gray-600">Farmer Insurance Platform</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="flex items-center gap-2 mb-6">
                        <Shield className="w-5 h-5 text-primary-600" />
                        <h2 className="text-xl font-semibold text-gray-800">Farmer Login</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="e.g., ramesh_kumar"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-xs text-gray-500 text-center mb-3">Demo Credentials</p>
                        <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-600 space-y-1">
                            <p><strong>Username:</strong> ramesh_kumar</p>
                            <p><strong>Password:</strong> demo123</p>
                        </div>
                    </div>

                    {/* Create Account Link */}
                    <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <button
                                type="button"
                                onClick={onSwitchToSignup}
                                className="text-primary-600 font-semibold hover:text-primary-700"
                            >
                                Sign up here
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
