import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo_key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Farmer {
    id: string;
    aadhar_number: string;
    password_hash: string;
    name: string;
    phone: string;
    village: string;
    created_at: string;
}

export interface Farm {
    id: string;
    farmer_id: string;
    farm_name: string;
    area_acres: number;
    boundary_coordinates: any; // GeoJSON
    location_description: string;
    created_at: string;
}

export interface DamageReport {
    id: string;
    farm_id: string;
    report_date: string;
    damage_percentage: number;
    affected_area_acres: number;
    flood_severity: 'none' | 'low' | 'medium' | 'high';
    satellite_image_url: string;
    ai_analysis: any;
    created_at: string;
}

export interface InsuranceClaim {
    id: string;
    farmer_id: string;
    farm_id: string;
    damage_report_id: string;
    claim_amount: number;
    status: 'eligible' | 'ineligible' | 'approved' | 'paid';
    created_at: string;
}
