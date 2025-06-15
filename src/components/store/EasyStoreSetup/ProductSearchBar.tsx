
import React from "react";

interface ProductSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const ProductSearchBar: React.FC<ProductSearchBarProps> = ({
  value,
  onChange,
  placeholder = "পণ্য/টেমপ্লেট সার্চ করুন…",
}) => (
  <input
    type="search"
    className="w-full px-4 py-2 border rounded-lg focus:outline-primary text-base mb-3"
    aria-label="Search products or templates"
    placeholder={placeholder}
    value={value}
    onChange={e => onChange(e.target.value)}
  />
);

export default ProductSearchBar;
