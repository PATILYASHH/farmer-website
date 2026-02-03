import { useState } from 'react';
import { AlertTriangle, RotateCw, DollarSign, TrendingDown } from 'lucide-react';
import { MapContainer, TileLayer, FeatureGroup, Polygon } from 'react-leaflet';

interface DisasterSimulationProps {
    farmBoundary?: Array<{ latitude: number; longitude: number }>;
    farmAreaAcres: number;
    annualIncome: number;
    location: {
        latitude: number;
        longitude: number;
    };
}

const DISASTER_SCENARIOS = [
    { 
        name: 'Severe Flood', 
        damagePercentage: 85, 
        color: '#3b82f6',
        description: 'Complete crop destruction, soil erosion, infrastructure damage'
    },
    { 
        name: 'Prolonged Drought', 
        damagePercentage: 70, 
        color: '#f59e0b',
        description: 'Severe yield loss, dried crops, irrigation system stress'
    },
    { 
        name: 'Hailstorm', 
        damagePercentage: 60, 
        color: '#8b5cf6',
        description: 'Physical crop damage, bruised produce, reduced quality'
    },
    { 
        name: 'Pest Outbreak', 
        damagePercentage: 45, 
        color: '#10b981',
        description: 'Partial crop loss, infested areas, treatment costs'
    },
    { 
        name: 'Heavy Rainfall', 
        damagePercentage: 40, 
        color: '#06b6d4',
        description: 'Waterlogging, delayed harvest, fungal diseases'
    },
    { 
        name: 'Cyclone/Storm', 
        damagePercentage: 75, 
        color: '#ef4444',
        description: 'Widespread destruction, uprooted plants, structural collapse'
    },
];

export default function DisasterSimulation({ 
    farmBoundary = [], 
    farmAreaAcres, 
    annualIncome,
    location 
}: DisasterSimulationProps) {
    const [selectedDisaster, setSelectedDisaster] = useState<string | null>(null);
    const [simulationData, setSimulationData] = useState<any>(null);

    const simulateDisaster = (disaster: typeof DISASTER_SCENARIOS[0]) => {
        // Calculate affected acres based on damage percentage
        const affectedAcres = (farmAreaAcres * disaster.damagePercentage) / 100;
        
        // Estimate damage value per acre (average crop value)
        const averageValuePerAcre = annualIncome / farmAreaAcres;
        const totalDamageValue = affectedAcres * averageValuePerAcre;
        
        // Insurance calculation - realistic formula
        let insuranceAmount = 0;
        let coveragePercentage = 0;
        
        if (disaster.damagePercentage >= 10) {
            // Progressive coverage based on damage severity
            if (disaster.damagePercentage >= 70) {
                coveragePercentage = 70; // Severe damage: 70% coverage
            } else if (disaster.damagePercentage >= 50) {
                coveragePercentage = 60; // High damage: 60% coverage
            } else if (disaster.damagePercentage >= 30) {
                coveragePercentage = 50; // Moderate damage: 50% coverage
            } else {
                coveragePercentage = 40; // Low damage: 40% coverage
            }
            
            // Calculate insurance with income cap
            const maxInsurance = annualIncome * 0.6; // Maximum 60% of annual income
            insuranceAmount = Math.min(
                totalDamageValue * (coveragePercentage / 100),
                maxInsurance
            );
        }
        
        const farmerLoss = totalDamageValue - insuranceAmount;

        setSimulationData({
            disasterName: disaster.name,
            disasterDescription: disaster.description,
            damagePercentage: disaster.damagePercentage,
            affectedAcres: parseFloat(affectedAcres.toFixed(2)),
            unaffectedAcres: parseFloat((farmAreaAcres - affectedAcres).toFixed(2)),
            totalFarmAcres: farmAreaAcres,
            estimatedDamage: Math.round(totalDamageValue),
            insuranceEligible: disaster.damagePercentage >= 10,
            insuranceAmount: Math.round(insuranceAmount),
            farmerLoss: Math.round(farmerLoss),
            coveragePercentage: coveragePercentage,
            incomeReplacement: parseFloat((insuranceAmount / annualIncome * 100).toFixed(1)),
            color: disaster.color,
        });

        setSelectedDisaster(disaster.name);
    };

    const resetSimulation = () => {
        setSelectedDisaster(null);
        setSimulationData(null);
    };

    const convertCoordinates = (points: any[]) => {
        return points.map(p => [p.latitude, p.longitude]);
    };

    const farmCoordinates = convertCoordinates(farmBoundary);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                    <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                        <h2 className="text-2xl font-bold text-red-900 mb-2">Disaster Simulation</h2>
                        <p className="text-red-800">
                            Simulate various disaster scenarios to see potential damage and insurance coverage. This helps you understand your farm's risk profile.
                        </p>
                    </div>
                </div>
            </div>

            {/* Disaster Selection */}
            <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Select a Disaster Scenario</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {DISASTER_SCENARIOS.map(disaster => (
                        <button
                            key={disaster.name}
                            onClick={() => simulateDisaster(disaster)}
                            className={`p-4 rounded-xl border-2 font-semibold transition text-left ${
                                selectedDisaster === disaster.name
                                    ? 'border-red-600 bg-red-50 text-red-900 shadow-lg'
                                    : 'border-gray-300 bg-white text-gray-700 hover:border-red-400 hover:shadow-md'
                            }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="text-3xl font-bold text-red-600">
                                    {disaster.damagePercentage}%
                                </div>
                                <AlertTriangle className="w-6 h-6 text-red-500" />
                            </div>
                            <div className="text-sm font-bold mb-1">{disaster.name}</div>
                            <div className="text-xs text-gray-600">{disaster.description}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Simulation Results */}
            {simulationData && (
                <div className="space-y-6">
                    {/* Map View */}
                    {farmBoundary.length > 0 && (
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                            <div className="h-80">
                                <MapContainer
                                    center={[location.latitude, location.longitude]}
                                    zoom={18}
                                    style={{ height: '100%', width: '100%' }}
                                >
                                    <TileLayer
                                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                        attribution='&copy; <a href="https://www.esri.com/">Esri</a> World Imagery'
                                        maxZoom={19}
                                    />
                                    <TileLayer
                                        url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
                                        attribution='Labels'
                                    />
                                    {farmCoordinates.length > 0 && (
                                        <FeatureGroup>
                                            <Polygon
                                                positions={farmCoordinates as any}
                                                pathOptions={{
                                                    color: '#ef4444',
                                                    fillColor: '#fee2e2',
                                                    fillOpacity: 0.6,
                                                    weight: 3,
                                                }}
                                            />
                                        </FeatureGroup>
                                    )}
                                </MapContainer>
                            </div>
                            <div className="bg-red-50 border-t border-red-200 p-4">
                                <p className="text-sm text-red-700">
                                    <strong>Satellite View:</strong> Red highlighted area shows your farm boundary on actual satellite imagery. The affected area during {simulationData.disasterName} is visible on the map.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Results Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Damage Analysis */}
                        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border-2 border-red-300 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <TrendingDown className="w-6 h-6 text-red-600" />
                                <h3 className="text-lg font-bold text-gray-900">Damage Report</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-white rounded-lg p-4 border-2 border-red-200">
                                    <p className="text-xs text-gray-600 uppercase font-semibold mb-1">
                                        Disaster Type
                                    </p>
                                    <p className="text-xl font-bold text-red-900 mb-1">
                                        {simulationData.disasterName}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        {simulationData.disasterDescription}
                                    </p>
                                </div>

                                <div className="bg-red-100 rounded-lg p-4 border border-red-300">
                                    <p className="text-xs text-red-700 uppercase font-semibold mb-2">
                                        Crop Damage
                                    </p>
                                    <p className="text-4xl font-bold text-red-700 mb-1">
                                        {simulationData.damagePercentage}%
                                    </p>
                                    <div className="w-full bg-red-200 rounded-full h-3 mt-2">
                                        <div 
                                            className="bg-red-600 h-3 rounded-full transition-all duration-1000"
                                            style={{ width: `${simulationData.damagePercentage}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                                        <p className="text-xs text-gray-600 mb-1">Damaged</p>
                                        <p className="text-xl font-bold text-red-600">
                                            {simulationData.affectedAcres}
                                        </p>
                                        <p className="text-xs text-gray-600">acres</p>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                        <p className="text-xs text-gray-600 mb-1">Safe</p>
                                        <p className="text-xl font-bold text-green-600">
                                            {simulationData.unaffectedAcres}
                                        </p>
                                        <p className="text-xs text-gray-600">acres</p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg p-4 border border-red-200">
                                    <p className="text-xs text-gray-600 uppercase font-semibold mb-1">
                                        💰 Total Loss Value
                                    </p>
                                    <p className="text-3xl font-bold text-red-700">
                                        ₹{simulationData.estimatedDamage.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Insurance Coverage */}
                        <div className={`rounded-2xl border-2 p-6 ${
                            simulationData.insuranceEligible
                                ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300'
                                : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300'
                        }`}>
                            <div className="flex items-center gap-2 mb-4">
                                <DollarSign className={`w-6 h-6 ${
                                    simulationData.insuranceEligible ? 'text-green-600' : 'text-gray-500'
                                }`} />
                                <h3 className="text-lg font-bold text-gray-900">Insurance Payout</h3>
                            </div>
                            <div className="space-y-4">
                                <div className={`rounded-lg p-4 border-2 ${
                                    simulationData.insuranceEligible 
                                        ? 'bg-green-100 border-green-300' 
                                        : 'bg-gray-100 border-gray-300'
                                }`}>
                                    <div className="flex items-center gap-2 mb-2">
                                        {simulationData.insuranceEligible ? (
                                            <>
                                                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                    ✓
                                                </div>
                                                <p className="font-bold text-green-900">
                                                    ELIGIBLE
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                    ✗
                                                </div>
                                                <p className="font-bold text-gray-700">
                                                    NOT ELIGIBLE
                                                </p>
                                            </>
                                        )}
                                    </div>
                                    {!simulationData.insuranceEligible && (
                                        <p className="text-sm text-gray-600">
                                            Requires minimum 10% damage
                                        </p>
                                    )}
                                </div>

                                {simulationData.insuranceEligible && (
                                    <>
                                        <div className="bg-white rounded-lg p-4 border-2 border-green-300">
                                            <p className="text-xs text-gray-600 uppercase font-semibold mb-1">
                                                💵 You Will Receive
                                            </p>
                                            <p className="text-4xl font-bold text-green-700 mb-2">
                                                ₹{simulationData.insuranceAmount.toLocaleString()}
                                            </p>
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className="px-2 py-1 bg-green-100 text-green-700 rounded font-semibold">
                                                    {simulationData.coveragePercentage}% Coverage
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                                            <p className="text-xs text-gray-600 uppercase font-semibold mb-1">
                                                ⚠️ Your Loss (Not Covered)
                                            </p>
                                            <p className="text-2xl font-bold text-orange-600">
                                                ₹{simulationData.farmerLoss.toLocaleString()}
                                            </p>
                                        </div>

                                        <div className="bg-white rounded-lg p-4 border border-green-200">
                                            <p className="text-xs text-gray-600 uppercase font-semibold mb-1">
                                                Income Replacement
                                            </p>
                                            <p className="text-2xl font-bold text-gray-900">
                                                {simulationData.incomeReplacement}%
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                of annual income (₹{annualIncome.toLocaleString()})
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Financial Summary */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-300 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Financial Impact</h3>
                            <div className="space-y-4">
                                <div className="bg-white rounded-lg p-4 border border-blue-200">
                                    <p className="text-xs text-gray-600 mb-2">BREAKDOWN</p>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-700">Total Damage:</span>
                                            <span className="font-bold text-red-600">
                                                ₹{simulationData.estimatedDamage.toLocaleString()}
                                            </span>
                                        </div>
                                        {simulationData.insuranceEligible && (
                                            <>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-700">Insurance Payout:</span>
                                                    <span className="font-bold text-green-600">
                                                        ₹{simulationData.insuranceAmount.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="border-t pt-2 flex justify-between">
                                                    <span className="font-bold text-gray-900">Net Loss:</span>
                                                    <span className="font-bold text-orange-600">
                                                        ₹{simulationData.farmerLoss.toLocaleString()}
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className={`rounded-lg p-4 ${
                                    simulationData.farmerLoss > annualIncome * 0.3 
                                        ? 'bg-red-100 border-2 border-red-300'
                                        : 'bg-yellow-100 border-2 border-yellow-300'
                                }`}>
                                    <p className="text-xs font-semibold mb-2">
                                        {simulationData.farmerLoss > annualIncome * 0.3 ? '⚠️ SEVERE IMPACT' : '⚠️ MODERATE IMPACT'}
                                    </p>
                                    <p className="text-xs text-gray-700">
                                        {simulationData.farmerLoss > annualIncome * 0.3 
                                            ? 'This disaster would cause severe financial hardship. Consider additional insurance coverage.'
                                            : 'Financial impact is moderate. Current insurance provides reasonable protection.'}
                                    </p>
                                </div>

                                <div className="bg-white rounded-lg p-4 border border-blue-200">
                                    <p className="text-xs text-gray-600 mb-2">RECOVERY TIME</p>
                                    <p className="text-2xl font-bold text-blue-600">
                                        {Math.ceil(simulationData.farmerLoss / (annualIncome / 12))} months
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        Estimated time to recover from losses
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Key Insights - Realistic Assessment */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-purple-900 mb-4">📊 Reality Check</h3>
                        <div className="space-y-3">
                            <div className="bg-white rounded-lg p-4 border border-purple-200">
                                <p className="text-sm font-semibold text-gray-900 mb-2">🌾 Crop Damage:</p>
                                <p className="text-sm text-gray-700">
                                    <strong>{simulationData.affectedAcres} acres</strong> out of your <strong>{simulationData.totalFarmAcres} acres</strong> would be destroyed by {simulationData.disasterName.toLowerCase()}. 
                                    That's <strong className="text-red-600">{simulationData.damagePercentage}% of your entire farm</strong> gone.
                                </p>
                            </div>

                            <div className="bg-white rounded-lg p-4 border border-purple-200">
                                <p className="text-sm font-semibold text-gray-900 mb-2">💰 Financial Reality:</p>
                                <p className="text-sm text-gray-700">
                                    Total loss: <strong className="text-red-600">₹{simulationData.estimatedDamage.toLocaleString()}</strong>
                                    {simulationData.insuranceEligible && (
                                        <>
                                            {' | '}Insurance helps with <strong className="text-green-600">₹{simulationData.insuranceAmount.toLocaleString()}</strong>
                                            {' | '}But you still lose <strong className="text-orange-600">₹{simulationData.farmerLoss.toLocaleString()}</strong> from your own pocket.
                                        </>
                                    )}
                                    {!simulationData.insuranceEligible && (
                                        <span className="text-red-600 font-semibold"> No insurance coverage - you pay everything!</span>
                                    )}
                                </p>
                            </div>

                            {simulationData.insuranceEligible && (
                                <div className="bg-white rounded-lg p-4 border border-purple-200">
                                    <p className="text-sm font-semibold text-gray-900 mb-2">⏱️ Recovery Timeline:</p>
                                    <p className="text-sm text-gray-700">
                                        With your annual income of ₹{annualIncome.toLocaleString()}, it will take approximately{' '}
                                        <strong className="text-blue-600">
                                            {Math.ceil(simulationData.farmerLoss / (annualIncome / 12))} months
                                        </strong>
                                        {' '}to recover from the out-of-pocket losses, assuming normal income continues.
                                    </p>
                                </div>
                            )}

                            <div className="bg-white rounded-lg p-4 border border-purple-200">
                                <p className="text-sm font-semibold text-gray-900 mb-2">🎯 What This Means:</p>
                                <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                                    <li>Your farm is <strong>seriously vulnerable</strong> to {simulationData.disasterName.toLowerCase()}</li>
                                    {simulationData.insuranceEligible ? (
                                        <>
                                            <li>Insurance covers only <strong>{simulationData.coveragePercentage}%</strong> of damage - not full protection</li>
                                            <li>You need <strong>emergency savings</strong> of at least ₹{simulationData.farmerLoss.toLocaleString()} to survive this</li>
                                        </>
                                    ) : (
                                        <li className="text-red-600 font-semibold">Damage too low for insurance - consider better coverage options!</li>
                                    )}
                                    <li>Consider <strong>disaster preparedness</strong> measures to reduce damage risk</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Action Recommendations */}
                    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-yellow-900 mb-4">⚠️ Recommended Actions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="bg-white rounded-lg p-4 border border-yellow-200">
                                <p className="text-sm font-bold text-gray-900 mb-2">🛡️ Before Disaster:</p>
                                <ul className="text-xs text-gray-700 space-y-1 ml-4 list-disc">
                                    <li>Review insurance coverage annually</li>
                                    <li>Build emergency fund (3-6 months income)</li>
                                    <li>Implement preventive measures</li>
                                    <li>Diversify crops to reduce risk</li>
                                </ul>
                            </div>
                            <div className="bg-white rounded-lg p-4 border border-yellow-200">
                                <p className="text-sm font-bold text-gray-900 mb-2">🆘 After Disaster:</p>
                                <ul className="text-xs text-gray-700 space-y-1 ml-4 list-disc">
                                    <li>Document all damage with photos</li>
                                    <li>File insurance claim immediately</li>
                                    <li>Apply for government relief programs</li>
                                    <li>Seek community support resources</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Reset Button */}
                    <button
                        onClick={resetSimulation}
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold rounded-xl transition shadow-lg"
                    >
                        <RotateCw className="w-5 h-5" />
                        Try Different Disaster Scenario
                    </button>
                </div>
            )}

            {!simulationData && (
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8 text-center">
                    <AlertTriangle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                    <p className="text-gray-700 font-medium">
                        Select a disaster scenario above to see potential damage and insurance coverage
                    </p>
                </div>
            )}
        </div>
    );
}
