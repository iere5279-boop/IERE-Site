export interface Property {
  id: string;
  title: string;
  description: string | null;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  propertyType: 'apartment' | 'villa' | 'townhouse' | 'penthouse' | 'commercial';
  status: 'available' | 'sold' | 'reserved' | 'off_market';
  images: string[];
  amenities: string[];
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  developer: string;
  location: string;
  description: string;
  totalUnits: number;
  availableUnits: number;
  completionDate: string;
  amenities: string[];
  startingPrice: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  source: 'website' | 'referral' | 'social' | 'walk_in' | 'call';
  status: 'new' | 'contacted' | 'qualified' | 'viewing_scheduled' | 'offer_made' | 'closed' | 'lost';
  assignedTo: string | null;
  notes: string | null;
  propertyInterestId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Viewing {
  id: string;
  leadId: string;
  propertyId: string;
  scheduledDate: string;
  scheduledTime: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Offer {
  id: string;
  leadId: string;
  propertyId: string;
  offerAmount: number;
  status: 'pending' | 'accepted' | 'rejected' | 'countered' | 'withdrawn';
  terms: string | null;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}
