import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Leaf, ChevronRight } from 'lucide-react';

const CROP_TYPES = [
    { name: 'Rice', varieties: ['Basmati', 'Jasmine', 'Arborio', 'Carnaroli'] },
    { name: 'Wheat', varieties: ['Indian', 'Durum', 'Spelt', 'Einkorn'] },
    { name: 'Corn', varieties: ['Dent', 'Flint', 'Sweet', 'Popcorn'] },
    { name: 'Sugarcane', varieties: ['Co94020', 'Co06020', 'Co88029', 'Co07019'] },
    { name: 'Cotton', varieties: ['Bt Cotton', 'Hybrid', 'Non-Bt', 'Organic'] },
    { name: 'Potato', varieties: ['Red', 'Russet', 'Yukon Gold', 'Fingerling'] },
    { name: 'Tomato', varieties: ['Cherry', 'Beefsteak', 'Roma', 'Grape'] },
    { name: 'Onion', varieties: ['Red', 'Yellow', 'White', 'Sweet'] },
    { name: 'Chili', varieties: ['Green', 'Red', 'Yellow', 'Habanero'] },
    { name: 'Soybean', varieties: ['MG IV', 'MG V', 'MG VI', 'MG VII'] },
];

export default function CropDetailsPage({ onNext }: { onNext: () => void }) {
    const { farmer, completeFarmSetup, tempFarmData } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        cropType: '',
        cropVariety: '',
        sowingDate: '',
        harvestingDate: '',
    });

    const [varietyOptions, setVarietyOptions] = useState<string[]>([]);

    if (!farmer) return null;

    const handleCropTypeChange = (type: string) => {
        setFormData(prev => ({
            ...prev,
            cropType: type,
            cropVariety: '',
        }));
        
        const crop = CROP_TYPES.find(c => c.name === type);
        setVarietyOptions(crop ? crop.varieties : []);
        setError('');
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setError('');
    };

    const validateForm = (): boolean => {
        setError('');

        if (!formData.cropType) {
            setError('Please select a crop type');
            return false;
        }

        if (!formData.cropVariety) {
            setError('Please select a crop variety');
            return false;
        }

        if (!formData.sowingDate) {
            setError('Sowing date is required');
            return false;
        }

        if (!formData.harvestingDate) {
            setError('Harvesting date is required');
            return false;
        }

        const sowing = new Date(formData.sowingDate);
        const harvesting = new Date(formData.harvestingDate);

        if (harvesting <= sowing) {
            setError('Harvesting date must be after sowing date');
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setLoading(true);

        try {
            // Use temp farm data if available, otherwise use existing farmer data
            const farmBoundary = tempFarmData?.boundary || farmer.farmBoundary || [];
            const farmSize = tempFarmData?.size || farmer.farmAreaAcres || farmer.areaAcres || 5.0;
            
            const success = completeFarmSetup(
                farmBoundary,
                {
                    cropType: formData.cropType,
                    cropVariety: formData.cropVariety,
                    sowingDate: formData.sowingDate,
                    harvestingDate: formData.harvestingDate,
                },
                farmSize
            );

            if (success) {
                setTimeout(() => {
                    onNext();
                }, 500);
            } else {
                setError('Failed to save crop details. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-2xl mx-auto px-4 py-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Crop Details</h1>
                    <p className="text-gray-600">
                        Tell us about the crops you plan to grow on your farm.
                    </p>
                </div>
            </header>

            <div className="max-w-2xl mx-auto px-4 py-6">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    {/* Farm Summary */}
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-blue-600 uppercase font-semibold">Farmer Name</p>
                                <p className="text-lg font-bold text-blue-900">{farmer.fullName}</p>
                            </div>
                            <div>
                                <p className="text-xs text-blue-600 uppercase font-semibold">Farm Size</p>
                                <p className="text-lg font-bold text-blue-900">
                                    {tempFarmData?.size || farmer.farmAreaAcres || 'N/A'} acres
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-blue-600 uppercase font-semibold">Location</p>
                                <p className="text-lg font-bold text-blue-900">{farmer.location?.village}</p>
                            </div>
                            <div>
                                <p className="text-xs text-blue-600 uppercase font-semibold">District</p>
                                <p className="text-lg font-bold text-blue-900">{farmer.location?.district}</p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="space-y-6">
                        {/* Crop Type */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">
                                <div className="flex items-center gap-2 mb-3">
                                    <Leaf className="w-5 h-5 text-green-600" />
                                    <span>Select Crop Type *</span>
                                </div>
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {CROP_TYPES.map(crop => (
                                    <button
                                        key={crop.name}
                                        onClick={() => handleCropTypeChange(crop.name)}
                                        className={`p-4 rounded-lg border-2 font-semibold transition ${
                                            formData.cropType === crop.name
                                                ? 'border-primary-600 bg-primary-50 text-primary-900'
                                                : 'border-gray-300 bg-white text-gray-700 hover:border-primary-400'
                                        }`}
                                    >
                                        {crop.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Crop Variety */}
                        {formData.cropType && (
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-3">
                                    Select Variety of {formData.cropType} *
                                </label>
                                <select
                                    value={formData.cropVariety}
                                    onChange={(e) => handleInputChange('cropVariety', e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                                >
                                    <option value="">Choose a variety...</option>
                                    {varietyOptions.map(variety => (
                                        <option key={variety} value={variety}>
                                            {variety}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Sowing Date */}
                        <div>
                            <label htmlFor="sowingDate" className="block text-sm font-bold text-gray-700 mb-2">
                                Sowing Date *
                            </label>
                            <input
                                id="sowingDate"
                                type="date"
                                value={formData.sowingDate}
                                onChange={(e) => handleInputChange('sowingDate', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                            />
                        </div>

                        {/* Harvesting Date */}
                        <div>
                            <label htmlFor="harvestingDate" className="block text-sm font-bold text-gray-700 mb-2">
                                Expected Harvesting Date *
                            </label>
                            <input
                                id="harvestingDate"
                                type="date"
                                value={formData.harvestingDate}
                                onChange={(e) => handleInputChange('harvestingDate', e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                            />
                        </div>

                        {/* Growth Duration */}
                        {formData.sowingDate && formData.harvestingDate && (
                            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                                <p className="text-sm text-green-700">
                                    <strong>Growth Duration:</strong>{' '}
                                    {Math.ceil(
                                        (new Date(formData.harvestingDate).getTime() -
                                            new Date(formData.sowingDate).getTime()) /
                                        (1000 * 60 * 60 * 24)
                                    )}{' '}
                                    days
                                </p>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                        >
                            {loading ? 'Saving Crop Details...' : 'Complete Farm Setup'}
                            {!loading && <ChevronRight className="w-5 h-5" />}
                        </button>
                    </div>

                    {/* Info Box */}
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mt-8">
                        <p className="text-sm text-blue-700">
                            <strong>Next Step:</strong> After completing this form, you'll be redirected to your dashboard where you can view farm details, weather forecasts, and disaster simulations.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
