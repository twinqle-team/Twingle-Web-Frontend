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
      <div className="rounded-xl border border-[#dce8e0] bg-[#f7faf8] p-4 sm:p-6">
        <div className="flex items-start gap-4 sm:items-center sm:gap-6">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white sm:h-20 sm:w-20 sm:rounded-2xl">
            {currentFile.type.includes('pdf') ? <FileText className="h-8 w-8 text-[#012E19] sm:h-10 sm:w-10" /> : <ImageIcon className="h-8 w-8 text-[#F2B60A] sm:h-10 sm:w-10" />}
          </div>
          <div className="flex-1">
            <p className="font-medium text-[#012E19]">ID document uploaded</p>
            <p className="text-sm text-[#60756a]">{(currentFile.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          <button onClick={onFileRemoved} aria-label="Remove document" className="text-red-500 hover:text-red-700">
            <X size={28} />
          </button>
        </div>
        {currentFile.preview && <img src={currentFile.preview} alt="preview" className="mt-6 rounded-2xl max-h-80 w-full object-contain" />}
      </div>
    );
  }

  return (
    <div {...getRootProps()} className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all sm:p-14 ${isDragActive ? 'border-[#F2B60A] bg-[#fff8df]' : 'border-[#b8cfc1] hover:border-[#F2B60A]'}`}>
      <input {...getInputProps()} />
      <Upload className="mx-auto mb-5 h-12 w-12 text-[#012E19] sm:h-16 sm:w-16" />
      <h3 className="mb-2 text-xl font-semibold text-[#012E19] sm:text-2xl">Drop your ID here</h3>
      <p className="text-sm text-[#60756a] sm:text-base">JPG, PNG or PDF • Max 10MB</p>
      <p className="mt-5 inline-block rounded-lg bg-[#012E19] px-6 py-2.5 text-sm font-semibold text-white">Browse Files</p>
      {error && <p className="mt-5 text-red-500">{error}</p>}
    </div>
  );
};