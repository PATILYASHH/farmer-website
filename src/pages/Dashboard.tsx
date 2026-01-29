import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { farmBoundaries } from '../data/farmBoundaries';
import { damageData, damageStatistics } from '../data/damageData';
import FarmMap from '../components/FarmMap';
import AIAssistant from '../components/AIAssistant';
import {
    LogOut,
    User,
    MapPin,
    TrendingDown,
    DollarSign,
    CheckCircle,
    XCircle,
} from 'lucide-react';

export default function Dashboard() {
    const { farmer, logout } = useAuth();
    const [showDamage, setShowDamage] = useState(false);

    if (!farmer) return null;

    // Get farmer's farm data
    const farm = farmBoundaries.find((f) => f.id === farmer.farmId);
    const damage = farm ? damageData[farm.id] : null;

    // Calculate insurance amount (₹50,000 per affected acre)
    const insuranceAmount = damage
        ? Math.round(damage.affectedAcres * 50000)
        : 0;
    const isEligible = damage ? damage.damagePercentage > 10 : false;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-primary-700">
                                PM Kisan Yojana
                            </h1>
                            <p className="text-sm text-gray-600">
                                Farmer Insurance Platform
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="font-medium text-gray-900">{farmer.name}</p>
                                <p className="text-sm text-gray-500">{farmer.aadharNumber}</p>
                            </div>
                            <button
                                onClick={logout}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <h3 className="text-sm font-medium text-gray-600">Farmer ID</h3>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                            {farmer.id.split('-')[1].toUpperCase()}
                        </p>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <MapPin className="w-5 h-5 text-green-600" />
                            </div>
                            <h3 className="text-sm font-medium text-gray-600">Farm Area</h3>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                            {farm?.areaAcres} acres
                        </p>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <TrendingDown className="w-5 h-5 text-orange-600" />
                            </div>
                            <h3 className="text-sm font-medium text-gray-600">Damage</h3>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                            {damage?.damagePercentage || 0}%
                        </p>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <DollarSign className="w-5 h-5 text-purple-600" />
                            </div>
                            <h3 className="text-sm font-medium text-gray-600">
                                Insurance
                            </h3>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                            ₹{(insuranceAmount / 1000).toFixed(0)}K
                        </p>
                    </div>
                </div>

                {/* Map Toggle & Display */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Farm Location & Damage Assessment
                        </h2>
                        <button
                            onClick={() => setShowDamage(!showDamage)}
                            className={`px-4 py-2 rounded-lg font-medium transition ${showDamage
                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                                }`}
                        >
                            {showDamage ? '🌊 Damage View' : '✅ Normal View'}
                        </button>
                    </div>
                    <div className="h-[500px]">
                        <FarmMap
                            showDamage={showDamage}
                            selectedFarmId={farmer.farmId}
                        />
                    </div>
                </div>

                {/* Farm Details & Insurance Status */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Farm Details */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Farm Details
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Farm Name:</span>
                                <span className="font-medium text-gray-900">
                                    {farm?.farmName}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Location:</span>
                                <span className="font-medium text-gray-900">
                                    {farmer.village}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Area:</span>
                                <span className="font-medium text-gray-900">
                                    {farm?.areaAcres} acres
                                </span>
                            </div>
                            {damage && (
                                <>
                                    <hr className="my-3" />
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Affected Area:</span>
                                        <span className="font-medium text-orange-600">
                                            {damage.affectedAcres} acres
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Damage Level:</span>
                                        <span
                                            className={`font-medium ${damage.floodSeverity === 'high'
                                                ? 'text-red-600'
                                                : damage.floodSeverity === 'medium'
                                                    ? 'text-orange-600'
                                                    : 'text-yellow-600'
                                                }`}
                                        >
                                            {damage.floodSeverity.toUpperCase()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                        {damage.description}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Insurance Status */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Insurance Claim Status
                        </h3>

                        {isEligible ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-green-700 bg-green-50 p-4 rounded-lg">
                                    <CheckCircle className="w-6 h-6" />
                                    <div>
                                        <p className="font-semibold">Eligible for Insurance</p>
                                        <p className="text-sm">
                                            Damage exceeds minimum threshold
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-primary-50 to-green-50 p-5 rounded-lg border border-primary-200">
                                    <p className="text-sm text-gray-600 mb-2">
                                        Approved Claim Amount:
                                    </p>
                                    <p className="text-3xl font-bold text-primary-700">
                                        ₹{insuranceAmount.toLocaleString('en-IN')}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Based on {damage?.affectedAcres} acres @ ₹50,000/acre
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span className="text-sm text-gray-700">
                                            Satellite verification completed
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span className="text-sm text-gray-700">
                                            AI assessment completed
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span className="text-sm text-gray-700">
                                            Claim approved
                                        </span>
                                    </div>
                                </div>

                                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition">
                                    Process Payment
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-4 rounded-lg">
                                    <XCircle className="w-6 h-6" />
                                    <div>
                                        <p className="font-semibold">Not Eligible</p>
                                        <p className="text-sm">
                                            {damage && damage.damagePercentage > 0
                                                ? 'Damage below 10% threshold'
                                                : 'No damage detected'}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                    <p className="text-sm text-blue-800">
                                        <strong>Note:</strong> Insurance claims require minimum 10%
                                        damage to farmland. Your farm shows{' '}
                                        {damage?.damagePercentage || 0}% damage.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Overall Statistics */}
                <div className="bg-gradient-to-r from-primary-600 to-green-600 rounded-xl shadow-lg text-white p-6">
                    <h3 className="text-lg font-semibold mb-4">
                        Overall Damage Statistics
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <p className="text-sm opacity-90">Total Farms</p>
                            <p className="text-3xl font-bold">
                                {damageStatistics.totalFarms}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm opacity-90">Affected Farms</p>
                            <p className="text-3xl font-bold">
                                {damageStatistics.damagedFarms}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm opacity-90">Severely Affected</p>
                            <p className="text-3xl font-bold">
                                {damageStatistics.severelyAffected}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm opacity-90">Eligible for Aid</p>
                            <p className="text-3xl font-bold">
                                {damageStatistics.eligibleForInsurance}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Assistant */}
            <AIAssistant />
        </div>
    );
}
