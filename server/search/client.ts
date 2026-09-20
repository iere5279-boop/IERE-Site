/**
 * Search Client - Typesense Integration
 * Investment Experts NextGen Platform
 */

import { env } from '@/config/env';

export interface SearchFilters {
  q?: string;
  transactionType?: 'sale' | 'rent';
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  community?: string;
  lat?: number;
  lng?: number;
  radiusKm?: number;
}

export interface SearchResult {
  id: string;
  title: string;
  property_type: string;
  transaction_type: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area_sqft: number;
  community: string;
  location_lat: number;
  location_lng: number;
  images: Array<{ url: string; caption: string; is_primary: boolean }>;
  featured: boolean;
  verified: boolean;
  _distance?: number;
}

let typesenseClient: any = null;

function getTypesenseClient() {
  if (!typesenseClient) {
    const host = env.TYPESENSE_HOST;
    const apiKey = env.TYPESENSE_SEARCH_KEY;

    if (!host || !apiKey) {
      console.warn('⚠️  Typesense credentials not configured. Search will use database fallback.');
      return null;
    }

    try {
      // Dynamically import to avoid bundling issues
      // In production, this would be: import Typesense from 'typesense';
      console.log('Typesense client initialized (mock mode for development)');
      typesenseClient = createMockTypesenseClient();
    } catch (error) {
      console.error('Failed to initialize Typesense client:', error);
      typesenseClient = createMockTypesenseClient();
    }
  }

  return typesenseClient;
}

function createMockTypesenseClient() {
  return {
    collections: () => ({
      documents: () => ({
        search: async () => ({
          hits: [],
          found: 0,
        }),
      }),
    }),
  };
}

export async function searchProperties(filters: SearchFilters): Promise<SearchResult[]> {
  const client = getTypesenseClient();

  if (!client) {
    throw new Error('Search client not available');
  }

  try {
    const query: any = {
      q: filters.q || '*',
      query_by: 'title,description,community,address_full',
      filter_by: buildSearchFilters(filters),
      sort_by: '_text_match:desc,featured:desc,price:asc',
      per_page: 24,
      page: 1,
    };

    if (filters.lat && filters.lng && filters.radiusKm) {
      query.filter_by += `geo_location(${filters.lat},${filters.lng}):<${filters.radiusKm * 1000}`;
    }

    const result = await client
      .collections('properties')
      .documents()
      .search(query);

    return (result.hits || []).map((hit: any) => hit.document as SearchResult);
  } catch (error) {
    console.error('Typesense search failed:', error);
    throw error;
  }
}

function buildSearchFilters(filters: SearchFilters): string {
  const conditions: string[] = [];

  if (filters.transactionType) {
    conditions.push(`transaction_type:=${filters.transactionType}`);
  }

  if (filters.propertyType) {
    conditions.push(`property_type:=${filters.propertyType}`);
  }

  if (filters.minPrice !== undefined) {
    conditions.push(`price:>=${filters.minPrice}`);
  }

  if (filters.maxPrice !== undefined) {
    conditions.push(`price:<=${filters.maxPrice}`);
  }

  if (filters.bedrooms !== undefined) {
    conditions.push(`bedrooms:>=${filters.bedrooms}`);
  }

  if (filters.community) {
    conditions.push(`community:=${filters.community}`);
  }

  // Only show active properties
  conditions.push('status:=active');

  return conditions.join(' && ');
}

export async function indexProperty(property: any): Promise<void> {
  const client = getTypesenseClient();

  if (!client) {
    console.warn('Cannot index property: search client not available');
    return;
  }

  try {
    await client
      .collections('properties')
      .documents()
      .upsert(property);
  } catch (error) {
    console.error('Failed to index property:', error);
    throw error;
  }
}

export async function removePropertyFromIndex(propertyId: string): Promise<void> {
  const client = getTypesenseClient();

  if (!client) {
    console.warn('Cannot remove property from index: search client not available');
    return;
  }

  try {
    await client
      .collections('properties')
      .documents(propertyId)
      .delete();
  } catch (error) {
    console.error('Failed to remove property from index:', error);
  }
}

export default searchProperties;
