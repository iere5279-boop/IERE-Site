import { supabase } from '@/server/db/client';
import type { Property } from '@/domain/property';

export interface PropertyFilters {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  propertyType?: string;
  bedrooms?: number;
  location?: string;
}

const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Luxury Penthouse in Downtown Dubai',
    description: 'Stunning penthouse with panoramic views of Burj Khalifa',
    price: 5500000,
    location: 'Downtown Dubai',
    bedrooms: 4,
    bathrooms: 5,
    areaSqft: 4200,
    propertyType: 'penthouse',
    status: 'available',
    images: ['/images/property1.jpg'],
    amenities: ['Pool', 'Gym', 'Concierge', 'Parking'],
    latitude: 25.1972,
    longitude: 55.2744,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Modern Villa in Emirates Hills',
    description: 'Exclusive villa in prestigious Emirates Hills community',
    price: 12000000,
    location: 'Emirates Hills',
    bedrooms: 6,
    bathrooms: 7,
    areaSqft: 8500,
    propertyType: 'villa',
    status: 'available',
    images: ['/images/property2.jpg'],
    amenities: ['Private Pool', 'Garden', 'Maid Room', 'Smart Home'],
    latitude: 25.0657,
    longitude: 55.1713,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function getProperties(filters?: PropertyFilters): Promise<Property[]> {
  if (!supabase) {
    console.log('Using mock data for getProperties');
    return MOCK_PROPERTIES;
  }

  try {
    let query = supabase.from('properties').select('*');
    
    if (filters?.minPrice) {
      query = query.gte('price', filters.minPrice);
    }
    if (filters?.maxPrice) {
      query = query.lte('price', filters.maxPrice);
    }
    if (filters?.propertyType) {
      query = query.eq('property_type', filters.propertyType);
    }
    if (filters?.bedrooms) {
      query = query.gte('bedrooms', filters.bedrooms);
    }
    if (filters?.location) {
      query = query.ilike('location', `%${filters.location}%`);
    }

    const { data, error } = await query;
    
    if (error) throw error;
    
    return (data || []).map(mapToProperty);
  } catch (error) {
    console.error('Error fetching properties:', error);
    return MOCK_PROPERTIES;
  }
}

export async function getPropertyById(id: string): Promise<Property | null> {
  if (!supabase) {
    return MOCK_PROPERTIES.find(p => p.id === id) || null;
  }

  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return data ? mapToProperty(data) : null;
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
}

function mapToProperty(row: any): Property {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    price: row.price,
    location: row.location,
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    areaSqft: row.area_sqft,
    propertyType: row.property_type,
    status: row.status,
    images: row.images || [],
    amenities: row.amenities || [],
    latitude: row.latitude,
    longitude: row.longitude,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
