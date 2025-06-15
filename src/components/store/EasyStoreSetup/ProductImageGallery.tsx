
import React from "react";

interface ProductImageGalleryProps {
  images: string[];
  onChange?: (images: string[]) => void;
  editable?: boolean;
}
const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  onChange,
  editable = false,
}) => {
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    const urls = files.map(f => URL.createObjectURL(f));
    if(onChange) onChange([...(images || []), ...urls]);
  }
  function removeImage(idx: number) {
    if (onChange) onChange(images.filter((_, i) => i !== idx));
  }
  return (
    <div>
      <div className="flex gap-2 flex-wrap">
        {images.map((src, i) => (
          <div className="relative" key={i}>
            <img src={src} alt="product" className="rounded-md w-20 h-20 object-cover border" />
            {editable && (
              <button
                aria-label="Remove image"
                className="absolute top-0 right-0 text-red-600 bg-white rounded-full p-0.5"
                onClick={() => removeImage(i)}
                type="button"
              >×</button>
            )}
          </div>
        ))}
      </div>
      {editable && (
        <input
          type="file"
          className="mt-2"
          multiple
          accept="image/*"
          aria-label="Upload product images"
          onChange={handleFileChange}
        />
      )}
    </div>
  );
};
export default ProductImageGallery;
