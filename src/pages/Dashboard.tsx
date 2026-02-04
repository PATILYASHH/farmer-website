import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import WeatherComponent from '../components/WeatherComponent';
import DisasterSimulation from '../components/DisasterSimulation';
import ClaimStatus from '../components/ClaimStatus';
import LanguageSelector from '../components/LanguageSelector';
import BottomNavigation from '../components/BottomNavigation';
import { LogOut, MapPin, BarChart3, Leaf, Droplets } from 'lucide-react';

// Mock weather data
const mockCurrentWeather = {
    condition: 'Partly Cloudy',
    temp: 28,
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    feelsLike: 30,
};

const mockForecast = [
    { date: '2026-02-04', high: 31, low: 22, condition: 'Sunny', precipitation: 10 },
    { date: '2026-02-05', high: 29, low: 21, condition: 'Cloudy', precipitation: 30 },
    { date: '2026-02-06', high: 27, low: 19, condition: 'Rainy', precipitation: 80 },
    { date: '2026-02-07', high: 25, low: 18, condition: 'Rainy', precipitation: 70 },
    { date: '2026-02-08', high: 29, low: 20, condition: 'Cloudy', precipitation: 20 },
    { date: '2026-02-09', high: 32, low: 23, condition: 'Sunny', precipitation: 5 },
    { date: '2026-02-10', high: 31, low: 22, condition: 'Sunny', precipitation: 0 },
];

export default function Dashboard() {
    const { farmer, logout } = useAuth();
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('overview');

    if (!farmer) return null;

    return (
        <div className="min-h-screen bg-gray-50 pb-20 md:pb-6">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-primary-700">
                                {t('header.title')}
                            </h1>
                            <p className="text-xs md:text-sm text-gray-600">
                                {t('header.subtitle')}
                            </p>
                        </div>

                        <div className="flex items-center gap-2 md:gap-4">
                            <LanguageSelector />
                            <div className="hidden md:block text-right">
                                <p className="font-medium text-gray-900">{farmer.fullName}</p>
                                <p className="text-sm text-gray-500">{farmer.username}</p>
                            </div>
                            <button
                                onClick={logout}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                                title={t('header.logout')}
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 space-y-4 md:space-y-6">
                {/* Tab Navigation - Hidden on Mobile */}
                <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="flex border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`flex-1 px-6 py-4 font-semibold transition text-center ${
                                activeTab === 'overview'
                                    ? 'border-b-2 border-primary-600 text-primary-600'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            {t('tab.overview')}
                        </button>
                        <button
                            onClick={() => setActiveTab('claimStatus')}
                            className={`flex-1 px-6 py-4 font-semibold transition text-center ${
                                activeTab === 'claimStatus'
                                    ? 'border-b-2 border-primary-600 text-primary-600'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            {t('tab.claimStatus')}
                        </button>
                        <button
                            onClick={() => setActiveTab('weather')}
                            className={`flex-1 px-6 py-4 font-semibold transition text-center ${
                                activeTab === 'weather'
                                    ? 'border-b-2 border-primary-600 text-primary-600'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            {t('tab.weather')}
                        </button>
                        <button
                            onClick={() => setActiveTab('disaster')}
                            className={`flex-1 px-6 py-4 font-semibold transition text-center ${
                                activeTab === 'disaster'
                                    ? 'border-b-2 border-primary-600 text-primary-600'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            {t('tab.disaster')}
                        </button>
                    </div>
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="space-y-4 md:space-y-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                            <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-md transition">
                                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                                    <div className="p-2 md:p-3 bg-blue-100 rounded-lg">
                                        <MapPin className="w-4 h-4 md:w-6 md:h-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-xs md:text-base font-medium text-gray-600">{t('stats.farmSize')}</h3>
                                </div>
                                <p className="text-2xl md:text-3xl font-bold text-gray-900">
                                    {farmer.farmAreaAcres || farmer.areaAcres}
                                </p>
                                <p className="text-xs md:text-sm text-gray-500 mt-1">{t('stats.acres')}</p>
                            </div>

                            <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-md transition">
                                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                                    <div className="p-2 md:p-3 bg-green-100 rounded-lg">
                                        <Leaf className="w-4 h-4 md:w-6 md:h-6 text-green-600" />
                                    </div>
                                    <h3 className="text-xs md:text-base font-medium text-gray-600">{t('stats.cropType')}</h3>
                                </div>
                                <p className="text-xl md:text-3xl font-bold text-gray-900 truncate">
                                    {farmer.cropDetails?.cropType || 'N/A'}
                                </p>
                                <p className="text-xs md:text-sm text-gray-500 mt-1 truncate">
                                    {farmer.cropDetails?.cropVariety}
                                </p>
                            </div>

                            <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-md transition">
                                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                                    <div className="p-2 md:p-3 bg-purple-100 rounded-lg">
                                        <Droplets className="w-4 h-4 md:w-6 md:h-6 text-purple-600" />
                                    </div>
                                    <h3 className="text-xs md:text-base font-medium text-gray-600">{t('stats.annualIncome')}</h3>
                                </div>
                                <p className="text-2xl md:text-3xl font-bold text-gray-900">
                                    ₹{farmer.annualIncome ? (farmer.annualIncome / 100000).toFixed(1) : 'N/A'}
                                </p>
                                <p className="text-xs md:text-sm text-gray-500 mt-1">{t('stats.lakhs')}</p>
                            </div>

                            <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-md transition">
                                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                                    <div className="p-2 md:p-3 bg-orange-100 rounded-lg">
                                        <BarChart3 className="w-4 h-4 md:w-6 md:h-6 text-orange-600" />
                                    </div>
                                    <h3 className="text-xs md:text-base font-medium text-gray-600">{t('stats.setupStatus')}</h3>
                                </div>
                                <p className="text-2xl md:text-3xl font-bold text-green-600">
                                    {farmer.farmSetupComplete ? '✓' : '○'}
                                </p>
                                <p className="text-xs md:text-sm text-gray-500 mt-1">
                                    {farmer.farmSetupComplete ? t('stats.complete') : t('stats.pending')}
                                </p>
                            </div>
                        </div>

                        {/* Farm Information */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                            {/* Personal Info */}
                            <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6">
                                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">{t('personal.title')}</h3>
                                <div className="space-y-3 md:space-y-4">
                                    <div className="flex justify-between border-b border-gray-100 pb-2 md:pb-3">
                                        <span className="text-sm md:text-base text-gray-600">{t('personal.fullName')}</span>
                                        <span className="text-sm md:text-base font-semibold text-gray-900 text-right">{farmer.fullName}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-2 md:pb-3">
                                        <span className="text-sm md:text-base text-gray-600">{t('personal.fatherName')}</span>
                                        <span className="text-sm md:text-base font-semibold text-gray-900 text-right">{farmer.fatherName}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-2 md:pb-3">
                                        <span className="text-sm md:text-base text-gray-600">{t('personal.age')}</span>
                                        <span className="text-sm md:text-base font-semibold text-gray-900 text-right">{farmer.age}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm md:text-base text-gray-600">{t('personal.mobile')}</span>
                                        <span className="text-sm md:text-base font-semibold text-gray-900 text-right">{farmer.mobileNumber}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Location Info */}
                            <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6">
                                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">{t('location.title')}</h3>
                                <div className="space-y-3 md:space-y-4">
                                    <div className="flex justify-between border-b border-gray-100 pb-2 md:pb-3">
                                        <span className="text-sm md:text-base text-gray-600">{t('location.state')}</span>
                                        <span className="text-sm md:text-base font-semibold text-gray-900 text-right">{farmer.location?.state}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-2 md:pb-3">
                                        <span className="text-sm md:text-base text-gray-600">{t('location.district')}</span>
                                        <span className="text-sm md:text-base font-semibold text-gray-900 text-right">{farmer.location?.district}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-2 md:pb-3">
                                        <span className="text-sm md:text-base text-gray-600">{t('location.village')}</span>
                                        <span className="text-sm md:text-base font-semibold text-gray-900 text-right">{farmer.location?.village}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm md:text-base text-gray-600">{t('location.coordinates')}</span>
                                        <span className="text-xs md:text-sm font-semibold text-gray-900 text-right">
                                            {farmer.location?.latitude.toFixed(3)}, {farmer.location?.longitude.toFixed(3)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Crop Information */}
                        {farmer.cropDetails && (
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl md:rounded-2xl border-2 border-green-200 p-4 md:p-8">
                                <h3 className="text-base md:text-lg font-bold text-green-900 mb-3 md:mb-4">{t('crop.title')}</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                                    <div>
                                        <p className="text-xs uppercase font-semibold text-green-700 mb-1">{t('crop.type')}</p>
                                        <p className="text-lg md:text-2xl font-bold text-green-900">{farmer.cropDetails.cropType}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase font-semibold text-green-700 mb-1">{t('crop.variety')}</p>
                                        <p className="text-lg md:text-2xl font-bold text-green-900">{farmer.cropDetails.cropVariety}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase font-semibold text-green-700 mb-1">{t('crop.sowingDate')}</p>
                                        <p className="text-sm md:text-lg font-bold text-green-900">
                                            {new Date(farmer.cropDetails.sowingDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase font-semibold text-green-700 mb-1">{t('crop.harvestDate')}</p>
                                        <p className="text-sm md:text-lg font-bold text-green-900">
                                            {new Date(farmer.cropDetails.harvestingDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Claim Status Tab */}
                {activeTab === 'claimStatus' && (
                    <ClaimStatus />
                )}

                {/* Weather Tab */}
                {activeTab === 'weather' && (
                    <WeatherComponent
                        currentWeather={mockCurrentWeather}
                        forecast={mockForecast}
                    />
                )}

                {/* Disaster Simulation Tab */}
                {activeTab === 'disaster' && (
                    <DisasterSimulation
                        farmBoundary={farmer.farmBoundary}
                        farmAreaAcres={farmer.farmAreaAcres || farmer.areaAcres}
                        annualIncome={farmer.annualIncome}
                        location={farmer.location || { latitude: 12.978, longitude: 77.673 }}
                    />
                )}
            </div>

            {/* Bottom Navigation for Mobile */}
            <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
    );
}
