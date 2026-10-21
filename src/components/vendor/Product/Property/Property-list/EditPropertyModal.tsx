import { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader, Save, Image as ImageIcon, Video, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { Property } from '@/components/vendor/types/property';
import { useUpdateProperty } from '@/hooks/useProperties';

interface EditPropertyModalProps {
  isOpen: boolean;
  property: Property | null;
  onClose: () => void;
  onSuccess?: () => void;
}

const EditPropertyModal: FC<EditPropertyModalProps> = ({
  isOpen,
  property,
  onClose,
  onSuccess,
}) => {
  const { mutate: updateProperty, isPending } = useUpdateProperty();
  const [formData, setFormData] = useState<Partial<Property>>({});
  const [imagePreview, setImagePreview] = useState('');
  const [videoPreview, setVideoPreview] = useState('');

  useEffect(() => {
    if (property) {
      setFormData({ ...property, facilities: { pool: property.facilities?.pool ?? false, parking: property.facilities?.parking ?? false, gym: property.facilities?.gym ?? false, security: property.facilities?.security ?? false, garden: property.facilities?.garden ?? false } });
      setImagePreview(property.image || '');
      setVideoPreview(property.video || '');
    }
  }, [property, isOpen]);

  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>, mediaType: 'image' | 'video') => {
    const file = event.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    if (mediaType === 'image') {
      setImagePreview(preview);
      setFormData((previous) => ({ ...previous, image: preview }));
    } else {
      setVideoPreview(preview);
      setFormData((previous) => ({ ...previous, video: preview }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'price' || name === 'bedrooms' || name === 'bathrooms' || name === 'garage' || name === 'area') {
      setFormData(prev => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFacilityChange = (facility: keyof Property['facilities']) => {
    setFormData(prev => ({
      ...prev,
      facilities: {
        ...prev.facilities!,
        [facility]: !prev.facilities?.[facility],
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.id) return;

    const updates: Partial<Property> = {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      type: formData.type,
      status: formData.status,
      location: formData.location,
      city: formData.city,
      country: formData.country,
      bedrooms: formData.bedrooms,
      bathrooms: formData.bathrooms,
      garage: formData.garage,
      area: formData.area,
      image: formData.image,
      video: formData.video,
      facilities: formData.facilities,
    };

    updateProperty(
      { id: formData.id, updates },
      {
        onSuccess: () => {
          toast.success('Property updated successfully');
          onClose();
          onSuccess?.();
        },
        onError: () => {
          toast.error('Failed to update property');
        },
      }
    );
  };

  if (!property) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 flex items-center justify-between bg-[#012E19] px-5 py-4 sm:px-6">
                <h2 className="text-xl font-bold text-white">Edit Property</h2>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X size={24} className="text-white" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6 p-5 sm:p-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Property Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description || ''}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Property Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Property Type
                      </label>
                      <select
                        name="type"
                        value={formData.type || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      >
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="villa">Villa</option>
                        <option value="land">Land</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        name="status"
                        value={formData.status || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      >
                        <option value="for-sale">For Sale</option>
                        <option value="for-rent">For Rent</option>
                        <option value="sold">Sold</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Area (sqft)
                      </label>
                      <input
                        type="number"
                        name="area"
                        value={formData.area || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Rooms & Features */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Rooms & Garage</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bedrooms
                      </label>
                      <input
                        type="number"
                        name="bedrooms"
                        value={formData.bedrooms || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bathrooms
                      </label>
                      <input
                        type="number"
                        name="bathrooms"
                        value={formData.bathrooms || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Garage Spaces
                      </label>
                      <input
                        type="number"
                        name="garage"
                        value={formData.garage || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Media */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-[#012E19]">Images & video</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="relative flex min-h-40 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-[#b8cfc1] bg-[#f7faf8] p-4 hover:border-[#F2B60A]">
                      {imagePreview ? <img src={imagePreview} alt="Property preview" className="absolute inset-0 h-full w-full object-cover" /> : <><ImageIcon size={28} className="text-[#012E19]" /><span className="ml-2 text-sm font-semibold text-[#012E19]">Choose image</span></>}
                      <span className="absolute bottom-2 inline-flex items-center gap-1 rounded-md bg-[#012E19]/90 px-2 py-1 text-xs text-white"><Upload size={13} /> Replace image</span>
                      <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => handleMediaChange(event, 'image')} className="sr-only" />
                    </label>
                    <label className="relative flex min-h-40 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-[#b8cfc1] bg-[#f7faf8] p-4 hover:border-[#F2B60A]">
                      {videoPreview ? <video src={videoPreview} controls className="absolute inset-0 h-full w-full object-cover" /> : <><Video size={28} className="text-[#012E19]" /><span className="ml-2 text-sm font-semibold text-[#012E19]">Choose video</span></>}
                      {!videoPreview && <span className="absolute bottom-2 inline-flex items-center gap-1 rounded-md bg-[#012E19]/90 px-2 py-1 text-xs text-white"><Upload size={13} /> Replace video</span>}
                      <input type="file" accept="video/mp4,video/webm,video/quicktime" onChange={(event) => handleMediaChange(event, 'video')} className="sr-only" />
                    </label>
                  </div>
                </div>

                {/* Facilities */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-[#012E19]">Facilities</h3>
                  <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:grid-cols-3">
                    {Object.entries(formData.facilities || {}).map(([key, value]) => (
                      <label key={key} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value as boolean}
                          onChange={() => handleFacilityChange(key as keyof Property['facilities'])}
                          className="h-4 w-4 rounded border-gray-300 text-[#012E19] focus:ring-2 focus:ring-[#F2B60A]"
                        />
                        <span className="text-gray-700 font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isPending}
                    className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#012E19] px-4 py-3 font-medium text-white transition-all hover:bg-[#074b2d] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isPending && <Loader size={18} className="animate-spin" />}
                    {isPending ? 'Saving...' : (
                      <>
                        <Save size={18} />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EditPropertyModal;
