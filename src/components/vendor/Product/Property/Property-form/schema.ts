import { z } from 'zod';

export const propertyFormSchema = z.object({
  // Property Details
  title: z
    .string()
    .min(5, 'Property title must be at least 5 characters')
    .max(100, 'Property title must be less than 100 characters'),
  
  type: z.enum(['apartment', 'house', 'villa', 'land'], {
    message: 'Please select a property type',
  }),
  
  price: z
    .number()
    .positive('Price must be greater than 0')
    .max(999999999, 'Price is too high'),
  
  area: z
    .number()
    .positive('Area must be greater than 0')
    .max(999999, 'Area is too large'),
  
  status: z.enum(['for-rent', 'for-sale', 'sold'], {
    message: 'Please select a property status',
  }),
  
  bedrooms: z
    .number()
    .int()
    .min(0, 'Bedrooms cannot be negative')
    .max(20, 'Maximum 20 bedrooms'),
  
  bathrooms: z
    .number()
    .int()
    .min(0, 'Bathrooms cannot be negative')
    .max(20, 'Maximum 20 bathrooms'),
  
  garage: z
    .number()
    .int()
    .min(0, 'Garage spaces cannot be negative')
    .max(10, 'Maximum 10 garage spaces'),
  
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(2000, 'Description must be less than 2000 characters'),

  // Location Details
  city: z
    .string()
    .min(2, 'City name is required')
    .max(50, 'City name is too long'),
  
  state: z
    .string()
    .min(2, 'State is required')
    .max(50, 'State name is too long'),
  
  zipCode: z
    .string()
    .min(3, 'Zip code is required')
    .max(20, 'Zip code is too long'),
  
  country: z
    .string()
    .min(2, 'Country is required')
    .max(50, 'Country name is too long'),
  
  address: z
    .string()
    .min(10, 'Full address must be at least 10 characters')
    .max(500, 'Address is too long'),

  // Facilities
  facilities: z.object({
    pool: z.boolean().default(false),
    gym: z.boolean().default(false),
    fireplace: z.boolean().default(false),
    garage: z.boolean().default(false),
    balcony: z.boolean().default(false),
    garden: z.boolean().default(false),
    swimmingPool: z.boolean().default(false),
    sauna: z.boolean().default(false),
    spa: z.boolean().default(false),
    terrace: z.boolean().default(false),
    view: z.boolean().default(false),
    elevator: z.boolean().default(false),
    security: z.boolean().default(false),
    parking: z.boolean().default(false),
    playground: z.boolean().default(false),
    storage: z.boolean().default(false),
    airConditioning: z.boolean().default(false),
  }).default(() => ({
       pool: false,
    gym: false,
    fireplace: false,
    garage: false,
    balcony: false,
    garden: false,
    swimmingPool: false,
    sauna: false,
    spa: false,
    terrace: false,
    view: false,
    elevator: false,
    security: false,
    parking: false,
    playground: false,
    storage: false,
    airConditioning: false,
  })),

  // Custom facilities
  customFacilities: z
    .array(z.string().min(1, 'Facility name cannot be empty'))
    .default([]),

  // Videos
  videos: z
    .array(z.object({
      id: z.string(),
      file: z.instanceof(File),
      preview: z.string(),
      progress: z.number(),
      duration: z.number(),
      fileName: z.string(),
    }))
    .min(2, 'Minimum 2 videos required')
    .max(4, 'Maximum 4 videos allowed')
    .default([]),
});

export type PropertyFormData = z.infer<typeof propertyFormSchema>;

export const PROPERTY_TYPES = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'house', label: 'House' },
  { value: 'villa', label: 'Villa' },
  { value: 'land', label: 'Land' },
];

export const PROPERTY_STATUS = [
  { value: 'for-rent', label: 'For Rent' },
  { value: 'for-sale', label: 'For Sale' },
  { value: 'sold', label: 'Sold' },
];

export const COUNTRIES = [
  'United States',
  'Canada',
  'Mexico',
  'United Kingdom',
  'France',
  'Germany',
  'Italy',
  'Spain',
  'Netherlands',
  'Belgium',
  'Switzerland',
  'Austria',
  'Sweden',
  'Norway',
  'Denmark',
  'Finland',
  'Poland',
  'Czech Republic',
  'Japan',
  'South Korea',
  'China',
  'India',
  'Australia',
  'New Zealand',
  'Brazil',
  'Argentina',
  'South Africa',
  'UAE',
  'Singapore',
];

export const FACILITIES = [
  { id: 'pool', label: 'Pool' },
  { id: 'gym', label: 'Gym' },
  { id: 'fireplace', label: 'Fireplace' },
  { id: 'garage', label: 'Garage' },
  { id: 'balcony', label: 'Balcony' },
  { id: 'garden', label: 'Garden' },
  { id: 'swimmingPool', label: 'Swimming Pool' },
  { id: 'sauna', label: 'Sauna' },
  { id: 'spa', label: 'Spa' },
  { id: 'terrace', label: 'Terrace' },
  { id: 'view', label: 'View' },
  { id: 'elevator', label: 'Elevator' },
  { id: 'security', label: '24/7 Security' },
  { id: 'parking', label: 'Parking' },
  { id: 'playground', label: 'Playground' },
  { id: 'storage', label: 'Storage' },
  { id: 'airConditioning', label: 'Air Conditioning' },
];
