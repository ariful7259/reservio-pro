
import React from "react";
import { BarChart2 } from "lucide-react";

// Demo EarnMeter
const EarnMeter: React.FC = () => (
  <div className="w-full py-2 flex flex-col items-center">
    <div className="w-full max-w-xs h-4 bg-gradient-to-r from-green-300 via-yellow-200 to-pink-200 rounded-full overflow-hidden shadow-inner mb-2 relative">
      <div className="h-full bg-green-400 rounded-full transition-all" style={{ width: "60%" }}/>
      <span className="absolute right-3 top-0 text-xs font-bold text-green-800">৳ ৩০০ / ৫০০</span>
    </div>
    <span className="text-xs text-gray-700">আপনার আয়: <span className="font-semibold text-green-700">৳৩০০</span></span>
    <span className="text-[11px] text-gray-500">লক্ষ্য: ৳৫০০</span>
  </div>
);

// Demo Countdown Timer
const CountdownTimer: React.FC<{ seconds?: number }> = ({ seconds = 1470 }) => {
  const [time, setTime] = React.useState(seconds);
  React.useEffect(() => {
    const timer = setInterval(() => setTime((t) => t > 0 ? t-1 : 0), 1000);
    return () => clearInterval(timer);
  }, []);
  const h = Math.floor(time/3600), m = Math.floor((time%3600)/60), s = time%60;
  return (
    <div className="px-3 py-1 text-xs rounded bg-gradient-to-r from-pink-100 to-sky-50 text-gray-700 font-mono my-1">
      পরবর্তী টাস্ক রিসেট: {h}:{m.toString().padStart(2,"0")}:{s.toString().padStart(2,"0")}
    </div>
  );
};

export const EarnMeterCountdownFeature: React.FC = () => (
  <div className="p-3">
    <h2 className="text-lg font-bold text-indigo-700 mb-3 flex gap-1 items-center"><BarChart2 className="h-5 w-5" />Earn Meter & Countdown</h2>
    <EarnMeter />
    <CountdownTimer />
  </div>
);

