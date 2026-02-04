import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Trash2, ChevronRight } from 'lucide-react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

export default function FarmDefinitionPage({ onNext }: { onNext: () => void }) {
    const { farmer, setTempFarmBoundary } = useAuth();
    const [drawnPoints, setDrawnPoints] = useState<Array<{ latitude: number; longitude: number }>>([]);
    const [farmSize, setFarmSize] = useState(0);
    const [error, setError] = useState('');

    if (!farmer) return null;

    const calculateArea = (points: Array<{ latitude: number; longitude: number }>) => {
        if (points.length < 3) return 0;
        
        // Simple pseudo calculation: count points and estimate
        // More points = larger area (very rough approximation)
        // Use rough perimeter calculation
        let perimeter = 0;
        for (let i = 0; i < points.length; i++) {
            const j = (i + 1) % points.length;
            const latDiff = Math.abs(points[j].latitude - points[i].latitude);
            const lngDiff = Math.abs(points[j].longitude - points[i].longitude);
            perimeter += Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
        }
        
        // Rough conversion: 1 degree ≈ 111 km, assume square-ish shape
        // Area in sq km, then convert to acres (1 sq km ≈ 247 acres)
        const areaInDegrees = perimeter * perimeter / 12; // rough estimate
        const areaInKm = areaInDegrees * 111 * 111;
        const acres = areaInKm * 247;
        
        return Math.max(0.1, Math.round(acres * 10) / 10); // minimum 0.1 acre
    };

    const handleDraw = (e: any) => {
        const { layer } = e;
        
        if (e.layerType === 'polygon' || layer instanceof L.Polygon) {
            const latlngs = layer.getLatLngs()[0];
            const points = latlngs.map((point: any) => ({
                latitude: point.lat,
                longitude: point.lng,
            }));

            setDrawnPoints(points);
            setError('');
            setFarmSize(calculateArea(points));
        }
    };

    const handleEdit = (e: any) => {
        const layers = e.layers;
        layers.eachLayer((layer: any) => {
            if (layer instanceof L.Polygon) {
                const latlngs = layer.getLatLngs()[0];
                const points = Array.isArray(latlngs) ? latlngs.map((point: any) => ({
                    latitude: point.lat,
                    longitude: point.lng,
                })) : [];

                setDrawnPoints(points);
                setError('');
                setFarmSize(calculateArea(points));
            }
        });
    };

    const handleClearDraw = () => {
        setDrawnPoints([]);
        setFarmSize(0);
        setError('');
    };

    const handleSubmit = () => {
        if (drawnPoints.length < 3) {
            setError('Please draw a farm boundary with at least 3 points');
            return;
        }
        
        if (farmSize <= 0) {
            setError('Farm size must be greater than 0 acres');
            return;
        }

        // Save farm boundary temporarily in context
        setTempFarmBoundary(drawnPoints, farmSize);
        onNext();
    };

    const defaultLat = farmer.location?.latitude || 12.978;
    const defaultLng = farmer.location?.longitude || 77.673;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-4 md:py-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Define Your Farm</h1>
                    <p className="text-sm md:text-base text-gray-600">
                        Draw your farm boundary on the map by clicking to place points. Click the polygon tool to create your farm area.
                    </p>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 py-4 md:py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                    {/* Map */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                            <div className="h-80 md:h-96 lg:h-[500px]">
                                <MapContainer
                                    center={[defaultLat, defaultLng]}
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
                                    <FeatureGroup>
                                        <EditControl
                                            position="topleft"
                                            onCreated={handleDraw}
                                            onEdited={handleEdit}
                                            onDeleted={handleClearDraw}
                                            draw={{
                                                rectangle: false,
                                                polyline: false,
                                                circle: false,
                                                marker: false,
                                                circlemarker: false,
                                            }}
                                        />
                                    </FeatureGroup>
                                </MapContainer>
                            </div>
                            <div className="bg-blue-50 border-t border-blue-200 p-3 md:p-4">
                                <p className="text-xs md:text-sm text-blue-700">
                                    <strong>Satellite View:</strong> Use the drawing tools to mark your actual farm boundaries visible in the satellite imagery. Zoom in for better accuracy.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Info Panel */}
                    <div>
                        {/* Farmer Info */}
                        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 mb-4 md:mb-6 border border-gray-200">
                            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">Your Details</h2>
                            <div className="space-y-2 md:space-y-3">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Name</p>
                                    <p className="text-sm md:text-base text-gray-900 font-medium">{farmer.fullName}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Location</p>
                                    <p className="text-sm md:text-base text-gray-900 font-medium">{farmer.location?.village}, {farmer.location?.district}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Coordinates</p>
                                    <p className="text-xs md:text-sm text-gray-700 font-mono">{defaultLat}, {defaultLng}</p>
                                </div>
                            </div>
                        </div>

                        {/* Farm Size Display */}
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl md:rounded-2xl border-2 border-green-300 p-4 md:p-6 mb-4 md:mb-6">
                            <div className="text-center">
                                <p className="text-xs md:text-sm text-green-700 font-semibold mb-2">FARM SIZE</p>
                                <p className="text-3xl md:text-4xl font-bold text-green-900 mb-1">
                                    {farmSize.toFixed(1)}
                                </p>
                                <p className="text-sm md:text-base text-green-700 font-medium">acres</p>
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl md:rounded-2xl p-3 md:p-4 mb-4 md:mb-6">
                            <h3 className="text-sm md:text-base font-bold text-yellow-900 mb-2">Steps:</h3>
                            <ol className="text-xs md:text-sm text-yellow-800 space-y-1 list-decimal list-inside">
                                <li>Click the drawing tool above</li>
                                <li>Click on map to place corner points</li>
                                <li>Double-click to complete polygon</li>
                                <li>Size will auto-calculate</li>
                                <li>Click Continue to proceed</li>
                            </ol>
                        </div>

                        {/* Buttons */}
                        <div className="space-y-3">
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-3 md:px-4 py-2 md:py-3 rounded-lg text-xs md:text-sm">
                                    {error}
                                </div>
                            )}

                            <button
                                onClick={handleClearDraw}
                                disabled={drawnPoints.length === 0}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 md:py-3 text-sm md:text-base bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                                Clear Drawing
                            </button>

                            <button
                                onClick={handleSubmit}
                                disabled={drawnPoints.length < 3 || farmSize <= 0}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 md:py-3 text-sm md:text-base bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Continue
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
