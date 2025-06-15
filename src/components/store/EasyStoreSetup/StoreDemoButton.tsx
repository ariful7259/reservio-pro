
import React from "react";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StoreDemoButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <button
      className="inline-flex items-center bg-primary text-white px-4 py-2 rounded-full font-bold shadow hover:bg-primary/90 transition"
      aria-label="See Store Demo"
      onClick={() => navigate('/store-demo')}
    >
      <Eye className="mr-2 w-5 h-5" aria-hidden="true" />
      ডেমো স্টোর দেখুন
    </button>
  );
};
export default StoreDemoButton;
