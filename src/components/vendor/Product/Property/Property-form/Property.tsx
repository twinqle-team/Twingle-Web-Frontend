'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
// import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { ChevronLeft, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
// import Link from 'next/link';

import {
  propertyFormSchema,
  PropertyFormData,
  PROPERTY_TYPES,
  PROPERTY_STATUS,
  COUNTRIES,
} from '@/components/vendor/Product/Property/Property-form/schema';
import { Link } from 'react-router-dom';
import NumberInput from '../../../reuse/NumberInput';
import SelectInput from '../../../reuse/SelectInput';
import ImageUploader from '../../../reuse/ImageUploader';
import VideoUploader from '../../../reuse/VideoUploader';
import SectionCard from '../../../reuse/SectionCard';
import TextInput from '../../../reuse/TextInput';
import Textarea from '../../../reuse/Textarea';
import FacilitySelector from './FacilitySelector';

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

export default function Property() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [uploadedVideos, setUploadedVideos] = useState<UploadedVideo[]>([]);

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertyFormSchema) as any,
    defaultValues: {
      title: '',
      type: 'apartment',
      price: 0,
      area: 0,
      status: 'for-sale',
      bedrooms: 0,
      bathrooms: 0,
      garage: 0,
      description: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      address: '',
      facilities: {
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
      },
      customFacilities: [],
      videos: [],
    } as any,
  });

  const facilities = watch('facilities');
  const customFacilities = watch('customFacilities') || [];
  const description = watch('description') || '';

  console.log(description)

  const onSubmit = async (data: PropertyFormData) => {
    try {
      // Validate image count
      if (uploadedImages.length < 2) {
        toast.error('Please upload at least 2 images');
        return;
      }

      // Validate video count
      if (uploadedVideos.length < 2) {
        toast.error('Please upload at least 2 videos');
        return;
      }

      if (uploadedVideos.length > 4) {
        toast.error('Maximum 4 videos allowed');
        return;
      }

      setIsSubmitting(true);

      // Simulate API call
      console.log('Property data:', data);
      console.log('Images:', uploadedImages);
      console.log('Videos:', uploadedVideos);

      // Here you would send the data and images to your backend
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success('Property created successfully!');
      
      // Reset form or redirect
      setTimeout(() => {
        window.location.href = '/properties';
      }, 1500);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to create property');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100"
      >
        <div className="max-w-6xl mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              <ChevronLeft size={20} />
              Back to Properties
            </Link>
          </div>

          <div className="mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Add New Property
            </h1>
            <p className="text-gray-600 mt-1">
              Fill in the property information below to list your property.
            </p>
          </div>

          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600">
            <ol className="flex items-center gap-2">
              <li>
                <Link to="/properties" className="hover:text-gray-900 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link to="/properties" className="hover:text-gray-900 transition-colors">
                  Properties
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900 font-semibold">Add Property</li>
            </ol>
          </nav>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 pb-32">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Property Details */}
          <SectionCard title="Property Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextInput
                    label="Property Title"
                    placeholder="Enter property title"
                    error={errors.title}
                    {...field}
                  />
                )}
              />

              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <SelectInput
                    label="Property Type"
                    options={PROPERTY_TYPES}
                    error={errors.type}
                    {...field}
                  />
                )}
              />

              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    label="Price ($)"
                    placeholder="0"
                    error={errors.price}
                    onChange={(val:any) => field.onChange(val)}
                    value={field.value}
                  />
                )}
              />

              <Controller
                name="area"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    label="Area (sq ft)"
                    placeholder="0"
                    error={errors.area}
                    onChange={(val:any) => field.onChange(val)}
                    value={field.value}
                  />
                )}
              />

              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <SelectInput
                    label="Status"
                    options={PROPERTY_STATUS}
                    error={errors.status}
                    {...field}
                  />
                )}
              />

              <div className="grid grid-cols-3 gap-4">
                <Controller
                  name="bedrooms"
                  control={control}
                  render={({ field }) => (
                    <NumberInput
                      label="Bedrooms"
                      placeholder="0"
                      error={errors.bedrooms}
                      showControls
                      onChange={(val:any) => field.onChange(val)}
                      onIncrement={() => field.onChange((field.value || 0) + 1)}
                      onDecrement={() =>
                        field.onChange(Math.max(0, (field.value || 0) - 1))
                      }
                      value={field.value}
                    />
                  )}
                />

                <Controller
                  name="bathrooms"
                  control={control}
                  render={({ field }) => (
                    <NumberInput
                      label="Bathrooms"
                      placeholder="0"
                      error={errors.bathrooms}
                      showControls
                      onChange={(val:any) => field.onChange(val)}
                      onIncrement={() => field.onChange((field.value || 0) + 1)}
                      onDecrement={() =>
                        field.onChange(Math.max(0, (field.value || 0) - 1))
                      }
                      value={field.value}
                    />
                  )}
                />

                <Controller
                  name="garage"
                  control={control}
                  render={({ field }) => (
                    <NumberInput
                      label="Garage"
                      placeholder="0"
                      error={errors.garage}
                      showControls
                      onChange={(val:any) => field.onChange(val)}
                      onIncrement={() => field.onChange((field.value || 0) + 1)}
                      onDecrement={() =>
                        field.onChange(Math.max(0, (field.value || 0) - 1))
                      }
                      value={field.value}
                    />
                  )}
                />
              </div>

              <div className="md:col-span-2">
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      label="Property Description"
                      placeholder="Describe your property..."
                      maxLength={2000}
                      showCounter
                      error={errors.description}
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
          </SectionCard>

          {/* Location Details */}
          <SectionCard title="Location Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <div className="md:col-span-2">
                    <Textarea
                      label="Full Address"
                      placeholder="Enter complete address..."
                      error={errors.address}
                      {...field}
                    />
                  </div>
                )}
              />

              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <TextInput
                    label="City"
                    placeholder="Enter city name"
                    error={errors.city}
                    {...field}
                  />
                )}
              />

              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <TextInput
                    label="State"
                    placeholder="Enter state name"
                    error={errors.state}
                    {...field}
                  />
                )}
              />

              <Controller
                name="zipCode"
                control={control}
                render={({ field }) => (
                  <TextInput
                    label="Zip Code"
                    placeholder="Enter zip code"
                    error={errors.zipCode}
                    {...field}
                  />
                )}
              />

              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <SelectInput
                    label="Country"
                    searchable
                    options={COUNTRIES.map((c:any) => ({ value: c, label: c }))}
                    placeholder="Select a country"
                    error={errors.country}
                    {...field}
                  />
                )}
              />
            </div>
          </SectionCard>

          {/* Media Upload */}
          <SectionCard title="Property Media">
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
                  minVideos={2}
                  maxVideos={4}
                  minDuration={2}
                  maxDuration={300}
                  error={uploadedVideos.length === 0 ? 'Please upload at least 2 videos' : undefined}
                />
              </div>
            </div>
          </SectionCard>

          {/* Facilities */}
          <SectionCard title="Property Facilities">
            <Controller
              name="facilities"
              control={control}
              render={() => (
                <FacilitySelector
                  selectedFacilities={facilities}
                  customFacilities={customFacilities}
                  onFacilityChange={(facilityId: string, selected: boolean) => {
                    return setValue('facilities', {
                      ...facilities,
                      [facilityId]: selected,
                    });
                  }}
                  onCustomFacilityAdd={(facility:any) => {
                    setValue('customFacilities', [...customFacilities, facility]);
                  }}
                  onCustomFacilityRemove={(facility:any) => {
                    setValue(
                      'customFacilities',
                      customFacilities.filter((f:any) => f !== facility)
                    );
                  }}
                />
              )}
            />
          </SectionCard>

          {/* Form Validation Summary */}
          {Object.keys(errors).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
            >
              <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="font-semibold text-red-900">
                  Please fix the following errors:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-red-700 list-disc list-inside">
                  {Object.entries(errors).map(([field, error]) => (
                    <li key={field}>
                      {field}: {(error as any)?.message || 'This field is required'}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </form>
      </div>

      {/* Sticky Action Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg"
      >
        <div className="max-w-6xl mx-auto px-4 py-4 md:py-6 flex items-center justify-end gap-4">
          <Link
            to="/properties"
            className="px-6 py-3 border-2 border-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          

          <button
            type="button"
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            Save as Draft
          </button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {isSubmitting ? 'Creating...' : 'Add Property'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
