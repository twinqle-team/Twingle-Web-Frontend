export interface AdminProperty {
  id: string;
  title: string;
  description: string;
  price: number;
  type: 'apartment' | 'house' | 'villa' | 'land';
  status: 'for-sale' | 'for-rent' | 'sold';
  location: string;
  city: string;
  country: string;
  bedrooms: number;
  bathrooms: number;
  garage: number;
  area: number; // in sq ft
  image: string;
  video?: string;
  facilities: {
    pool: boolean;
    parking: boolean;
    gym: boolean;
    security: boolean;
    garden: boolean;
  };
  views: number;
  uploadedDate: string;
  isFavorite?: boolean;
}

export interface AdminFilterState {
  search: string;
  propertyType: string | null;
  status: string | null;
  city: string | null;
  priceRange: [number, number] | null;
  sortBy: string;
}

export interface AdminPaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}
