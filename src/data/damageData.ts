// Flood damage data - shows which farms are affected and severity
// Farms closer to the river have more damage

import { farmBoundaries } from './farmBoundaries';

export interface DamageInfo {
    farmId: string;
    damagePercentage: number;
    affectedAcres: number;
    floodSeverity: 'none' | 'low' | 'medium' | 'high';
    description: string;
}

export const damageData: Record<string, DamageInfo> = {
    // WEST SIDE - Heavily affected (near river)
    'farm-1': {
        farmId: 'farm-1',
        damagePercentage: 5,
        affectedAcres: 0.5,
        floodSeverity: 'low',
        description: 'Minor flooding in low-lying areas. Most crops unaffected.',
    },
    'farm-2': {
        farmId: 'farm-2',
        damagePercentage: 45,
        affectedAcres: 4.4,
        floodSeverity: 'medium',
        description: 'Significant flooding from river overflow. Nearly half the farmland waterlogged.',
    },
    'farm-3': {
        farmId: 'farm-3',
        damagePercentage: 75,
        affectedAcres: 8.4,
        floodSeverity: 'high',
        description: 'Severe flooding. Most of the farm is underwater. Immediate assistance required.',
    },
    'farm-4': {
        farmId: 'farm-4',
        damagePercentage: 60,
        affectedAcres: 5.3,
        floodSeverity: 'high',
        description: 'Heavy flooding affecting majority of crops. Soil erosion observed.',
    },
    'farm-5': {
        farmId: 'farm-5',
        damagePercentage: 30,
        affectedAcres: 3.0,
        floodSeverity: 'medium',
        description: 'Moderate flooding in areas adjacent to river. Partial crop loss expected.',
    },

    // EAST SIDE - Moderately affected
    'farm-6': {
        farmId: 'farm-6',
        damagePercentage: 2,
        affectedAcres: 0.2,
        floodSeverity: 'none',
        description: 'Minimal damage. Farm is on higher ground. Crops are safe.',
    },
    'farm-7': {
        farmId: 'farm-7',
        damagePercentage: 35,
        affectedAcres: 3.8,
        floodSeverity: 'medium',
        description: 'Moderate flooding in eastern section. About one-third of crops affected.',
    },
    'farm-8': {
        farmId: 'farm-8',
        damagePercentage: 50,
        affectedAcres: 4.7,
        floodSeverity: 'high',
        description: 'Half the farm flooded. Significant crop damage. River breach nearby.',
    },
    'farm-9': {
        farmId: 'farm-9',
        damagePercentage: 25,
        affectedAcres: 2.7,
        floodSeverity: 'low',
        description: 'Light to moderate flooding. Most crops salvageable with proper drainage.',
    },
    'farm-10': {
        farmId: 'farm-10',
        damagePercentage: 8,
        affectedAcres: 0.7,
        floodSeverity: 'low',
        description: 'Minor waterlogging in lower section. Minimal crop impact.',
    },
};

// Flooded areas (polygons showing extent of flooding)
export const floodedAreas = [
    // Main flood zone along the river
    {
        coordinates: [[
            [77.5795, 12.9720],
            [77.5840, 12.9715],
            [77.5860, 12.9690],
            [77.5875, 12.9670],
            [77.5890, 12.9650],
            [77.5895, 12.9635],
            [77.5885, 12.9635],
            [77.5870, 12.9650],
            [77.5850, 12.9665],
            [77.5830, 12.9680],
            [77.5810, 12.9695],
            [77.5800, 12.9705],
            [77.5795, 12.9720],
        ]],
        color: '#3b82f6',
        opacity: 0.4,
    },
];

// Calculate total statistics
export const damageStatistics = {
    totalFarms: 10,
    totalAcres: farmBoundaries.reduce((sum, farm) => sum + farm.areaAcres, 0),
    damagedFarms: Object.values(damageData).filter(d => d.damagePercentage > 10).length,
    totalAffectedAcres: Object.values(damageData).reduce((sum, d) => sum + d.affectedAcres, 0),
    severelyAffected: Object.values(damageData).filter(d => d.floodSeverity === 'high').length,
    eligibleForInsurance: Object.values(damageData).filter(d => d.damagePercentage > 10).length,
};
