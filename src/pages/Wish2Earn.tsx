
import React from "react";
import Wish2EarnModule from "@/components/wish2earn/Wish2EarnModule";

const Wish2Earn: React.FC = () => {
  // প্রকৃত fullscreen: fixed inset-0, proper z-index, ও সঠিক background
  return (
    <div className="fixed inset-0 z-50 w-full min-h-screen bg-gradient-to-b from-pink-100/50 via-white to-blue-100/20">
      <Wish2EarnModule />
    </div>
  );
};

export default Wish2Earn;
