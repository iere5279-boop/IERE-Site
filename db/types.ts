export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: 'admin' | 'agent' | 'user';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name?: string | null;
          role?: 'admin' | 'agent' | 'user';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          role?: 'admin' | 'agent' | 'user';
          created_at?: string;
          updated_at?: string;
        };
      };
      properties: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          price: number;
          location: string;
          bedrooms: number;
          bathrooms: number;
          area_sqft: number;
          property_type: 'apartment' | 'villa' | 'townhouse' | 'penthouse' | 'commercial';
          status: 'available' | 'sold' | 'reserved' | 'off_market';
          developer_id: string | null;
          images: string[];
          amenities: string[];
          latitude: number | null;
          longitude: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          price: number;
          location: string;
          bedrooms: number;
          bathrooms: number;
          area_sqft: number;
          property_type: 'apartment' | 'villa' | 'townhouse' | 'penthouse' | 'commercial';
          status?: 'available' | 'sold' | 'reserved' | 'off_market';
          developer_id?: string | null;
          images?: string[];
          amenities?: string[];
          latitude?: number | null;
          longitude?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          price?: number;
          location?: string;
          bedrooms?: number;
          bathrooms?: number;
          area_sqft?: number;
          property_type?: 'apartment' | 'villa' | 'townhouse' | 'penthouse' | 'commercial';
          status?: 'available' | 'sold' | 'reserved' | 'off_market';
          developer_id?: string | null;
          images?: string[];
          amenities?: string[];
          latitude?: number | null;
          longitude?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      leads: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          source: 'website' | 'referral' | 'social' | 'walk_in' | 'call';
          status: 'new' | 'contacted' | 'qualified' | 'viewing_scheduled' | 'offer_made' | 'closed' | 'lost';
          assigned_to: string | null;
          notes: string | null;
          property_interest_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          source?: 'website' | 'referral' | 'social' | 'walk_in' | 'call';
          status?: 'new' | 'contacted' | 'qualified' | 'viewing_scheduled' | 'offer_made' | 'closed' | 'lost';
          assigned_to?: string | null;
          notes?: string | null;
          property_interest_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          source?: 'website' | 'referral' | 'social' | 'walk_in' | 'call';
          status?: 'new' | 'contacted' | 'qualified' | 'viewing_scheduled' | 'offer_made' | 'closed' | 'lost';
          assigned_to?: string | null;
          notes?: string | null;
          property_interest_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
  };
}
