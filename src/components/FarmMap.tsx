import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { farmBoundaries, riverCoordinates, mapCenter, mapZoom } from '../data/farmBoundaries';
import { damageData, floodedAreas } from '../data/damageData';

interface FarmMapProps {
    showDamage: boolean; // Toggle between good/damaged view
    onFarmClick?: (farmId: string) => void;
    selectedFarmId?: string;
}

export default function FarmMap({ showDamage, onFarmClick, selectedFarmId }: FarmMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
    const layerGroupRef = useRef<L.LayerGroup | null>(null);

    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current) return;

        // Initialize map
        const map = L.map(mapRef.current).setView(mapCenter, mapZoom);
        mapInstanceRef.current = map;

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19,
        }).addTo(map);

        return () => {
            map.remove();
            mapInstanceRef.current = null;
        };
    }, []);

    useEffect(() => {
        const map = mapInstanceRef.current;
        if (!map) return;

        // Clear existing layers
        if (layerGroupRef.current) {
            layerGroupRef.current.clearLayers();
        } else {
            layerGroupRef.current = L.layerGroup().addTo(map);
        }

        const layerGroup = layerGroupRef.current;

        // Draw river
        const riverPolyline = L.polyline(riverCoordinates as [number, number][], {
            color: showDamage ? '#ef4444' : '#3b82f6',
            weight: showDamage ? 8 : 4,
            opacity: showDamage ? 0.8 : 0.6,
        }).addTo(layerGroup);

        riverPolyline.bindPopup(
            showDamage
                ? '<b>⚠️ Flooded River</b><br/>River overflow causing flooding'
                : '<b>River</b><br/>Normal water level'
        );

        // Draw flooded areas if damage view
        if (showDamage) {
            floodedAreas.forEach((floodZone) => {
                L.polygon(floodZone.coordinates as [number, number][][], {
                    color: floodZone.color,
                    fillColor: floodZone.color,
                    fillOpacity: floodZone.opacity,
                    weight: 1,
                })
                    .addTo(layerGroup)
                    .bindPopup('<b>Flooded Area</b><br/>Water from river overflow');
            });
        }

        // Draw farm boundaries
        farmBoundaries.forEach((farm) => {
            const damage = damageData[farm.id];

            // Determine color based on damage
            let color = '#22c55e'; // Green - no damage
            let fillColor = '#22c55e';
            let fillOpacity = 0.2;

            if (showDamage && damage) {
                if (damage.floodSeverity === 'high') {
                    color = '#ef4444'; // Red
                    fillColor = '#ef4444';
                    fillOpacity = 0.5;
                } else if (damage.floodSeverity === 'medium') {
                    color = '#f59e0b'; // Orange
                    fillColor = '#f59e0b';
                    fillOpacity = 0.4;
                } else if (damage.floodSeverity === 'low') {
                    color = '#eab308'; // Yellow
                    fillColor = '#eab308';
                    fillOpacity = 0.3;
                }
            }

            // Highlight if selected
            if (farm.id === selectedFarmId) {
                fillOpacity = 0.7;
                color = '#8b5cf6'; // Purple
            }

            const polygon = L.polygon(farm.coordinates as [number, number][][], {
                color,
                fillColor,
                fillOpacity,
                weight: farm.id === selectedFarmId ? 3 : 2,
            }).addTo(layerGroup);

            // Create popup content
            const popupContent = `
        <div class="p-2">
          <h3 class="font-bold text-lg">${farm.farmName}</h3>
          <p class="text-sm">Area: ${farm.areaAcres} acres</p>
          ${showDamage && damage
                    ? `
                <hr class="my-2"/>
                <p class="text-sm font-semibold ${damage.floodSeverity === 'high'
                        ? 'text-red-600'
                        : damage.floodSeverity === 'medium'
                            ? 'text-orange-600'
                            : 'text-yellow-600'
                    }">
                  Damage: ${damage.damagePercentage}%
                </p>
                <p class="text-xs text-gray-600">
                  Affected: ${damage.affectedAcres} acres<br/>
                  Severity: ${damage.floodSeverity.toUpperCase()}
                </p>
                <p class="text-xs mt-1">${damage.description}</p>
              `
                    : '<p class="text-xs text-green-600 mt-1">✓ Farm is healthy</p>'
                }
        </div>
      `;

            polygon.bindPopup(popupContent);

            // Click handler
            if (onFarmClick) {
                polygon.on('click', () => {
                    onFarmClick(farm.id);
                });
            }
        });
    }, [showDamage, selectedFarmId, onFarmClick]);

    return (
        <div className="relative w-full h-full">
            <div ref={mapRef} className="w-full h-full rounded-lg shadow-lg" />

            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg text-sm z-[1000]">
                <h4 className="font-bold mb-2">Legend</h4>
                {showDamage ? (
                    <>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-4 h-4 bg-red-500 opacity-50 rounded"></div>
                            <span>High Damage</span>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-4 h-4 bg-orange-500 opacity-40 rounded"></div>
                            <span>Medium Damage</span>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-4 h-4 bg-yellow-500 opacity-30 rounded"></div>
                            <span>Low Damage</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-500 opacity-20 rounded"></div>
                            <span>No Damage</span>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 opacity-20 rounded"></div>
                        <span>Healthy Farms</span>
                    </div>
                )}
            </div>
        </div>
    );
}
