import { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader, Save, Image as ImageIcon, Video, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { Automotives } from '@/components/vendor/types/Automotives';
import { useUpdateAuto } from '@/hooks/useAutomotive';
import ImageUploader from '../../../reuse/ImageUploader';

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  progress: number;
}

interface AutoEditModalProps {
  isOpen: boolean;
  property: Automotives | null;
  onClose: () => void;
  onSuccess?: () => void;
}

const AutoEditModal: FC<AutoEditModalProps> = ({
  isOpen,
  property,
  onClose,
  onSuccess,
}) => {
  const { mutate: updateAuto, isPending } = useUpdateAuto();
  const [formData, setFormData] = useState<Partial<Automotives>>({});
  const [imagePreview, setImagePreview] = useState('');
  const [videoPreview, setVideoPreview] = useState('');
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const facilityKeys: Array<keyof Automotives['facilities']> = [
    'airconditioning', 'leatherseats', 'heatedseats', 'ventilatedseats', 'sunroof',
    'panoramicroof', 'navigationsystem', 'bluetooth', 'applecarplay', 'androidauto',
    'backupcamera', 'parkingsensors', 'cruisecontrol', 'adaptivecruisecontrol',
    'laneassist', 'blindspotmonitoring', 'abs', 'airbags', 'pushstart', 'keylessentry',
    'alloywheels', 'foglights', 'ledheadlights', 'xenonheadlights', 'powerwindows',
    'powersteering', 'wirelesscharging', 'premiumsoundsystem', 'remotestart',
  ];

  useEffect(() => {
    if (property) {
      setFormData({
        ...property,
        facilities: facilityKeys.reduce((facilities, key) => ({
          ...facilities,
          [key]: property.facilities?.[key] ?? false,
        }), {} as Automotives['facilities']),
      });
      setImagePreview(property.image || '');
      setVideoPreview(property.video || '');
      setUploadedImages([]);
    }
  }, [property, isOpen]);

  const handleMediaChange = async (event: React.ChangeEvent<HTMLInputElement>, mediaType: 'image' | 'video') => {
    const file = event.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    if (mediaType === 'image') {
      setImagePreview(preview);
      setFormData((previous) => ({ ...previous, image: preview }));
    } else {
      const videoElement = document.createElement('video');
      videoElement.preload = 'metadata';
      videoElement.src = preview;
      const duration = await new Promise<number>((resolve) => {
        videoElement.onloadedmetadata = () => resolve(videoElement.duration);
        videoElement.onerror = () => resolve(Number.POSITIVE_INFINITY);
      });
      if (duration > 180) {
        URL.revokeObjectURL(preview);
        toast.error('Video must be 3 minutes or less');
        event.target.value = '';
        return;
      }
      setVideoPreview(preview);
      setFormData((previous) => ({ ...previous, video: preview }));
    }
  };

  const handleImagesChange = (images: UploadedImage[]) => {
    setUploadedImages(images);
    if (images[0]) {
      setFormData((previous) => ({ ...previous, image: images[0].preview }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'price' || name === 'mileage' || name === 'enginecapacity' || name === 'year' || name === 'zipcode' || name === 'unit' || name === 'vin' || name === 'model' || name === 'exteriorcolor' || name === 'interiorcolor' || name === 'fulladdress' || name === 'state' || name === 'city' || name === 'country' ) {
      setFormData(prev => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFacilityChange = (facility: keyof Automotives['facilities']) => {
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

    const totalImages = (imagePreview ? 1 : 0) + uploadedImages.length;
    if (totalImages < 2 || totalImages > 10) {
      toast.error('Please add between 2 and 10 images');
      return;
    }

    const updates: Partial<Automotives> = {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      brand: formData.brand,
      type: formData.type,
      status: formData.status,
      transmission: formData.transmission,
      fueltype: formData.fueltype,
      drivetype: formData.drivetype,
        mileage: formData.mileage,
        unit: formData.unit,
        enginecapacity: formData.enginecapacity,
        exteriorcolor: formData.exteriorcolor,
        interiorcolor: formData.interiorcolor,
        vin: formData.vin,
        model: formData.model,
        year: formData.year,
        condition: formData.condition,
        state: formData.state,
        city: formData.city,
        zipcode: formData.zipcode,
        country: formData.country,
        fulladdress: formData.fulladdress,
        image: formData.image,
        video: formData.video,
      facilities: formData.facilities,
    };

    updateAuto(
      { id: formData.id, updates },
      {
        onSuccess: () => {
          toast.success('Auto updated successfully');
          onClose();
          onSuccess?.();
        },
        onError: () => {
          toast.error('Failed to update auto');
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
              <div className="sticky bg-[#012E19] px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Edit Auto</h2>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X size={24} className="text-white" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Auto Title
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

                {/* Auto Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Auto Details</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Auto Brand */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Auto Brand
                      </label>
                      <select
                        name="brand"
                        value={formData.brand || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      >
                        <option value="toyota">Toyota</option>
                        <option value="honda">Honda</option>
                        <option value="mercedes-benz">Mercedes-Benz</option>
                        <option value="bmw">BMW</option>
                        <option value="lexus">Lexus</option>
                        <option value="ford">Ford</option>
                        <option value="audi">Audi</option>
                        <option value="nissan">Nissan</option>
                        <option value="hyundai">Hyundai</option>
                        <option value="kia">Kia</option>
                        <option value="chevrolet">Chevrolet</option>
                        <option value="volkswagen">Volkswagen</option>
                        <option value="subaru">Subaru</option>
                        <option value="mazda">Mazda</option>
                        <option value="jaguar">Jaguar</option>
                        <option value="porsche">Porsche</option>
                        <option value="tesla">Tesla</option>
                        <option value="volvo">Volvo</option>
                        <option value="land-rover">Land Rover</option>
                        <option value="mini">Mini</option>
                        <option value="infiniti">Infiniti</option>
                        <option value="pickup">Pickup</option>
                        <option value="van">Van</option>
                        <option value="minivan">Minivan</option>
                        <option value="truck">Truck</option>
                        <option value="acura">Acura</option>
                        <option value="mitsubishi">Mitsubishi</option>
                        <option value="suzuki">Suzuki</option>
                        <option value="peugeot">Peugeot</option>
                        <option value="renault">Renault</option>
                        <option value="fiat">Fiat</option>
                        <option value="alfa-romeo">Alfa Romeo</option>
                        <option value="citroen">Citroen</option>
                        <option value="skoda">Skoda</option>
                        <option value="seat">Seat</option>
                        <option value="dacia">Dacia</option>
                        <option value="opel">Opel</option>
                        <option value="saab">Saab</option>
                        <option value="lancia">Lancia</option>
                        <option value="isuzu">Isuzu</option>
                        <option value="daewoo">Daewoo</option>
                        <option value="hummer">Hummer</option>
                        <option value="holden">Holden</option>
                        <option value="chrysler">Chrysler</option>
                        <option value="jeep">Jeep</option>
                        <option value="ram">Ram</option>
                        <option value="buick">Buick</option>
                        <option value="cadillac">Cadillac</option>
                        <option value="lincoln">Lincoln</option>
                        <option value="pontiac">Pontiac</option>
                        <option value="saturn">Saturn</option>
                        <option value="ferrari">Ferrari</option>
                        <option value="lamborghini">Lamborghini</option>
                        <option value="mclaren">McLaren</option>
                        <option value="aston-martin">Aston Martin</option>
                        <option value="bugatti">Bugatti</option>
                        <option value="koenigsegg">Koenigsegg</option>
                        <option value="pagani">Pagani</option>
                        <option value="rolls-royce">Rolls-Royce</option>
                        <option value="bentley">Bentley</option>
                        <option value="maserati">Maserati</option>
                        <option value="lotus">Lotus</option>
                      </select>
                    </div>

                    {/* Auto Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Auto Type
                      </label>
                      <select
                        name="type"
                        value={formData.type || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      >
                        <option value="sedan">Sedan</option>
                        <option value="suv">SUV</option>
                        <option value="hatchback">Hatchback</option>
                        <option value="coupe">Coupe</option>
                        <option value="convertible">Convertible</option>
                        <option value="wagon">Wagon</option>
                        <option value="pickup">Pickup</option>
                        <option value="van">Van</option>
                        <option value="minivan">Minivan</option>
                        <option value="truck">Truck</option>
                      </select>
                    </div>
                    {/* Status */}
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
                        <option value="available">Available</option>
                        <option value="reserved">Reserved</option>
                        <option value="sold">Sold</option>
                      </select>
                    </div>
                    {/* Price */}
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
                    {/* Transmission */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Transmission
                      </label>
                      <select
                        name="transmission"
                        value={formData.transmission || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      >
                        <option value="manual">Manual</option>
                        <option value="automatic">Automatic</option>
                        <option value="cvt">CVT</option>
                        <option value="semi-automatic">Semi-Automatic</option>
                      </select>
                    </div>
                    {/* Fuel Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fuel Type
                      </label>
                      <select
                        name="fuelType"
                        value={formData.fueltype || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      >
                        <option value="gasoline">Gasoline</option>
                        <option value="diesel">Diesel</option>
                        <option value="electric">Electric</option>
                        <option value="hybrid">Hybrid</option>
                      </select>
                    </div>
                    {/* Drive Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Drive Type
                      </label>
                      <select
                        name="driveType"
                        value={formData.drivetype || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      >
                        <option value="front-wheel">Front-Wheel Drive</option>
                        <option value="rear-wheel">Rear-Wheel Drive</option>
                        <option value="all-wheel">All-Wheel Drive</option>
                      </select>
                    </div>
                    {/* Mileage */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mileage
                      </label>
                      <input
                        type="number"
                        name="mileage"
                        value={formData.mileage || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>
                    {/* Mileage Unit */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mileage Unit
                      </label>
                      <select
                        name="mileageUnit"
                        value={formData.unit || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      >
                        <option value="miles">Miles</option>
                        <option value="kilometers">Kilometers</option>
                      </select>
                    </div>
                    {/* Engine Capacity */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Engine Capacity
                      </label>
                      <input
                        type="number"
                        name="engineCapacity"
                        value={formData.enginecapacity || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>
                    {/* Exterior Color */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Exterior Color
                      </label>
                      <input
                        type="text"
                        name="exteriorColor"
                        value={formData.exteriorcolor || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>
                    {/* Interior Color */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Interior Color
                      </label>
                      <input
                        type="text"
                        name="interiorColor"
                        value={formData.interiorcolor || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>
                    {/* VIN */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        VIN
                      </label>
                      <input
                        type="text"
                        name="vin"
                        value={formData.vin || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>
                    {/* Model */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Model
                      </label>
                      <input
                        type="text"
                        name="model"
                        value={formData.model || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>
                    {/* Year */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Year
                      </label>
                      <input
                        type="text"
                        name="year"
                        value={formData.year || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>
                    {/* condition */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        condition
                      </label>
                      <select
                        name="condition"
                        value={formData.condition || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      >
                        <option value="new">New</option>
                        <option value="used">Used</option>
                        <option value="certified pre-owned">Certified Pre-Owned</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Address
                      </label>
                      <input
                        type="text"
                        name="fulladdress"
                        value={formData.fulladdress || ''}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        state
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state || ''}
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
                        zipcode
                      </label>
                      <input
                        type="text"
                        name="zipcode"
                        value={formData.zipcode || ''}
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

                {/* Facilities */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Facilities</h3>
                  <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:grid-cols-3">
                    {facilityKeys.map((key) => (
                      <label key={key} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-gray-200 px-3 py-2.5 hover:border-[#F2B60A]">
                        <input
                          type="checkbox"
                          checked={Boolean(formData.facilities?.[key])}
                          onChange={() => handleFacilityChange(key)}
                          className="h-4 w-4 rounded border-gray-300 text-[#012E19] focus:ring-2 focus:ring-[#F2B60A]"
                        />
                        <span className="text-gray-700 font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-4 flex flex-wrap items-end justify-between gap-2"><div><h3 className="text-lg font-semibold text-gray-900">Images & video</h3><p className="mt-1 text-xs text-gray-500">Add at least 2 and no more than 10 images.</p></div><span className="rounded-full bg-[#fff4d4] px-3 py-1 text-xs font-bold text-[#8a6400]">{(imagePreview ? 1 : 0) + uploadedImages.length}/10 images</span></div>
                  <div className="mb-4 rounded-xl border border-[#dce8e0] bg-[#f7faf8] p-3"><div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#012E19]"><ImageIcon size={15} className="text-[#a57900]" /> Current primary image</div>{imagePreview ? <img src={imagePreview} alt="Current vehicle" className="h-36 w-full rounded-lg object-cover sm:h-44" /> : <p className="py-8 text-center text-sm text-gray-500">No current image</p>}</div>
                  <ImageUploader onImagesChange={handleImagesChange} minImages={imagePreview ? 1 : 2} maxImages={imagePreview ? 9 : 10} error={undefined} />
                  <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
                    <label className="group relative flex min-h-40 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-[#b8cfc1] bg-[#f7faf8] p-4 text-center hover:border-[#F2B60A]">
                      {videoPreview ? <video src={videoPreview} controls className="absolute inset-0 h-full w-full object-cover" /> : <><Video className="mb-2 text-[#012E19]" size={28} /><span className="text-sm font-semibold text-[#012E19]">Upload replacement video</span></>}
                      {!videoPreview && <span className="absolute bottom-2 inline-flex items-center gap-1 rounded-md bg-[#012E19]/90 px-2 py-1 text-xs font-medium text-white"><Upload size={13} /> Choose video</span>}
                      <input type="file" accept="video/mp4,video/webm,video/quicktime" onChange={(event) => handleMediaChange(event, 'video')} className="sr-only" />
                    </label>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">Selecting a file replaces the current media preview. Videos must be 3 minutes or less.</p>
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
                    className="flex-1 px-4 py-3 bg-[#012E19] text-white rounded-lg hover:bg-[#074b2d] transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

export default AutoEditModal;
