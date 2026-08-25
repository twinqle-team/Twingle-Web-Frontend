import { Automotives, FilterState } from '../types/Automotives';

let mockAutomotives: Automotives[] = [];

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class AutoService {
  static async getAutomotives(filters?: FilterState, page?: number, itemsPerPage?: number): Promise<{ data: Automotives[]; total: number }> {
    await delay(500);
    
    let filtered = [...mockAutomotives];

    if (filters) {
      // Search filter
      if (filters.search) {
        const search = filters.search.toLowerCase();
        filtered = filtered.filter(
          p => p.title.toLowerCase().includes(search) ||
               p.description.toLowerCase().includes(search) ||
            //    p.location.toLowerCase().includes(search) ||
               p.city.toLowerCase().includes(search)
        );
      }

      // Auto type filter
      if (filters.autoType) {
        filtered = filtered.filter(p => p.type === filters.autoType);
      }

      // Status filter
      if (filters.status) {
        filtered = filtered.filter(p => p.status === filters.status);
      }

      // City filter
      if (filters.city) {
        filtered = filtered.filter(p => p.city === filters.city);
      }

      // Price range filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange;
        filtered = filtered.filter(p => p.price >= min && p.price <= max);
      }

      // Sort
      switch (filters.sortBy) {
        case 'newest':
          filtered.sort((a, b) => new Date(b.uploadedDate).getTime() - new Date(a.uploadedDate).getTime());
          break;
        case 'oldest':
          filtered.sort((a, b) => new Date(a.uploadedDate).getTime() - new Date(b.uploadedDate).getTime());
          break;
        case 'highest-price':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'lowest-price':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'most-viewed':
          filtered.sort((a, b) => b.views - a.views);
          break;
        default:
          break;
      }
    }

    // Pagination
    const total = filtered.length;
    const start = page && itemsPerPage ? (page - 1) * itemsPerPage : 0;
    const end = page && itemsPerPage ? start + itemsPerPage : filtered.length;

    return {
      data: filtered.slice(start, end),
      total,
    };
  }

  static async getAuto(id: string): Promise<Automotives | null> {
    await delay(300);
    return mockAutomotives.find(p => p.id === id) || null;
  }

  static async deleteAuto(id: string): Promise<boolean> {
    await delay(1000);
    // Simulate successful deletion
    const index = mockAutomotives.findIndex(p => p.id === id);
    if (index > -1) {
      mockAutomotives.splice(index, 1);
      return true;
    }
    return false;
  }

  static async updateAuto(id: string, updates: Partial<Automotives>): Promise<Automotives | null> {
    await delay(800);
    const auto = mockAutomotives.find(p => p.id === id);
    if (auto) {
      Object.assign(auto, updates);
      return auto;
    }
    return null;
  }

  static async toggleFavorite(id: string): Promise<Automotives | null> {
    await delay(300);
    const auto = mockAutomotives.find(p => p.id === id);
    if (auto) {
      auto.isFavorite = !auto.isFavorite;
      return auto;
    }
    return null;
  }

  static getCities(): string[] {
    return [...new Set(mockAutomotives.map(p => p.city))].sort() as string[];
  }

  static getAutoTypes(): string[] {
    return [...new Set(mockAutomotives.map(p => p.type))] as string[];
  }

  static getStatuses(): string[] {
    return [...new Set(mockAutomotives.map(p => p.status))] as string[];
  }

  static getStats() {
    return {
      total: mockAutomotives.length,
      forSale: mockAutomotives.filter(p => p.status === 'available').length,
      forRent: mockAutomotives.filter(p => p.status === 'reserved').length,
      sold: mockAutomotives.filter(p => p.status === 'sold').length,
    };
  }
}
