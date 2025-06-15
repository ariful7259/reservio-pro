
import React from "react";
import { Progress } from "@/components/ui/progress";

export type OrderStatus = "pending" | "confirmed" | "shipped" | "completed" | "cancelled";

interface OrderTrackingSectionProps {
  status: OrderStatus;
  timeline?: { status: OrderStatus; time: string }[];
}

const statusSteps: {status: OrderStatus; label: string}[] = [
  { status: "pending", label: "অর্ডার গৃহীত" },
  { status: "confirmed", label: "কনফার্ম" },
  { status: "shipped", label: "শিপড" },
  { status: "completed", label: "সম্পন্ন" },
];
function stepIndex(status: OrderStatus) {
  return statusSteps.findIndex(s => s.status === status);
}
const OrderTrackingSection: React.FC<OrderTrackingSectionProps> = ({ status, timeline }) => {
  const currentStep = stepIndex(status);
  return (
    <div className="my-4">
      <div className="flex items-center justify-between mb-2 text-xs">
        {statusSteps.map((step, idx) => (
          <div key={step.status} className={`font-bold ${currentStep >= idx ? "text-green-700" : "text-gray-400"}`}>{step.label}</div>
        ))}
      </div>
      <Progress value={((currentStep + 1) / statusSteps.length) * 100} className="h-2" />
      {timeline && (
        <div className="mt-2 space-y-1">
          {timeline.map(t => (
            <div key={t.time} className="text-xs text-muted-foreground">
              {statusSteps.find(s=>s.status===t.status)?.label} - {t.time}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderTrackingSection;
