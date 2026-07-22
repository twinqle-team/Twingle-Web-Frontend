import { FC, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react';

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  progress: number;
}

interface ImageUploaderProps {
  onImagesChange: (images: UploadedImage[]) => void;
  maxImages?: number;
  minImages?: number;
  error?: string;
}

const ImageUploader: FC<ImageUploaderProps> = ({
  onImagesChange,
  maxImages = 10,
  minImages = 2,
  error,
}) => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newImages = acceptedFiles
        .slice(0, maxImages - images.length)
        .map((file) => ({
          id: Math.random().toString(36).substr(2, 9),
          file,
          preview: URL.createObjectURL(file),
          progress: 0,
        }));

      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      onImagesChange(updatedImages);

      // Simulate upload progress
      newImages.forEach((img) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 30;
          if (progress > 100) progress = 100;

          setImages((prev) =>
            prev.map((i) =>
              i.id === img.id ? { ...i, progress } : i
            )
          );

          if (progress >= 100) clearInterval(interval);
        }, 100);
      });
    },
    [images, maxImages, onImagesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    maxSize: 5242880, // 5MB
  });

  const removeImage = (id: string) => {
    const updated = images.filter((img) => img.id !== id);
    setImages(updated);
    onImagesChange(updated);
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const updated = [...images];
    [updated[fromIndex], updated[toIndex]] = [updated[toIndex], updated[fromIndex]];
    setImages(updated);
    onImagesChange(updated);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Upload Area */}
      <motion.div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 transition-colors cursor-pointer
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}
          ${error ? 'border-red-500 bg-red-50' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center">
          <motion.div
            animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
            className={`p-3 rounded-lg mb-3 ${
              isDragActive
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            <Upload size={28} />
          </motion.div>
          <p className="text-center text-gray-900 font-semibold">
            Drag & drop your images here
          </p>
          <p className="text-center text-gray-500 text-sm mt-1">
            or click to select files
          </p>
          <p className="text-center text-gray-400 text-xs mt-2">
            Supported formats: JPG, PNG, WEBP (Max 5MB each)
          </p>
          <p className="text-center text-gray-400 text-xs mt-1">
            {minImages} - {maxImages} images required
          </p>
        </div>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg"
        >
          <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-600">{error}</p>
        </motion.div>
      )}

      {/* Image Preview Grid */}
      <AnimatePresence>
        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6"
          >
            <p className="text-sm font-semibold text-gray-900 mb-3">
              Uploaded Images ({images.length}/{maxImages})
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <motion.div
                  key={img.id}
                  layout
                  draggable
                  onDragStart={() => setDragIndex(idx)}
                  onDragOver={(e) => {
                    e.preventDefault();
                    if (dragIndex !== null && dragIndex !== idx) {
                      moveImage(dragIndex, idx);
                      setDragIndex(idx);
                    }
                  }}
                  onDragEnd={() => setDragIndex(null)}
                  className="relative group"
                >
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={img.preview}
                      alt={`Preview ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />

                    {/* Progress Bar */}
                    {img.progress < 100 && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full border-4 border-white border-t-blue-500 animate-spin" />
                      </div>
                    )}

                    {/* Overlay */}
                    <motion.div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        onClick={() => removeImage(img.id)}
                        type="button"
                        className="p-2 bg-red-500 hover:bg-red-600 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove image"
                      >
                        <X size={20} />
                      </motion.button>
                    </motion.div>

                    {/* Index Badge */}
                    <div className="absolute top-2 left-2 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Drag images to reorder • Click X to remove
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ImageUploader;
