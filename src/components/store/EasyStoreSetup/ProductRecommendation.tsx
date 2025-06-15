
import React from "react";

export interface ProductData {
  id: string;
  name: string;
  images: string[];
  price: number;
  category?: string;
}
interface ProductRecommendationProps {
  products: ProductData[];
  currentProductId: string;
}
const ProductRecommendation: React.FC<ProductRecommendationProps> = ({ products, currentProductId }) => {
  // Simple recommendation logic: show same category, not current product
  const current = products.find(p => p.id === currentProductId);
  const recommended = products.filter(
    p =>
      p.category === current?.category &&
      p.id !== currentProductId
  ).slice(0, 4);

  if (!recommended.length) return null;

  return (
    <div className="bg-blue-50 p-4 rounded my-3">
      <div className="font-bold text-sm mb-2">এমন আরও পণ্য</div>
      <div className="flex gap-3">
        {recommended.map(p => (
          <div key={p.id} className="flex flex-col items-center">
            <img src={p.images[0]} alt={p.name} className="h-12 w-12 object-cover rounded mb-1" />
            <div className="text-xs text-center">{p.name}</div>
            <div className="text-xs text-primary font-bold">৳{p.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductRecommendation;
