import { FilterState, Property } from '../types/property';

let mockProperties: Property[] = [
  { id: 'PROP-1001', title: 'Modern 4-Bedroom Duplex', description: 'A bright family home with premium finishes and generous outdoor space.', price: 185000000, type: 'house', status: 'for-sale', location: 'Lekki Phase 1', city: 'Lagos', country: 'Nigeria', bedrooms: 4, bathrooms: 5, garage: 2, area: 3200, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80', facilities: { pool: true, parking: true, gym: false, security: true, garden: true }, views: 1840, uploadedDate: '2024-11-20', isFavorite: false },
  { id: 'PROP-1002', title: 'Luxury Villa with Pool', description: 'Spacious villa in a quiet neighborhood with a private pool and landscaped garden.', price: 320000000, type: 'villa', status: 'for-sale', location: 'Ikoyi', city: 'Lagos', country: 'Nigeria', bedrooms: 5, bathrooms: 6, garage: 3, area: 5100, image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80', facilities: { pool: true, parking: true, gym: true, security: true, garden: true }, views: 2310, uploadedDate: '2024-11-17', isFavorite: true },
  { id: 'PROP-1003', title: 'Furnished 3-Bed Apartment', description: 'Move-in ready apartment with excellent natural light and modern amenities.', price: 8500000, type: 'apartment', status: 'for-rent', location: 'Wuse 2', city: 'Abuja', country: 'Nigeria', bedrooms: 3, bathrooms: 3, garage: 1, area: 1900, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80', facilities: { pool: false, parking: true, gym: true, security: true, garden: false }, views: 970, uploadedDate: '2024-11-14', isFavorite: false },
  { id: 'PROP-1004', title: 'Contemporary City Apartment', description: 'Elegant apartment close to business districts, restaurants, and everyday conveniences.', price: 125000000, type: 'apartment', status: 'sold', location: 'Victoria Island', city: 'Lagos', country: 'Nigeria', bedrooms: 3, bathrooms: 4, garage: 2, area: 2200, image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80', facilities: { pool: true, parking: true, gym: true, security: true, garden: false }, views: 1520, uploadedDate: '2024-11-09', isFavorite: false },
  { id: 'PROP-1005', title: 'Private Residential Land', description: 'Well-positioned residential land with clear access and excellent development potential.', price: 45000000, type: 'land', status: 'for-sale', location: 'Epe', city: 'Lagos', country: 'Nigeria', bedrooms: 0, bathrooms: 0, garage: 0, area: 7200, image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80', facilities: { pool: false, parking: false, gym: false, security: true, garden: true }, views: 680, uploadedDate: '2024-11-06', isFavorite: false },
  { id: 'PROP-1006', title: 'Family Home in GRA', description: 'Comfortable home with secure parking and a calm, established neighborhood setting.', price: 98000000, type: 'house', status: 'for-rent', location: 'GRA Phase 2', city: 'Port Harcourt', country: 'Nigeria', bedrooms: 4, bathrooms: 4, garage: 2, area: 2850, image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1000&q=80', facilities: { pool: false, parking: true, gym: false, security: true, garden: true }, views: 820, uploadedDate: '2024-11-03', isFavorite: false },
];

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
