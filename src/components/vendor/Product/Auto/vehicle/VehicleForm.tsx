import { useState } from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Save, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { automotiveFormSchema, AutomotiveFormData, VEHICLE_BRANDS, COUNTRIES } from '@/lib/auto/automotiveValidationSchema';
import SectionCard from '@/components/vendor/reuse/SectionCard';
import TextInput from '@/components/vendor/reuse/TextInput';
import SelectInput from '@/components/vendor/reuse/SelectInput';
import NumberInput from '@/components/vendor/reuse/NumberInput';
import Textarea from '@/components/vendor/reuse/Textarea';
import ImageUploader from '@/components/vendor/reuse/ImageUploader';
import VideoUploader from '@/components/vendor/reuse/VideoUploader';
import AutomotiveFeatureSelector from './AutomotiveFeatureSelector';

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  progress: number;
}

interface UploadedVideo {
  id: string;
  file: File;
  preview: string;
  progress: number;
  duration: number;
  fileName: string;
}

export default function vehicleForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [uploadedVideos, setUploadedVideos] = useState<UploadedVideo[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<AutomotiveFormData>({
    resolver: zodResolver(automotiveFormSchema) as any,
    mode: 'onBlur',
    defaultValues: {
      features: [],
      customFeatures: [],
      images: [],
      videos: [],
      mileageUnit: 'km',
      condition: 'used',
      bodyType: 'sedan',
      transmission: 'automatic',
      fuelType: 'petrol',
      driveType: 'fwd',
      availabilityStatus: 'available',
    },
  });

  const selectedFeatures = watch('features');
  const customFeatures = watch('customFeatures');
  const description = watch('description');

  const onSubmit = async (data: AutomotiveFormData) => {
    try {
      if (uploadedImages.length < 2) {
        toast.error('Please upload at least 2 images');
        return;
      }

      setIsSubmitting(true);

      console.log('Vehicle data:', data);
      console.log('Images:', uploadedImages);
      console.log('Videos:', uploadedVideos);

      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.success('Vehicle listing created successfully!');
      reset();
      setUploadedImages([]);
      setUploadedVideos([]);

      setTimeout(() => {
        window.location.href = '/automotive';
      }, 1500);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to create vehicle listing');
    } finally {
      setIsSubmitting(false);
    }
  };


  
  const handleSaveDraft = async () => {
    try {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Vehicle draft saved successfully!');
    } catch (error) {
      toast.error('Failed to save draft');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 pb-32"
    >
      {/* Header */}
      <div className="top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Add New Vehicle</h1>
          <p className="text-gray-600 mt-1">Fill in the vehicle information below to publish your automotive listing.</p>
        </div>
      </div>

      {/* Main Content */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* Vehicle Details */}
          <SectionCard title="Vehicle Details">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TextInput
                label="Vehicle Title"
                placeholder="Enter vehicle title"
                // react-hook-form errors are FieldError objects; pass the object instead of message string
                error={errors.title}
                {...register('title')}
              />

              <SelectInput
                label="Brand"
                placeholder="Select brand"
                options={VEHICLE_BRANDS.map(brand => ({ label: brand, value: brand }))}
                error={errors.brand}
                onChange={(value:any) => setValue('brand', value)}
              />

              <TextInput
                label="Model"
                placeholder="Enter model name"
                error={errors.model}
                {...register('model')}
              />

              <NumberInput
                label="Year"
                placeholder="Enter year"
                error={errors.year}
                onChange={(value: number) => setValue('year', value)}
              />

              <SelectInput
                label="Condition"
                placeholder="Select condition"
                options={[
                  { label: 'New', value: 'new' },
                  { label: 'Used', value: 'used' },
                  { label: 'Certified Pre-Owned', value: 'certified-pre-owned' },
                ]}
                error={errors.condition}
                onChange={(value:any) => setValue('condition', value as any)}
              />

              <SelectInput
                label="Body Type"
                placeholder="Select body type"
                options={[
                  { label: 'Sedan', value: 'sedan' },
                  { label: 'SUV', value: 'suv' },
                  { label: 'Hatchback', value: 'hatchback' },
                  { label: 'Coupe', value: 'coupe' },
                  { label: 'Convertible', value: 'convertible' },
                  { label: 'Wagon', value: 'wagon' },
                  { label: 'Pickup', value: 'pickup' },
                  { label: 'Van', value: 'van' },
                  { label: 'Minivan', value: 'minivan' },
                  { label: 'Truck', value: 'truck' },
                ]}
                error={errors.bodyType}
                onChange={(value:any) => setValue('bodyType', value as any)}
              />

              <SelectInput
                label="Transmission"
                placeholder="Select transmission"
                options={[
                  { label: 'Automatic', value: 'automatic' },
                  { label: 'Manual', value: 'manual' },
                  { label: 'CVT', value: 'cvt' },
                  { label: 'Semi-Automatic', value: 'semi-automatic' },
                ]}
                error={errors.transmission}
                onChange={(value:any) => setValue('transmission', value as any)}
              />

              <SelectInput
                label="Fuel Type"
                placeholder="Select fuel type"
                options={[
                  { label: 'Petrol', value: 'petrol' },
                  { label: 'Diesel', value: 'diesel' },
                  { label: 'Hybrid', value: 'hybrid' },
                  { label: 'Electric', value: 'electric' },
                  { label: 'Plug-in Hybrid', value: 'plug-in-hybrid' },
                  { label: 'CNG', value: 'cng' },
                ]}
                error={errors.fuelType}
                onChange={(value:any) => setValue('fuelType', value as any)}
              />

              <SelectInput
                label="Drive Type"
                placeholder="Select drive type"
                options={[
                  { label: 'FWD', value: 'fwd' },
                  { label: 'RWD', value: 'rwd' },
                  { label: 'AWD', value: 'awd' },
                  { label: '4WD', value: '4wd' },
                ]}
                error={errors.driveType}
                onChange={(value:any) => setValue('driveType', value as any)}
              />

              <div className="flex gap-3">
                <div className="flex-1">
                  <NumberInput
                    label="Mileage"
                    placeholder="Enter mileage"
                    error={errors.mileage}
                    onChange={(value: number) => setValue('mileage', value)}
                  />
                </div>
                <div className="w-32">
                  <SelectInput
                    label="Unit"
                    options={[
                      { label: 'km', value: 'km' },
                      { label: 'miles', value: 'miles' },
                    ]}
                    onChange={(value:any) => setValue('mileageUnit', value as any)}
                  />
                </div>
              </div>

              <TextInput
                label="Engine Capacity"
                placeholder="e.g., 2.0L Turbo"
                error={errors.engineCapacity}
                {...register('engineCapacity')}
              />

              <TextInput
                label="Exterior Color"
                placeholder="e.g., Midnight Black"
                error={errors.exteriorColor}
                {...register('exteriorColor')}
              />

              <TextInput
                label="Interior Color"
                placeholder="e.g., Tan Leather"
                error={errors.interiorColor}
                {...register('interiorColor')}
              />

              <TextInput
                label="VIN (Vehicle Identification Number)"
                placeholder="17-character VIN"
                error={errors.vin}
                {...register('vin')}
              />

              <NumberInput
                label="Price ($)"
                placeholder="Enter price"
                error={errors.price}
                onChange={(value: number) => setValue('price', value)}
              />

              <SelectInput
                label="Availability Status"
                placeholder="Select status"
                options={[
                  { label: 'Available', value: 'available' },
                  { label: 'Reserved', value: 'reserved' },
                  { label: 'Sold', value: 'sold' },
                ]}
                error={errors.availabilityStatus}
                onChange={(value:any) => setValue('availabilityStatus', value as any)}
              />

              <div className="lg:col-span-2">
                <Textarea
                  label="Vehicle Description"
                  placeholder="Describe the vehicle condition, features, history, and any other important details"
                  className="min-h-40"
                  maxLength={2000}
                  error={errors.description}
                  value={description}
                  onChange={(value: string) => setValue('description', value)}
                />
              </div>
            </div>
          </SectionCard>

          {/* Location Details */}
          <SectionCard title="Dealer / Vehicle Location" description="Where is this vehicle located">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TextInput
                label="City"
                placeholder="Enter city"
                error={errors.city}
                {...register('city')}
              />

              <TextInput
                label="State / Province"
                placeholder="Enter state"
                error={errors.state}
                {...register('state')}
              />

              <TextInput
                label="Zip / Postal Code"
                placeholder="Enter zip code"
                error={errors.zipCode}
                {...register('zipCode')}
              />

                <SelectInput
                label="Country"
                placeholder="Select country"
                options={COUNTRIES.map(country => ({ label: country, value: country }))}
                error={errors.country}
                onChange={(value:any) => setValue('country', value)}
                searchable
              />

              <div className="lg:col-span-2">
                <Textarea
                  label="Full Address"
                  placeholder="Enter complete address"
                  className="min-h-28"
                  error={errors.fullAddress}
                  value={watch('fullAddress')}
                  onChange={(value: string) => setValue('fullAddress', value)}
                />
              </div>
            </div>
          </SectionCard>

          {/* Vehicle Media */}
          <SectionCard title="Vehicle Media" description="Upload images and videos of the vehicle">
            <div className="space-y-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Upload Images</h4>
                <ImageUploader
                  onImagesChange={setUploadedImages}
                  minImages={2}
                  maxImages={10}
                  error={uploadedImages.length === 0 ? 'Please upload at least 2 images' : undefined}
                />
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Upload Videos</h4>
                <VideoUploader
                  onVideosChange={setUploadedVideos}
                  minVideos={0}
                  maxVideos={4}
                  minDuration={60}
                  maxDuration={180}
                  error={uploadedVideos.length === 0 ? undefined : undefined}
                />
              </div>
            </div>
          </SectionCard>

          {/* Vehicle Features */}
          <SectionCard title="Vehicle Features" description="Select features available in this vehicle">
            <AutomotiveFeatureSelector
              selectedFeatures={selectedFeatures}
              customFeatures={customFeatures}
              onFeaturesChange={(features:any) => setValue('features', features)}
              onCustomFeaturesChange={(features:any) => setValue('customFeatures', features)}
            />
          </SectionCard>
        </div>
      </form>

      {/* Sticky Action Bar */}
      <div className=" bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            

            <button
              onClick={handleSaveDraft}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={20} />
              Save as Draft
            </button>

            <motion.button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
              {isSubmitting ? 'Adding Vehicle...' : 'Add Vehicle'}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
