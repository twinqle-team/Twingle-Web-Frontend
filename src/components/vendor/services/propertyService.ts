import { FilterState, Property } from '../types/property';

let mockProperties: Property[] = [];

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class PropertyService {
  static async getProperties(filters?: FilterState, page?: number, itemsPerPage?: number): Promise<{ data: Property[]; total: number }> {
    await delay(500);
    
    let filtered = [...mockProperties];

    if (filters) {
      // Search filter
      if (filters.search) {
        const search = filters.search.toLowerCase();
        filtered = filtered.filter(
          p => p.title.toLowerCase().includes(search) ||
               p.description.toLowerCase().includes(search) ||
               p.location.toLowerCase().includes(search) ||
               p.city.toLowerCase().includes(search)
        );
      }

      // Property type filter
      if (filters.propertyType) {
        filtered = filtered.filter(p => p.type === filters.propertyType);
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

  static async getProperty(id: string): Promise<Property | null> {
    await delay(300);
    return mockProperties.find(p => p.id === id) || null;
  }

  static async deleteProperty(id: string): Promise<boolean> {
    await delay(1000);
    // Simulate successful deletion
    const index = mockProperties.findIndex(p => p.id === id);
    if (index > -1) {
      mockProperties.splice(index, 1);
      return true;
    }
    return false;
  }

  static async updateProperty(id: string, updates: Partial<Property>): Promise<Property | null> {
    await delay(800);
    const property = mockProperties.find(p => p.id === id);
    if (property) {
      Object.assign(property, updates);
      return property;
    }
    return null;
  }

  static async toggleFavorite(id: string): Promise<Property | null> {
    await delay(300);
    const property = mockProperties.find(p => p.id === id);
    if (property) {
      property.isFavorite = !property.isFavorite;
      return property;
    }
    return null;
  }

  static getCities(): string[] {
    return [...new Set(mockProperties.map(p => p.city))].sort() as string[];
  }

  static getPropertyTypes(): string[] {
    return [...new Set(mockProperties.map(p => p.type))] as string[];
  }

  static getStatuses(): string[] {
    return [...new Set(mockProperties.map(p => p.status))] as string[];
  }

  static getStats() {
    return {
      total: mockProperties.length,
      forSale: mockProperties.filter(p => p.status === 'for-sale').length,
      forRent: mockProperties.filter(p => p.status === 'for-rent').length,
      sold: mockProperties.filter(p => p.status === 'sold').length,
    };
  }
}
