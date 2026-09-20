export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
export type LeadSource = 'website' | 'referral' | 'property_portal' | 'social_media' | 'walk_in' | 'call' | 'email' | 'other';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  source: LeadSource;
  interest?: string;
  budget?: number;
  notes?: LeadNote[];
  assignedTo?: string;
  propertyId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LeadNote {
  id: string;
  content: string;
  createdBy: string;
  createdAt: Date;
}

export interface LeadActivity {
  id: string;
  leadId: string;
  type: 'call' | 'email' | 'meeting' | 'viewing' | 'offer' | 'note';
  description: string;
  createdAt: Date;
  createdBy: string;
}
