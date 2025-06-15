
import React, { useState } from "react";
import { Heart } from "lucide-react";

interface WishlistButtonProps {
  wished: boolean;
  onToggle: () => void;
}
const WishlistButton: React.FC<WishlistButtonProps> = ({wished, onToggle}) => {
  return (
    <button
      aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
      className={`p-1 rounded-full border ${wished ? "bg-pink-200 text-pink-600" : "bg-white text-gray-400"} transition`}
      onClick={onToggle}
      type="button"
    >
      <Heart fill={wished ? "#f472b6" : "none"} />
    </button>
  );
};
export default WishlistButton;
