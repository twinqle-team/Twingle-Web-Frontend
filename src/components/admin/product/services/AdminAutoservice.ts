import { AdminAutomotives, AdminFilterState } from "../types/AdminAutomotives";


const mockFacilities = {} as AdminAutomotives['facilities'];

let mockAutomotives: AdminAutomotives[] = [
  { id: 'AUTO-1001', title: 'Toyota Camry XSE', description: 'Well-maintained executive sedan with a refined interior and excellent service history.', price: 38500000, brand: 'toyota', status: 'available', type: 'sedan', transmission: 'automatic', fueltype: 'petrol', drivetype: 'fwd', mileage: 24500, unit: 'km', enginecapacity: '2.5L', exteriorcolor: 'Pearl White', interiorcolor: 'Black', vin: 1001001, model: 'Camry XSE', year: 2022, condition: 'used', state: 'Lagos', city: 'Lekki', zipcode: '101233', country: 'Nigeria', fulladdress: 'Lekki Phase 1, Lagos', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=900&q=80', video: '', facilities: mockFacilities, views: 1248, uploadedDate: '2024-11-20', isFavorite: false },
  { id: 'AUTO-1002', title: 'Mercedes-Benz GLE 450', description: 'Premium SUV offering comfort, power, and advanced safety technology for every journey.', price: 68000000, brand: 'mercedes-benz', status: 'reserved', type: 'suv', transmission: 'automatic', fueltype: 'hybrid', drivetype: 'awd', mileage: 18300, unit: 'km', enginecapacity: '3.0L', exteriorcolor: 'Obsidian Black', interiorcolor: 'Tan', vin: 1001002, model: 'GLE 450', year: 2023, condition: 'certified pre-owned', state: 'Abuja', city: 'Maitama', zipcode: '900271', country: 'Nigeria', fulladdress: 'Maitama, Abuja', image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=80', video: '', facilities: mockFacilities, views: 982, uploadedDate: '2024-11-18', isFavorite: true },
  { id: 'AUTO-1003', title: 'Range Rover Sport HSE', description: 'Luxury performance SUV with a commanding presence and premium cabin.', price: 92000000, brand: 'land-rover', status: 'available', type: 'suv', transmission: 'automatic', fueltype: 'petrol', drivetype: 'awd', mileage: 31000, unit: 'km', enginecapacity: '3.0L', exteriorcolor: 'Satin Grey', interiorcolor: 'Cream', vin: 1001003, model: 'Sport HSE', year: 2021, condition: 'used', state: 'Lagos', city: 'Ikoyi', zipcode: '106104', country: 'Nigeria', fulladdress: 'Ikoyi, Lagos', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80', video: '', facilities: mockFacilities, views: 1764, uploadedDate: '2024-11-16', isFavorite: false },
  { id: 'AUTO-1004', title: 'BMW 3 Series M Sport', description: 'Sporty sedan with responsive handling, modern technology, and a comfortable ride.', price: 42500000, brand: 'bmw', status: 'sold', type: 'sedan', transmission: 'automatic', fueltype: 'petrol', drivetype: 'rwd', mileage: 27800, unit: 'km', enginecapacity: '2.0L', exteriorcolor: 'Alpine Blue', interiorcolor: 'Black', vin: 1001004, model: '330i M Sport', year: 2022, condition: 'used', state: 'Rivers', city: 'Port Harcourt', zipcode: '500001', country: 'Nigeria', fulladdress: 'GRA, Port Harcourt', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80', video: '', facilities: mockFacilities, views: 743, uploadedDate: '2024-11-12', isFavorite: false },
  { id: 'AUTO-1005', title: 'Ford Ranger Wildtrak', description: 'Capable pickup built for work, travel, and demanding terrain.', price: 51000000, brand: 'ford', status: 'available', type: 'pickup', transmission: 'automatic', fueltype: 'diesel', drivetype: '4wd', mileage: 15600, unit: 'km', enginecapacity: '2.0L', exteriorcolor: 'Orange', interiorcolor: 'Black', vin: 1001005, model: 'Ranger Wildtrak', year: 2023, condition: 'used', state: 'Oyo', city: 'Ibadan', zipcode: '200001', country: 'Nigeria', fulladdress: 'Bodija, Ibadan', image: 'https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=900&q=80', video: '', facilities: mockFacilities, views: 629, uploadedDate: '2024-11-10', isFavorite: false },
  { id: 'AUTO-1006', title: 'Tesla Model 3 Long Range', description: 'Quiet, efficient electric sedan with a long-range battery and minimalist cabin.', price: 56000000, brand: 'tesla', status: 'available', type: 'sedan', transmission: 'automatic', fueltype: 'electric', drivetype: 'awd', mileage: 9200, unit: 'km', enginecapacity: 'Dual Motor', exteriorcolor: 'Red', interiorcolor: 'White', vin: 1001006, model: 'Model 3', year: 2023, condition: 'certified pre-owned', state: 'Lagos', city: 'Victoria Island', zipcode: '101241', country: 'Nigeria', fulladdress: 'Victoria Island, Lagos', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=900&q=80', video: '', facilities: mockFacilities, views: 1406, uploadedDate: '2024-11-08', isFavorite: true },
];

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class AdminAutoService {
  static async getAutomotives(filters?: AdminFilterState, page?: number, itemsPerPage?: number): Promise<{ data: AdminAutomotives[]; total: number }> {
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

  static async getAuto(id: string): Promise<AdminAutomotives | null> {
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

  static async updateAuto(id: string, updates: Partial<AdminAutomotives>): Promise<AdminAutomotives | null> {
    await delay(800);
    const auto = mockAutomotives.find(p => p.id === id);
    if (auto) {
      Object.assign(auto, updates);
      return auto;
    }
    return null;
  }

  static async toggleFavorite(id: string): Promise<AdminAutomotives | null> {
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
