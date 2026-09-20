export type ViewingStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';

export interface Viewing {
  id: string;
  propertyId: string;
  leadId: string;
  agentId: string;
  scheduledAt: Date;
  duration: number; // minutes
  status: ViewingStatus;
  notes?: string;
  feedback?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ViewingFilters {
  page?: number;
  limit?: number;
  status?: ViewingStatus;
  propertyId?: string;
  leadId?: string;
  agentId?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface ViewingResult {
  data: Viewing[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

class ViewingService {
  async getAll(filters: ViewingFilters = {}): Promise<ViewingResult> {
    const { page = 1, limit = 20 } = filters;
    
    const mockViewings: Viewing[] = [
      {
        id: '1',
        propertyId: 'prop_1',
        leadId: '1',
        agentId: 'agent_1',
        scheduledAt: new Date('2025-01-20T10:00:00'),
        duration: 60,
        status: 'scheduled',
        createdAt: new Date('2025-01-15'),
        updatedAt: new Date('2025-01-15'),
      },
      {
        id: '2',
        propertyId: 'prop_2',
        leadId: '2',
        agentId: 'agent_1',
        scheduledAt: new Date('2025-01-18T14:00:00'),
        duration: 45,
        status: 'confirmed',
        createdAt: new Date('2025-01-14'),
        updatedAt: new Date('2025-01-15'),
      },
    ];

    const total = mockViewings.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = mockViewings.slice(start, end);

    return { data, total, page, limit, totalPages };
  }

  async schedule(data: Partial<Viewing>): Promise<Viewing> {
    const viewing: Viewing = {
      id: Math.random().toString(36).substr(2, 9),
      propertyId: data.propertyId || '',
      leadId: data.leadId || '',
      agentId: data.agentId || '',
      scheduledAt: data.scheduledAt || new Date(),
      duration: data.duration || 60,
      status: 'scheduled',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return viewing;
  }

  async confirm(id: string): Promise<Viewing | null> {
    return this.updateStatus(id, 'confirmed');
  }

  async complete(id: string, feedback?: string): Promise<Viewing | null> {
    const viewing = await this.updateStatus(id, 'completed');
    if (viewing && feedback) {
      viewing.feedback = feedback;
    }
    return viewing;
  }

  async cancel(id: string): Promise<Viewing | null> {
    return this.updateStatus(id, 'cancelled');
  }

  private async updateStatus(id: string, status: ViewingStatus): Promise<Viewing | null> {
    // Mock implementation
    return {
      id,
      propertyId: 'prop_1',
      leadId: '1',
      agentId: 'agent_1',
      scheduledAt: new Date(),
      duration: 60,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}

export const viewingService = new ViewingService();
