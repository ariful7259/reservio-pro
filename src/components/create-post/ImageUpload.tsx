
import React from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  uploadedImages: File[];
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  uploadedImages,
  onImageUpload,
  onRemoveImage
}) => {
  return (
    <div>
      <label className="text-sm font-medium mb-2 block">
        <ImageIcon className="h-4 w-4 inline mr-1" />
        ছবি আপলোড করুন
      </label>
      <div className="mt-2">
        <input
          id="images"
          type="file"
          multiple
          accept="image/*"
          onChange={onImageUpload}
          className="hidden"
        />
        <label
          htmlFor="images"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
        >
          <Upload className="h-8 w-8 text-gray-400" />
          <span className="mt-2 text-sm text-gray-500">একাধিক ছবি নির্বাচন করুন</span>
        </label>
      </div>
      
      {/* Uploaded Images Preview */}
      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-3">
          {uploadedImages.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt={`Upload ${index}`}
                className="w-full h-20 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => onRemoveImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
