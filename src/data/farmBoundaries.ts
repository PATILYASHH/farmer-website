// Demo farm boundaries (10 farms, ~10 acres each, total ~100 acres)
// Coordinates are in [longitude, latitude] format
// Area roughly represents a village cluster with farms near a river

export interface FarmBoundary {
    id: string;
    farmerId: string;
    farmName: string;
    areaAcres: number;
    coordinates: [number, number][][]; // GeoJSON Polygon coordinates
}

// River coordinates (flows through the middle of farms)
export const riverCoordinates: [number, number][] = [
    [77.5800, 12.9720], // North
    [77.5820, 12.9705],
    [77.5835, 12.9690],
    [77.5850, 12.9675],
    [77.5870, 12.9660],
    [77.5885, 12.9645],
    [77.5900, 12.9630], // South
];

// 10 farms arranged around the river
export const farmBoundaries: FarmBoundary[] = [
    // WEST SIDE FARMS (5 farms)
    {
        id: 'farm-1',
        farmerId: 'farmer-1',
        farmName: 'Ramesh Farm',
        areaAcres: 10.5,
        coordinates: [[
            [77.5760, 12.9730],
            [77.5790, 12.9730],
            [77.5790, 12.9710],
            [77.5760, 12.9710],
            [77.5760, 12.9730],
        ]],
    },
    {
        id: 'farm-2',
        farmerId: 'farmer-2',
        farmName: 'Suresh Farm',
        areaAcres: 9.8,
        coordinates: [[
            [77.5760, 12.9710],
            [77.5790, 12.9710],
            [77.5790, 12.9690],
            [77.5760, 12.9690],
            [77.5760, 12.9710],
        ]],
    },
    {
        id: 'farm-3',
        farmerId: 'farmer-3',
        farmName: 'Lakshmi Farm',
        areaAcres: 11.2,
        coordinates: [[
            [77.5760, 12.9690],
            [77.5795, 12.9690],
            [77.5795, 12.9668],
            [77.5760, 12.9668],
            [77.5760, 12.9690],
        ]],
    },
    {
        id: 'farm-4',
        farmerId: 'farmer-4',
        farmName: 'Prakash Farm',
        areaAcres: 8.9,
        coordinates: [[
            [77.5765, 12.9668],
            [77.5795, 12.9668],
            [77.5795, 12.9650],
            [77.5765, 12.9650],
            [77.5765, 12.9668],
        ]],
    },
    {
        id: 'farm-5',
        farmerId: 'farmer-5',
        farmName: 'Anita Farm',
        areaAcres: 10.1,
        coordinates: [[
            [77.5770, 12.9650],
            [77.5800, 12.9650],
            [77.5800, 12.9630],
            [77.5770, 12.9630],
            [77.5770, 12.9650],
        ]],
    },

    // EAST SIDE FARMS (5 farms)
    {
        id: 'farm-6',
        farmerId: 'farmer-6',
        farmName: 'Ganesh Farm',
        areaAcres: 9.5,
        coordinates: [[
            [77.5840, 12.9725],
            [77.5870, 12.9725],
            [77.5870, 12.9705],
            [77.5840, 12.9705],
            [77.5840, 12.9725],
        ]],
    },
    {
        id: 'farm-7',
        farmerId: 'farmer-7',
        farmName: 'Vijay Farm',
        areaAcres: 10.8,
        coordinates: [[
            [77.5845, 12.9705],
            [77.5875, 12.9705],
            [77.5875, 12.9683],
            [77.5845, 12.9683],
            [77.5845, 12.9705],
        ]],
    },
    {
        id: 'farm-8',
        farmerId: 'farmer-8',
        farmName: 'Meena Farm',
        areaAcres: 9.3,
        coordinates: [[
            [77.5850, 12.9683],
            [77.5880, 12.9683],
            [77.5880, 12.9663],
            [77.5850, 12.9663],
            [77.5850, 12.9683],
        ]],
    },
    {
        id: 'farm-9',
        farmerId: 'farmer-9',
        farmName: 'Arun Farm',
        areaAcres: 10.7,
        coordinates: [[
            [77.5855, 12.9663],
            [77.5887, 12.9663],
            [77.5887, 12.9642],
            [77.5855, 12.9642],
            [77.5855, 12.9663],
        ]],
    },
    {
        id: 'farm-10',
        farmerId: 'farmer-10',
        farmName: 'Radha Farm',
        areaAcres: 9.2,
        coordinates: [[
            [77.5860, 12.9642],
            [77.5890, 12.9642],
            [77.5890, 12.9623],
            [77.5860, 12.9623],
            [77.5860, 12.9642],
        ]],
    },
];

// Center point for map initialization
export const mapCenter: [number, number] = [12.9680, 77.5825];
export const mapZoom = 14;
