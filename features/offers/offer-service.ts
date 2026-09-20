export type OfferStatus = 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected' | 'withdrawn';

export interface Offer {
  id: string;
  propertyId: string;
  leadId: string;
  agentId: string;
  offerPrice: number;
  currency: string;
  status: OfferStatus;
  proposedClosingDate?: Date;
  contingencies?: string[];
  notes?: string;
  submittedAt?: Date;
  reviewedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface OfferFilters {
  page?: number;
  limit?: number;
  status?: OfferStatus;
  propertyId?: string;
  leadId?: string;
  agentId?: string;
}

export interface OfferResult {
  data: Offer[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

class OfferService {
  async getAll(filters: OfferFilters = {}): Promise<OfferResult> {
    const { page = 1, limit = 20 } = filters;
    
    const mockOffers: Offer[] = [
      {
        id: '1',
        propertyId: 'prop_1',
        leadId: '1',
        agentId: 'agent_1',
        offerPrice: 2500000,
        currency: 'AED',
        status: 'under_review',
        proposedClosingDate: new Date('2025-03-01'),
        contingencies: ['Financing', 'Inspection'],
        createdAt: new Date('2025-01-10'),
        updatedAt: new Date('2025-01-15'),
      },
      {
        id: '2',
        propertyId: 'prop_2',
        leadId: '2',
        agentId: 'agent_1',
        offerPrice: 5000000,
        currency: 'AED',
        status: 'accepted',
        proposedClosingDate: new Date('2025-02-15'),
        createdAt: new Date('2025-01-05'),
        updatedAt: new Date('2025-01-12'),
      },
    ];

    const total = mockOffers.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = mockOffers.slice(start, end);

    return { data, total, page, limit, totalPages };
  }

  async create(data: Partial<Offer>): Promise<Offer> {
    const offer: Offer = {
      id: Math.random().toString(36).substr(2, 9),
      propertyId: data.propertyId || '',
      leadId: data.leadId || '',
      agentId: data.agentId || '',
      offerPrice: data.offerPrice || 0,
      currency: data.currency || 'AED',
      status: 'draft',
      contingencies: data.contingencies || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return offer;
  }

  async submit(id: string): Promise<Offer | null> {
    return this.updateStatus(id, 'submitted', { submittedAt: new Date() });
  }

  async accept(id: string): Promise<Offer | null> {
    return this.updateStatus(id, 'accepted', { reviewedAt: new Date() });
  }

  async reject(id: string): Promise<Offer | null> {
    return this.updateStatus(id, 'rejected', { reviewedAt: new Date() });
  }

  async withdraw(id: string): Promise<Offer | null> {
    return this.updateStatus(id, 'withdrawn');
  }

  private async updateStatus(id: string, status: OfferStatus, updates: Partial<Offer> = {}): Promise<Offer | null> {
    return {
      id,
      propertyId: 'prop_1',
      leadId: '1',
      agentId: 'agent_1',
      offerPrice: 2500000,
      currency: 'AED',
      status,
      ...updates,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}

export const offerService = new OfferService();
