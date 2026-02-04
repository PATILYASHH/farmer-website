import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Sprout, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';

export default function SignupPage({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
    const { signup } = useAuth();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [generatedUsername, setGeneratedUsername] = useState('');

    const [formData, setFormData] = useState({
        fullName: '',
        aadharNumber: '',
        fatherName: '',
        mobileNumber: '',
        age: '',
        annualIncome: '',
        bankName: '',
        accountNumber: '',
        ifscCode: '',
        state: '',
        district: '',
        village: '',
        latitude: '',
        longitude: '',
        password: '',
        confirmPassword: '',
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setError('');
    };

    const validateStep = (stepNum: number): boolean => {
        setError('');

        if (stepNum === 1) {
            if (!formData.fullName.trim()) {
                setError('Full Name is required');
                return false;
            }
            if (!formData.aadharNumber.trim() || formData.aadharNumber.replace(/\D/g, '').length !== 12) {
                setError('Valid Aadhaar number (12 digits) is required');
                return false;
            }
            if (!formData.fatherName.trim()) {
                setError("Father's Name is required");
                return false;
            }
            if (!formData.mobileNumber.trim() || formData.mobileNumber.replace(/\D/g, '').length !== 10) {
                setError('Valid Mobile number (10 digits) is required');
                return false;
            }
        } else if (stepNum === 2) {
            if (!formData.age.trim() || parseInt(formData.age) < 18) {
                setError('Age must be at least 18');
                return false;
            }
            if (!formData.annualIncome.trim() || parseInt(formData.annualIncome) < 0) {
                setError('Valid Annual Income is required');
                return false;
            }
        } else if (stepNum === 3) {
            if (!formData.bankName.trim()) {
                setError('Bank Name is required');
                return false;
            }
            if (!formData.accountNumber.trim() || formData.accountNumber.length < 10) {
                setError('Valid Account Number is required');
                return false;
            }
            if (!formData.ifscCode.trim() || formData.ifscCode.length !== 11) {
                setError('Valid IFSC Code (11 characters) is required');
                return false;
            }
        } else if (stepNum === 4) {
            if (!formData.state.trim()) {
                setError('State is required');
                return false;
            }
            if (!formData.district.trim()) {
                setError('District is required');
                return false;
            }
            if (!formData.village.trim()) {
                setError('Village is required');
                return false;
            }
            if (!formData.latitude.trim() || parseFloat(formData.latitude) < -90 || parseFloat(formData.latitude) > 90) {
                setError('Valid Latitude (-90 to 90) is required');
                return false;
            }
            if (!formData.longitude.trim() || parseFloat(formData.longitude) < -180 || parseFloat(formData.longitude) > 180) {
                setError('Valid Longitude (-180 to 180) is required');
                return false;
            }
        } else if (stepNum === 5) {
            if (!formData.password.trim() || formData.password.length < 6) {
                setError('Password must be at least 6 characters');
                return false;
            }
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return false;
            }
        }

        return true;
    };

    const handleNext = () => {
        if (validateStep(step)) {
            setStep(step + 1);
        }
    };

    const handlePrevious = () => {
        setStep(step - 1);
        setError('');
    };

    const handleSubmit = async () => {
        if (!validateStep(5)) return;

        setLoading(true);
        setError('');

        try {
            const result = signup({
                fullName: formData.fullName,
                aadharNumber: formData.aadharNumber,
                fatherName: formData.fatherName,
                mobileNumber: formData.mobileNumber,
                age: parseInt(formData.age),
                annualIncome: parseInt(formData.annualIncome),
                accountDetails: {
                    bankName: formData.bankName,
                    accountNumber: formData.accountNumber,
                    ifscCode: formData.ifscCode,
                },
                location: {
                    state: formData.state,
                    district: formData.district,
                    village: formData.village,
                    latitude: parseFloat(formData.latitude),
                    longitude: parseFloat(formData.longitude),
                },
                password: formData.password,
            });

            if (result.success && result.username) {
                setGeneratedUsername(result.username);
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                }, 2000);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('An error occurred during registration');
        } finally {
            setLoading(false);
        }
    };

    if (showSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-earth-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full text-center">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="flex justify-center mb-6">
                            <CheckCircle className="w-16 h-16 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Registration Successful!</h2>
                        <p className="text-gray-600 mb-4">
                            Your account has been created successfully. You can now proceed to set up your farm.
                        </p>
                        <p className="text-sm font-mono bg-gray-50 p-3 rounded-lg text-gray-800 mb-4">
                            <span className="text-gray-600">Username: </span>
                            <strong>{generatedUsername}</strong>
                        </p>
                        <p className="text-sm text-gray-600 mb-6">
                            You'll be redirected to the farm setup page shortly.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-earth-50 flex items-center justify-center p-4 py-8">
            <div className="max-w-2xl w-full">
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
                    <p className="text-gray-600">Create Your Farmer Account</p>
                </div>

                {/* Signup Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Progress Indicator */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <div key={s} className="flex items-center">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                                            s <= step
                                                ? 'bg-primary-600 text-white'
                                                : 'bg-gray-200 text-gray-600'
                                        }`}
                                    >
                                        {s}
                                    </div>
                                    {s < 5 && (
                                        <div
                                            className={`h-1 w-12 mx-1 transition-colors ${
                                                s < step ? 'bg-primary-600' : 'bg-gray-200'
                                            }`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Step 1: Personal Information */}
                    {step === 1 && (
                        <div className="space-y-5">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                                    placeholder="e.g., Ramesh Kumar"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Aadhaar Number *
                                </label>
                                <input
                                    type="text"
                                    value={formData.aadharNumber}
                                    onChange={(e) =>
                                        handleInputChange('aadharNumber', e.target.value.replace(/\D/g, '').slice(0, 12))
                                    }
                                    placeholder="XXXX-XXXX-XXXX (12 digits)"
                                    maxLength={14}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Father's Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.fatherName}
                                    onChange={(e) => handleInputChange('fatherName', e.target.value)}
                                    placeholder="e.g., Sharma Kumar"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mobile Number *
                                </label>
                                <input
                                    type="tel"
                                    value={formData.mobileNumber}
                                    onChange={(e) =>
                                        handleInputChange('mobileNumber', e.target.value.replace(/\D/g, '').slice(0, 10))
                                    }
                                    placeholder="10-digit mobile number"
                                    maxLength={10}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                                />
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 2: Financial Information */}
                    {step === 2 && (
                        <div className="space-y-5">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Financial Information</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Age *
                                </label>
                                <input
                                    type="number"
                                    value={formData.age}
                                    onChange={(e) => handleInputChange('age', e.target.value)}
                                    placeholder="e.g., 45"
                                    min="18"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Annual Income (₹) *
                                </label>
                                <input
                                    type="number"
                                    value={formData.annualIncome}
                                    onChange={(e) => handleInputChange('annualIncome', e.target.value)}
                                    placeholder="e.g., 250000"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                                />
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 3: Bank Account Details */}
                    {step === 3 && (
                        <div className="space-y-5">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Bank Account Details</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Bank Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.bankName}
                                    onChange={(e) => handleInputChange('bankName', e.target.value)}
                                    placeholder="e.g., ICICI Bank"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Account Number *
                                </label>
                                <input
                                    type="text"
                                    value={formData.accountNumber}
                                    onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                                    placeholder="e.g., 1234567890"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    IFSC Code *
                                </label>
                                <input
                                    type="text"
                                    value={formData.ifscCode}
                                    onChange={(e) =>
                                        handleInputChange('ifscCode', e.target.value.toUpperCase().slice(0, 11))
                                    }
                                    placeholder="e.g., ICIC0000001"
                                    maxLength={11}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                                />
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 4: Location Information */}
                    {step === 4 && (
                        <div className="space-y-5">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Location Details</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    State *
                                </label>
                                <input
                                    type="text"
                                    value={formData.state}
                                    onChange={(e) => handleInputChange('state', e.target.value)}
                                    placeholder="e.g., Karnataka"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    District *
                                </label>
                                <input
                                    type="text"
                                    value={formData.district}
                                    onChange={(e) => handleInputChange('district', e.target.value)}
                                    placeholder="e.g., Bangalore"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Village *
                                </label>
                                <input
                                    type="text"
                                    value={formData.village}
                                    onChange={(e) => handleInputChange('village', e.target.value)}
                                    placeholder="e.g., Kadugodi"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Latitude *
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.latitude}
                                        onChange={(e) => handleInputChange('latitude', e.target.value)}
                                        placeholder="e.g., 12.978"
                                        step="0.001"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Longitude *
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.longitude}
                                        onChange={(e) => handleInputChange('longitude', e.target.value)}
                                        placeholder="e.g., 77.673"
                                        step="0.001"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 5: Password Setup */}
                    {step === 5 && (
                        <div className="space-y-5">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Your Password</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password *
                                </label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    placeholder="Minimum 6 characters"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm Password *
                                </label>
                                <input
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                    placeholder="Re-enter your password"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                                />
                            </div>

                            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                                <p className="text-sm text-blue-700">
                                    <strong>Note:</strong> Your username will be auto-generated based on your full name. You'll use it to login along with your password.
                                </p>
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex gap-4 mt-8">
                        <button
                            onClick={handlePrevious}
                            disabled={step === 1}
                            className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-5 h-5" />
                            Previous
                        </button>

                        <button
                            onClick={step === 5 ? handleSubmit : handleNext}
                            disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating Account...' : step === 5 ? 'Create Account' : 'Next'}
                            {!loading && step < 5 && <ChevronRight className="w-5 h-5" />}
                        </button>
                    </div>

                    {/* Switch to Login */}
                    <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <button
                                onClick={onSwitchToLogin}
                                className="text-primary-600 font-semibold hover:text-primary-700"
                            >
                                Login here
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
