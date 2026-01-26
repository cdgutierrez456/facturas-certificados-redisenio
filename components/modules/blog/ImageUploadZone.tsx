'use client';

import { useState, useRef, ChangeEvent, MouseEvent, useEffect } from 'react';
import Image from 'next/image';
import { Plus, X } from 'lucide-react';

import { showToast } from '@/utils/alerts';

interface ImageUploadZoneProps {
  onImageSelect: (file: File | null) => void;
  error?: string;
  urlImage?: string;
}

export default function ImageUploadZone({ onImageSelect, error, urlImage }: ImageUploadZoneProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (urlImage) setPreviewUrl(urlImage);
  }, [])

  const handleContainerClick = () => {
    if (previewUrl) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showToast('error', 'Por favor selecciona un archivo de imagen válido')
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageSelect(file);
    }
  };

  const handleRemoveImage = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageSelect(null);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-bold text-gray-700 mb-2">
        Imagen de portada *
      </label>

      <div
        onClick={handleContainerClick}
        className={`
          relative w-full h-64 rounded-2xl transition-all duration-300 overflow-hidden group flex justify-center items-center
          ${!previewUrl ? 'border-2 border-dashed cursor-pointer hover:bg-gray-50' : ''}
          ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}
        `}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
        />

        {previewUrl ? (
          <>
            <Image src={previewUrl} alt="Vista previa" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/0 transition-all group-hover:bg-black/20 z-10"></div>
            <button
              onClick={handleRemoveImage}
              type="button"
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-red-500 z-20 opacity-0 group-hover:opacity-100 transition-all"
            >
              <X size={20} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className={`border-2 rounded-full p-1 ${error ? 'border-red-400 text-red-400' : 'border-gray-300 text-gray-400'}`}>
              <Plus size={32} strokeWidth={1.5} />
            </div>
            {error && <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
}