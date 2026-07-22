import { FC, useCallback, useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Video as VideoIcon, AlertCircle, Clock } from 'lucide-react';

interface UploadedVideo {
  id: string;
  file: File;
  preview: string;
  progress: number;
  duration: number;
  fileName: string;
}

interface VideoUploaderProps {
  onVideosChange: (videos: UploadedVideo[]) => void;
  maxVideos?: number;
  minVideos?: number;
  minDuration?: number;
  maxDuration?: number;
  error?: string;
}

const VideoUploader: FC<VideoUploaderProps> = ({
  onVideosChange,
  maxVideos = 4,
  minVideos = 2,
  minDuration = 2,
  maxDuration = 300, // 5 minutes
  error,
}) => {
  const [videos, setVideos] = useState<UploadedVideo[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});

  const validateVideoDuration = useCallback(
    (file: File): Promise<number> => {
      return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        const objectUrl = URL.createObjectURL(file);

        const handleLoadedMetadata = () => {
          URL.revokeObjectURL(objectUrl);
          const duration = video.duration;

          if (duration < minDuration) {
            reject(new Error(`Video must be at least ${minDuration} seconds`));
          } else if (duration > maxDuration) {
            reject(new Error(`Video must be less than ${Math.floor(maxDuration / 60)} minutes`));
          } else {
            resolve(duration);
          }
        };

        video.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true });
        video.addEventListener('error', () => {
          URL.revokeObjectURL(objectUrl);
          reject(new Error('Invalid video file'));
        }, { once: true });

        video.src = objectUrl;
      });
    },
    [minDuration, maxDuration]
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const newErrors: string[] = [];
      const newVideos: UploadedVideo[] = [];

      // Check total count
      if (videos.length + acceptedFiles.length > maxVideos) {
        newErrors.push(`Maximum ${maxVideos} videos allowed`);
      }

      // Validate each file
      for (const file of acceptedFiles) {
        if (videos.length + newVideos.length >= maxVideos) {
          newErrors.push(`Maximum ${maxVideos} videos allowed`);
          break;
        }

        // File size validation (100MB max per video)
        if (file.size > 104857600) {
          newErrors.push(`${file.name}: File size exceeds 100MB`);
          continue;
        }

        // Validate duration
        try {
          const duration = await validateVideoDuration(file);
          const preview = URL.createObjectURL(file);

          newVideos.push({
            id: Math.random().toString(36).substr(2, 9),
            file,
            preview,
            progress: 0,
            duration,
            fileName: file.name,
          });
        } catch (err) {
          newErrors.push(
            `${file.name}: ${err instanceof Error ? err.message : 'Invalid video'}`
          );
        }
      }

      if (newErrors.length > 0) {
        setValidationErrors(newErrors);
        newErrors.forEach((err) => {
          if (videos.length + newVideos.length < minVideos) {
            // Only show toast for important errors
          }
        });
      } else {
        setValidationErrors([]);
      }

      if (newVideos.length > 0) {
        const updatedVideos = [...videos, ...newVideos];
        setVideos(updatedVideos);
        onVideosChange(updatedVideos);

        // Simulate upload progress
        newVideos.forEach((vid) => {
          let progress = 0;
          const interval = setInterval(() => {
            progress += Math.random() * 25;
            if (progress > 100) progress = 100;

            setVideos((prev) =>
              prev.map((v) =>
                v.id === vid.id ? { ...v, progress } : v
              )
            );

            if (progress >= 100) clearInterval(interval);
          }, 150);
        });
      }
    },
    [videos, maxVideos, validateVideoDuration, onVideosChange, minVideos]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.webm', '.mov', '.avi', '.mkv'],
    },
    maxSize: 104857600, // 100MB per file
  });

  const removeVideo = (id: string) => {
    const video = videos.find((v) => v.id === id);
    if (video) {
      URL.revokeObjectURL(video.preview);
    }

    const updated = videos.filter((vid) => vid.id !== id);
    setVideos(updated);
    onVideosChange(updated);
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Upload Area */}
      <motion.div
        {...(getRootProps() as any)}
        whileHover={{ borderColor: '#9333ea' }}
        className={`border-2 border-dashed rounded-xl p-8 transition-colors cursor-pointer
          ${isDragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}
          ${error || validationErrors.length > 0 ? 'border-red-500 bg-red-50' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center">
          <motion.div
            animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
            className={`p-3 rounded-lg mb-3 ${
              isDragActive
                ? 'bg-purple-100 text-purple-600'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            <Upload size={28} />
          </motion.div>
          <p className="text-center text-gray-900 font-semibold">
            Drag & drop your videos here
          </p>
          <p className="text-center text-gray-500 text-sm mt-1">
            or click to select files
          </p>
          <p className="text-center text-gray-400 text-xs mt-2">
            Supported formats: MP4, WebM, MOV, AVI, MKV (Max 100MB each)
          </p>
          <p className="text-center text-gray-400 text-xs mt-1">
            Duration: {minDuration}s - {Math.floor(maxDuration / 60)}min • Count: {minVideos} - {maxVideos}
          </p>
        </div>
      </motion.div>

      {/* Error Messages */}
      {(error || validationErrors.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 space-y-2"
        >
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          {validationErrors.map((err, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
            >
              <AlertCircle size={18} className="text-yellow-600 flex-shrink-0" />
              <p className="text-sm text-yellow-700">{err}</p>
            </div>
          ))}
        </motion.div>
      )}

      {/* Video Preview Grid */}
      <AnimatePresence>
        {videos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6"
          >
            <p className="text-sm font-semibold text-gray-900 mb-3">
              Uploaded Videos ({videos.length}/{maxVideos})
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {videos.map((vid, idx) => (
                <motion.div
                  key={vid.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative group"
                >
                  <div className="relative w-full bg-gray-900 rounded-lg overflow-hidden border border-gray-300">
                    {/* Video Preview */}
                    <video
                      ref={(el) => {
                        if (el) videoRefs.current[vid.id] = el;
                      }}
                      src={vid.preview}
                      className="w-full h-48 object-cover"
                    />

                    {/* Progress Bar */}
                    {vid.progress < 100 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-full border-4 border-white border-t-purple-500 animate-spin" />
                          <p className="text-white text-xs font-medium">
                            {Math.round(vid.progress)}%
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Overlay */}
                    <motion.div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        onClick={() => removeVideo(vid.id)}
                        type="button"
                        className="p-2 bg-red-500 hover:bg-red-600 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove video"
                      >
                        <X size={20} />
                      </motion.button>
                    </motion.div>

                    {/* Index Badge */}
                    <div className="absolute top-2 left-2 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 bg-black/70 text-white rounded text-xs font-medium">
                      <Clock size={12} />
                      {formatDuration(vid.duration)}
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="mt-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs font-medium text-gray-900 truncate">
                      {vid.fileName}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">
                        {formatFileSize(vid.file.size)}
                      </span>
                      <span className="text-xs font-medium text-purple-600">
                        {formatDuration(vid.duration)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Click X to remove videos • {minVideos}-{maxVideos} videos required
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default VideoUploader;
