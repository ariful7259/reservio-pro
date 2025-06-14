
import React from "react";
import Wish2EarnModule from "@/components/wish2earn/Wish2EarnModule";

const Wish2Earn: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pb-16 pt-10 bg-gradient-to-b from-pink-100/50 via-white to-blue-100/20">
      <Wish2EarnModule />
    </div>
  );
};

export default Wish2Earn;
