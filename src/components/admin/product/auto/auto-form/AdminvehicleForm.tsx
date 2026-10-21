import { useEffect, useState } from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Save, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { AdminautomotiveFormSchema, AutomotiveFormData, COUNTRIES, VEHICLE_BRANDS } from '@/lib/auto/AdminautomotiveFormSchema';
import AdminAutomotiveFeatureSelector from './AdminAutomotiveFeatureSelector';
import AdminSectionCard from '@/components/admin/Reuse/AdminSectionCard';
import AdminTextInput from '@/components/admin/Reuse/AdminTextInput';
import AdminNumberInput from '@/components/admin/Reuse/AdminNumberInput';
import AdminSelectInput from '@/components/admin/Reuse/AdminSelectInput';
import AdminTextarea from '@/components/admin/Reuse/AdminTextarea';
import AdminImageUploader from '@/components/admin/Reuse/AdminImageUploader';
import AdminVideoUploader from '@/components/admin/Reuse/AdminVideoUploader';

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

const VEHICLE_DRAFT_KEY = 'twingle:vehicle-draft';

type VehicleDraft = Partial<AutomotiveFormData> & {
  savedAt: string;
  imagePreviews: string[];
  videoPreviews: string[];
};

export default function AdminvehicleForm() {
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
    resolver: zodResolver(AdminautomotiveFormSchema) as any,
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

  const [draftSavedAt, setDraftSavedAt] = useState<string | null>(null);


  console.log(draftSavedAt)
  useEffect(() => {
    const savedDraft = localStorage.getItem(VEHICLE_DRAFT_KEY);
    if (!savedDraft) return;

    try {
      const draft = JSON.parse(savedDraft) as VehicleDraft;
      reset(draft);
      setDraftSavedAt(draft.savedAt);
    } catch {
      localStorage.removeItem(VEHICLE_DRAFT_KEY);
    }
  }, [reset]);

  const selectedFeatures = watch('features') || [];
  const customFeatures = watch('customFeatures') || [];
  const description = watch('description');

  const handleImagesChange = (images: UploadedImage[]) => {
    setUploadedImages(images);
    setValue('images', images as AutomotiveFormData['images'], { shouldValidate: true, shouldDirty: true });
  };

  const handleVideosChange = (videos: UploadedVideo[]) => {
    setUploadedVideos(videos);
    setValue('videos', videos as AutomotiveFormData['videos'], { shouldValidate: true, shouldDirty: true });
  };

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
      localStorage.removeItem(VEHICLE_DRAFT_KEY);
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
      const formValues = watch();
      const draft: VehicleDraft = {
        ...formValues,
        images: [],
        videos: [],
        savedAt: new Date().toISOString(),
        imagePreviews: uploadedImages.map((image) => image.preview),
        videoPreviews: uploadedVideos.map((video) => video.preview),
      };

      localStorage.setItem(VEHICLE_DRAFT_KEY, JSON.stringify(draft));
      setDraftSavedAt(draft.savedAt);
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
      className="min-h-screen bg-[#f7faf8] pb-28 text-[#012E19] sm:pb-32"
    >
      {/* Header */}
      <div className=" top-0 z-30 border-b border-[#dce8e0] bg-white/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
          <h1 className="text-2xl font-bold text-[#012E19] sm:text-3xl">Add New Vehicle</h1>
          <p className="mt-1 max-w-2xl text-sm text-[#60756a] sm:text-base">Fill in the vehicle information below to publish your automotive listing.</p>
          {/* {draftSavedAt && <p className="mt-2 text-xs font-medium text-[#a57900]">Draft saved {new Date(draftSavedAt).toLocaleString()}</p>} */}
        </div>
      </div>

      {/* Main Content */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mx-auto max-w-7xl space-y-5 px-4 py-6 sm:space-y-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          {/* Vehicle Details */}
          <AdminSectionCard title="Vehicle Details">
            <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2">
              <AdminTextInput
                label="Vehicle Title"
                placeholder="Enter vehicle title"
                // react-hook-form errors are FieldError objects; pass the object instead of message string
                error={errors.title}
                {...register('title')}
              />

              <AdminSelectInput
                label="Brand"
                placeholder="Select brand"
                options={VEHICLE_BRANDS.map(brand => ({ label: brand, value: brand }))}
                error={errors.brand}
                  value={watch('brand')}
                  onChange={(event:any) => setValue('brand', event.target.value, { shouldValidate: true, shouldDirty: true })}
              />

              <AdminTextInput
                label="Model"
                placeholder="Enter model name"
                error={errors.model}
                {...register('model')}
              />

              <AdminNumberInput
                label="Year"
                placeholder="Enter year"
                error={errors.year}
                value={watch('year')}
                onChange={(value: number) => setValue('year', value, { shouldValidate: true, shouldDirty: true })}
              />

              <AdminSelectInput
                label="Condition"
                placeholder="Select condition"
                options={[
                  { label: 'New', value: 'new' },
                  { label: 'Used', value: 'used' },
                  { label: 'Certified Pre-Owned', value: 'certified-pre-owned' },
                ]}
                error={errors.condition}
                value={watch('condition')}
                onChange={(event:any) => setValue('condition', event.target.value as any, { shouldValidate: true, shouldDirty: true })}
              />

              <AdminSelectInput
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
                value={watch('bodyType')}
                onChange={(event:any) => setValue('bodyType', event.target.value as any, { shouldValidate: true, shouldDirty: true })}
              />

              <AdminSelectInput
                label="Transmission"
                placeholder="Select transmission"
                options={[
                  { label: 'Automatic', value: 'automatic' },
                  { label: 'Manual', value: 'manual' },
                  { label: 'CVT', value: 'cvt' },
                  { label: 'Semi-Automatic', value: 'semi-automatic' },
                ]}
                error={errors.transmission}
                value={watch('transmission')}
                onChange={(event:any) => setValue('transmission', event.target.value as any, { shouldValidate: true, shouldDirty: true })}
              />

              <AdminSelectInput
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
                value={watch('fuelType')}
                onChange={(event:any) => setValue('fuelType', event.target.value as any, { shouldValidate: true, shouldDirty: true })}
              />

              <AdminSelectInput
                label="Drive Type"
                placeholder="Select drive type"
                options={[
                  { label: 'FWD', value: 'fwd' },
                  { label: 'RWD', value: 'rwd' },
                  { label: 'AWD', value: 'awd' },
                  { label: '4WD', value: '4wd' },
                ]}
                error={errors.driveType}
                value={watch('driveType')}
                onChange={(event:any) => setValue('driveType', event.target.value as any, { shouldValidate: true, shouldDirty: true })}
              />

              <div className="flex flex-col gap-3 min-[420px]:flex-row">
                <div className="flex-1">
                  <AdminNumberInput
                    label="Mileage"
                    placeholder="Enter mileage"
                    error={errors.mileage}
                    value={watch('mileage')}
                    onChange={(value: number) => setValue('mileage', value, { shouldValidate: true, shouldDirty: true })}
                  />
                </div>
                <div className="w-full min-[420px]:w-32">
                  <AdminSelectInput
                    label="Unit"
                    options={[
                      { label: 'km', value: 'km' },
                      { label: 'miles', value: 'miles' },
                    ]}
                    value={watch('mileageUnit')}
                    onChange={(event:any) => setValue('mileageUnit', event.target.value as any, { shouldValidate: true, shouldDirty: true })}
                  />
                </div>
              </div>

              <AdminTextInput
                label="Engine Capacity"
                placeholder="e.g., 2.0L Turbo"
                error={errors.engineCapacity}
                {...register('engineCapacity')}
              />

              <AdminTextInput
                label="Exterior Color"
                placeholder="e.g., Midnight Black"
                error={errors.exteriorColor}
                {...register('exteriorColor')}
              />

              <AdminTextInput
                label="Interior Color"
                placeholder="e.g., Tan Leather"
                error={errors.interiorColor}
                {...register('interiorColor')}
              />

              <AdminTextInput
                label="VIN (Vehicle Identification Number)"
                placeholder="17-character VIN"
                error={errors.vin}
                {...register('vin')}
              />

              <AdminNumberInput
                label="Price ($)"
                placeholder="Enter price"
                error={errors.price}
                value={watch('price')}
                onChange={(value: number) => setValue('price', value, { shouldValidate: true, shouldDirty: true })}
              />

              <AdminSelectInput
                label="Availability Status"
                placeholder="Select status"
                options={[
                  { label: 'Available', value: 'available' },
                  { label: 'Reserved', value: 'reserved' },
                  { label: 'Sold', value: 'sold' },
                ]}
                error={errors.availabilityStatus}
                value={watch('availabilityStatus')}
                onChange={(event:any) => setValue('availabilityStatus', event.target.value as any, { shouldValidate: true, shouldDirty: true })}
              />

              <div className="lg:col-span-2">
                <AdminTextarea
                  label="Vehicle Description"
                  placeholder="Describe the vehicle condition, features, history, and any other important details"
                  className="min-h-40"
                  maxLength={2000}
                  error={errors.description}
                  value={description}
                  onChange={(value: string) => setValue('description', value, { shouldValidate: true, shouldDirty: true })}
                />
              </div>
            </div>
          </AdminSectionCard>

          {/* Location Details */}
          <AdminSectionCard title="Dealer / Vehicle Location" description="Where is this vehicle located">
            <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2">
              <AdminTextInput
                label="City"
                placeholder="Enter city"
                error={errors.city}
                {...register('city')}
              />

              <AdminTextInput
                label="State / Province"
                placeholder="Enter state"
                error={errors.state}
                {...register('state')}
              />

              <AdminTextInput
                label="Zip / Postal Code"
                placeholder="Enter zip code"
                error={errors.zipCode}
                {...register('zipCode')}
              />

                <AdminSelectInput
                label="Country"
                placeholder="Select country"
                options={COUNTRIES.map(country => ({ label: country, value: country }))}
                error={errors.country}
                value={watch('country')}
                onChange={(event:any) => setValue('country', event.target.value, { shouldValidate: true, shouldDirty: true })}
                searchable
              />

              <div className="lg:col-span-2">
                <AdminTextarea
                  label="Full Address"
                  placeholder="Enter complete address"
                  className="min-h-28"
                  error={errors.fullAddress}
                  value={watch('fullAddress')}
                  onChange={(value: string) => setValue('fullAddress', value, { shouldValidate: true, shouldDirty: true })}
                />
              </div>
            </div>
          </AdminSectionCard>

          {/* Vehicle Media */}
          <AdminSectionCard title="Vehicle Media" description="Upload images and videos of the vehicle">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h4 className="mb-4 font-semibold text-[#012E19]">Upload Images</h4>
                <AdminImageUploader
                  onImagesChange={handleImagesChange}
                  minImages={2}
                  maxImages={10}
                  error={uploadedImages.length === 0 ? 'Please upload at least 2 images' : undefined}
                />
              </div>

              <div className="border-t border-[#dce8e0] pt-6">
                <h4 className="mb-4 font-semibold text-[#012E19]">Upload Videos</h4>
                <AdminVideoUploader
                  onVideosChange={handleVideosChange}
                  minVideos={0}
                  maxVideos={4}
                  minDuration={60}
                  maxDuration={180}
                  error={uploadedVideos.length === 0 ? undefined : undefined}
                />
              </div>
            </div>
          </AdminSectionCard>

          {/* Vehicle Features */}
          <AdminSectionCard title="Vehicle Features" description="Select features available in this vehicle">
            <AdminAutomotiveFeatureSelector
              selectedFeatures={selectedFeatures}
              customFeatures={customFeatures}
              onFeaturesChange={(features:any) => setValue('features', features, { shouldValidate: true, shouldDirty: true })}
              onCustomFeaturesChange={(features:any) => setValue('customFeatures', features, { shouldValidate: true, shouldDirty: true })}
            />
          </AdminSectionCard>
        </div>
      </form>

      {/* Sticky Action Bar */}
      <div className="sticky bottom-0 z-30 border-t border-[#dce8e0] bg-white/95 shadow-2xl backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          <div className="flex flex-col-reverse gap-3 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between sm:gap-4">
            

            <button
              onClick={handleSaveDraft}
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#eef4f0] px-6 py-3 font-medium text-[#012E19] transition-colors hover:bg-[#e1ece5] disabled:cursor-not-allowed disabled:opacity-50 min-[420px]:w-auto"
            >
              <Save size={20} />
              Save as Draft
            </button>

            <motion.button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#012E19] px-8 py-3 font-semibold text-white transition-all hover:bg-[#074b2d] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 min-[420px]:w-auto"
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
