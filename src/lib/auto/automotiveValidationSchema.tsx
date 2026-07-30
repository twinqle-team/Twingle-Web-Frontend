import { z } from 'zod';

export const automotiveFormSchema = z.object({
  // Vehicle Details
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must not exceed 100 characters'),

  brand: z
    .string()
    .min(1, 'Brand is required'),

  model: z
    .string()
    .min(1, 'Model is required')
    .max(50, 'Model must not exceed 50 characters'),

  year: z
    .number()
    .min(1900, 'Year must be 1900 or later')
    .max(new Date().getFullYear() + 1, `Year cannot exceed ${new Date().getFullYear() + 1}`),

  condition: z
    .enum(['new', 'used', 'certified-pre-owned'], {
      message: 'Please select a valid condition',
    }),

  bodyType: z
    .enum(['sedan', 'suv', 'hatchback', 'coupe', 'convertible', 'wagon', 'pickup', 'van', 'minivan', 'truck'], {
      message: 'Please select a valid body type',
    }),

  transmission: z
    .enum(['automatic', 'manual', 'cvt', 'semi-automatic'], {
      message: 'Please select a valid transmission type',
    }),

  fuelType: z
    .enum(['petrol', 'diesel', 'hybrid', 'electric', 'plug-in-hybrid', 'cng'], {
      message: 'Please select a valid fuel type',
    }),

  driveType: z
    .enum(['fwd', 'rwd', 'awd', '4wd'], {
      message: 'Please select a valid drive type',
    }),

  mileage: z
    .number()
    .min(0, 'Mileage cannot be negative')
    .max(10000000, 'Please enter a valid mileage'),

  mileageUnit: z
    .enum(['km', 'miles'], {
      message: 'Please select km or miles',
    }),

  engineCapacity: z
    .string()
    .min(1, 'Engine capacity is required')
    .max(50, 'Engine capacity must not exceed 50 characters'),

  exteriorColor: z
    .string()
    .min(2, 'Exterior color is required')
    .max(50, 'Exterior color must not exceed 50 characters'),

  interiorColor: z
    .string()
    .min(2, 'Interior color is required')
    .max(50, 'Interior color must not exceed 50 characters'),

  vin: z
    .string()
    .length(17, 'VIN must be exactly 17 characters')
    .toUpperCase(),

  price: z
    .number()
    .min(0, 'Price cannot be negative')
    .max(10000000, 'Please enter a valid price'),

  availabilityStatus: z
    .enum(['available', 'reserved', 'sold'], {
      message: 'Please select a valid availability status',
    }),

  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(2000, 'Description must not exceed 2000 characters'),

  // Location Details
  city: z
    .string()
    .min(2, 'City is required')
    .max(50, 'City must not exceed 50 characters'),

  state: z
    .string()
    .min(2, 'State/Province is required')
    .max(50, 'State/Province must not exceed 50 characters'),

  zipCode: z
    .string()
    .min(2, 'Zip/Postal code is required')
    .max(20, 'Zip/Postal code must not exceed 20 characters'),

  country: z
    .string()
    .min(2, 'Country is required'),

  fullAddress: z
    .string()
    .min(10, 'Full address is required')
    .max(500, 'Full address must not exceed 500 characters'),

  // Images
  images: z
    .array(z.object({
      id: z.string(),
      file: z.instanceof(File),
      preview: z.string(),
      progress: z.number(),
    }))
    .min(2, 'Minimum 2 images required')
    .max(10, 'Maximum 10 images allowed')
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
    .max(4, 'Maximum 4 videos allowed')
    .default([]),

  // Features
  features: z
    .array(z.string())
    .default([]),

  customFeatures: z
    .array(z.string().min(1, 'Feature name cannot be empty'))
    .default([]),
});

export type AutomotiveFormData = z.infer<typeof automotiveFormSchema>;

export const VEHICLE_BRANDS = [
  'Toyota',
  'Honda',
  'Mercedes-Benz',
  'BMW',
  'Lexus',
  'Ford',
  'Audi',
  'Nissan',
  'Hyundai',
  'Kia',
  'Chevrolet',
  'Volkswagen',
  'Peugeot',
  'Tesla',
  'Land Rover',
  'Porsche',
  'Ferrari',
  'Lamborghini',
  'Volvo',
  'Mazda',
  'Subaru',
  'Jeep',
  'Mitsubishi',
];

export const VEHICLE_FEATURES = [
  'Air Conditioning',
  'Leather Seats',
  'Heated Seats',
  'Ventilated Seats',
  'Sunroof',
  'Panoramic Roof',
  'Navigation System',
  'Bluetooth',
  'Apple CarPlay',
  'Android Auto',
  'Backup Camera',
  'Parking Sensors',
  '360° Camera',
  'Cruise Control',
  'Adaptive Cruise Control',
  'Lane Assist',
  'Blind Spot Monitoring',
  'ABS',
  'Airbags',
  'Push Start',
  'Keyless Entry',
  'Alloy Wheels',
  'Fog Lights',
  'LED Headlights',
  'Xenon Headlights',
  'Power Windows',
  'Power Steering',
  'Wireless Charging',
  'Premium Sound System',
  'Remote Start',
];

export const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
  'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia',
  'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada',
  'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia',
  'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador',
  'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia',
  'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti',
  'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel',
  'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos',
  'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi',
  'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova',
  'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands',
  'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau',
  'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania',
  'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal',
  'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea',
  'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan',
  'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
  'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela',
  'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe',
];
