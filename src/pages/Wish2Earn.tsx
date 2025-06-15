
import React from "react";
import Wish2EarnModule from "@/components/wish2earn/Wish2EarnModule";

const Wish2Earn: React.FC = () => {
  // প্রকৃত fullscreen + পড়ে থাকা কোনো কিছু দেখা যাবে না
  return (
    <div className="fixed inset-0 z-[9999] w-full min-h-screen h-screen bg-white bg-gradient-to-b from-pink-100/50 via-white to-blue-100/20 overflow-hidden">
      <Wish2EarnModule />
    </div>
  );
};

export default Wish2Earn;
