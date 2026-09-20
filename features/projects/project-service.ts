export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
}

export interface Project {
  id: string;
  name: string;
  developer: string;
  location: string;
  description: string;
  properties: Property[];
  amenities: string[];
  completionDate?: Date;
  status: 'planning' | 'under_construction' | 'completed' | 'sold_out';
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectFilters {
  page?: number;
  limit?: number;
  status?: Project['status'];
  developer?: string;
  location?: string;
}

export interface ProjectResult {
  data: Project[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

class ProjectService {
  async getAll(filters: ProjectFilters = {}): Promise<ProjectResult> {
    const { page = 1, limit = 20 } = filters;
    
    const mockProjects: Project[] = [
      {
        id: '1',
        name: 'Dubai Creek Harbour',
        developer: 'Emaar Properties',
        location: 'Dubai Creek',
        description: 'Waterfront community with stunning views',
        properties: [],
        amenities: ['Pool', 'Gym', 'Park', 'Retail'],
        status: 'under_construction',
        completionDate: new Date('2026-12-31'),
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2025-01-15'),
      },
      {
        id: '2',
        name: 'Palm Jumeirah Residences',
        developer: 'Nakheel',
        location: 'Palm Jumeirah',
        description: 'Luxury beachfront living',
        properties: [],
        amenities: ['Beach Access', 'Pool', 'Spa', 'Concierge'],
        status: 'completed',
        createdAt: new Date('2023-06-01'),
        updatedAt: new Date('2025-01-10'),
      },
    ];

    const total = mockProjects.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = mockProjects.slice(start, end);

    return { data, total, page, limit, totalPages };
  }

  async getById(id: string): Promise<Project | null> {
    const projects = await this.getAll();
    return projects.data.find(p => p.id === id) || null;
  }
}

export const projectService = new ProjectService();
