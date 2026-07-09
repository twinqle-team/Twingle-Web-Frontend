import { DocumentFile } from '@/components/vendor/Kyc/types/kyc';
import { Upload, X, FileText, Image as ImageIcon } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface UploadZoneProps {
  onFileAccepted: (file: DocumentFile) => void;
  onFileRemoved: () => void;
  currentFile?: DocumentFile | null;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onFileAccepted, onFileRemoved, currentFile }) => {
  const [error, setError] = useState('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
      setError('Only JPG, PNG, and PDF files are allowed');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be under 10MB');
      return;
    }

    setError('');
    const reader = new FileReader();
    reader.onload = (e) => {
      onFileAccepted({
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
        preview: file.type.startsWith('image') ? (e.target?.result as string) : undefined,
      });
    };
    reader.readAsDataURL(file);
  }, [onFileAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1 });

  if (currentFile) {
    return (
      <div className="border border-white/20 rounded-3xl p-8 bg-white/5 backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center">
            {currentFile.type.includes('pdf') ? <FileText className="w-10 h-10 text-pink-400" /> : <ImageIcon className="w-10 h-10 text-blue-400" />}
          </div>
          <div className="flex-1">
            <p className="font-medium truncate">{currentFile.name}</p>
            <p className="text-sm text-white/60">{(currentFile.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          <button onClick={onFileRemoved} className="text-red-400 hover:text-red-500">
            <X size={28} />
          </button>
        </div>
        {currentFile.preview && <img src={currentFile.preview} alt="preview" className="mt-6 rounded-2xl max-h-80 w-full object-contain" />}
      </div>
    );
  }

  return (
    <div {...getRootProps()} className={`border-3 border-dashed rounded-3xl p-16 text-center cursor-pointer transition-all ${isDragActive ? 'border-[#F84BFC] bg-pink-500/10' : 'border-white/20 hover:border-white/40'}`}>
      <input {...getInputProps()} />
      <Upload className="w-16 h-16 mx-auto mb-6 text-white/70" />
      <h3 className="text-2xl font-semibold mb-2">Drop your ID here</h3>
      <p className="text-white/60">JPG, PNG or PDF • Max 10MB</p>
      <p className="mt-6 inline-block px-8 py-3 bg-white/10 rounded-2xl">Browse Files</p>
      {error && <p className="text-red-400 mt-6">{error}</p>}
    </div>
  );
};