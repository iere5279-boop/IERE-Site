import { Lead, LeadStatus } from '@/domain/lead';

export interface LeadFilters {
  page?: number;
  limit?: number;
  status?: LeadStatus;
  source?: string;
  assignedTo?: string;
}

export interface LeadResult {
  data: Lead[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

class LeadService {
  async getAll(filters: LeadFilters = {}): Promise<LeadResult> {
    const { page = 1, limit = 20, status, source, assignedTo } = filters;
    
    // Mock data for development without database
    const mockLeads: Lead[] = [
      {
        id: '1',
        name: 'Ahmed Al Mansoori',
        email: 'ahmed@example.com',
        phone: '+971 50 123 4567',
        status: 'new',
        source: 'website',
        interest: 'Dubai Marina Apartment',
        budget: 2000000,
        createdAt: new Date('2025-01-15'),
        updatedAt: new Date('2025-01-15'),
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '+971 55 987 6543',
        status: 'contacted',
        source: 'referral',
        interest: 'Palm Jumeirah Villa',
        budget: 15000000,
        createdAt: new Date('2025-01-14'),
        updatedAt: new Date('2025-01-14'),
      },
      {
        id: '3',
        name: 'Mohammed Hassan',
        email: 'mohammed@example.com',
        phone: '+971 52 456 7890',
        status: 'qualified',
        source: 'property_portal',
        interest: 'Downtown Dubai Penthouse',
        budget: 8000000,
        createdAt: new Date('2025-01-13'),
        updatedAt: new Date('2025-01-13'),
      },
    ];

    let filtered = mockLeads;
    
    if (status) {
      filtered = filtered.filter(lead => lead.status === status);
    }
    
    if (source) {
      filtered = filtered.filter(lead => lead.source === source);
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = filtered.slice(start, end);

    return { data, total, page, limit, totalPages };
  }

  async getById(id: string): Promise<Lead | null> {
    // Mock implementation
    const mockLeads: Record<string, Lead> = {
      '1': {
        id: '1',
        name: 'Ahmed Al Mansoori',
        email: 'ahmed@example.com',
        phone: '+971 50 123 4567',
        status: 'new',
        source: 'website',
        interest: 'Dubai Marina Apartment',
        budget: 2000000,
        createdAt: new Date('2025-01-15'),
        updatedAt: new Date('2025-01-15'),
      },
    };
    
    return mockLeads[id] || null;
  }

  async create(data: Partial<Lead>): Promise<Lead> {
    const lead: Lead = {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      status: data.status || 'new',
      source: data.source || 'website',
      interest: data.interest || '',
      budget: data.budget || 0,
      notes: data.notes || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    return lead;
  }

  async update(id: string, data: Partial<Lead>): Promise<Lead | null> {
    const existing = await this.getById(id);
    if (!existing) return null;

    const updated: Lead = {
      ...existing,
      ...data,
      updatedAt: new Date(),
    };

    return updated;
  }

  async delete(id: string): Promise<boolean> {
    // Mock implementation
    return true;
  }

  async assign(id: string, userId: string): Promise<Lead | null> {
    return this.update(id, { assignedTo: userId });
  }

  async changeStatus(id: string, status: LeadStatus): Promise<Lead | null> {
    return this.update(id, { status });
  }
}

export const leadService = new LeadService();
