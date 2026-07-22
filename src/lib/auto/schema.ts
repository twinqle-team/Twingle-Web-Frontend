import { z } from "zod";

const currentYear = new Date().getFullYear();

export const vehicleSchema = z.object({
  title: z.string().trim().min(1, "Vehicle title is required").max(120, "Max 120 characters"),
  brand: z.string().min(1, "Brand is required"),
  model: z.string().trim().min(1, "Model is required").max(80, "Max 80 characters"),
  year: z.coerce
    .number({ message: "Enter a valid year" })
    .int("Year must be a whole number")
    .min(1900, "Year must be 1900 or later")
    .max(currentYear + 1, `Year cannot exceed ${currentYear + 1}`),
  condition: z.string().min(1, "Condition is required"),
  bodyType: z.string().min(1, "Body type is required"),
  transmission: z.string().min(1, "Transmission is required"),
  fuelType: z.string().min(1, "Fuel type is required"),
  driveType: z.string().min(1, "Drive type is required"),
  mileage: z.coerce
    .number({ message: "Enter a valid mileage" })
    .min(0, "Mileage cannot be negative")
    .max(2_000_000, "Mileage looks too high"),
  mileageUnit: z.enum(["km", "miles"]),
  engineCapacity: z.string().trim().min(1, "Engine capacity is required").max(40, "Max 40 characters"),
  exteriorColor: z.string().trim().min(1, "Exterior color is required").max(40, "Max 40 characters"),
  interiorColor: z.string().trim().min(1, "Interior color is required").max(40, "Max 40 characters"),
  vin: z
    .string()
    .trim()
    .min(1, "VIN is required")
    .regex(/^[A-HJ-NPR-Z0-9]{17}$/i, "VIN must be 17 characters (no I, O or Q)"),
  price: z.coerce
    .number({ message: "Enter a valid price" })
    .positive("Price must be greater than zero")
    .max(100_000_000, "Price looks too high"),
  availability: z.string().min(1, "Availability status is required"),
  description: z
    .string()
    .trim()
    .min(30, "Description must be at least 30 characters")
    .max(2000, "Max 2000 characters"),
  city: z.string().trim().min(1, "City is required").max(80, "Max 80 characters"),
  state: z.string().trim().min(1, "State / province is required").max(80, "Max 80 characters"),
  zip: z.string().trim().min(1, "Zip / postal code is required").max(20, "Max 20 characters"),
  country: z.string().min(1, "Country is required"),
  address: z.string().trim().min(1, "Full address is required").max(400, "Max 400 characters"),
  features: z.array(z.string()).default([]),
});

export type VehicleFormValues = z.input<typeof vehicleSchema>;
export type VehicleFormOutput = z.output<typeof vehicleSchema>;

export const vehicleDefaults: VehicleFormValues = {
  title: "",
  brand: "",
  model: "",
  year: "" as unknown as number,
  condition: "",
  bodyType: "",
  transmission: "",
  fuelType: "",
  driveType: "",
  mileage: "" as unknown as number,
  mileageUnit: "km",
  engineCapacity: "",
  exteriorColor: "",
  interiorColor: "",
  vin: "",
  price: "" as unknown as number,
  availability: "",
  description: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  address: "",
  features: [],
};

export interface UploadedImage {
  id: string;
  file: File;
  previewUrl: string;
  progress: number; // 0–100
  status: "uploading" | "done" | "error";
}

export interface UploadedVideo {
  id: string;
  file: File;
  previewUrl: string;
  duration: number; // seconds
  progress: number;
  status: "uploading" | "done" | "error";
}

export const IMAGE_MIN = 2;
export const IMAGE_MAX = 10;
export const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const VIDEO_TYPES = ["video/mp4", "video/quicktime", "video/webm"];
export const VIDEO_MIN_DURATION = 60; // 1 minute
export const VIDEO_MAX_DURATION = 180; // 3 minutes
export const VIDEO_MAX_SIZE = 100 * 1024 * 1024; // 100MB