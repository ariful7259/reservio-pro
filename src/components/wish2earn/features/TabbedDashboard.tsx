
import React, { useState } from "react";
import { BarChart2, ListTodo, Layers3, Users } from "lucide-react";
import { DashboardStatsCards } from "./DashboardStatsCards";
import { TaskListSection } from "./TaskListSection";
import { ServiceManageSection } from "./ServiceManageSection";

const tabs = [
  { key: "stats", label: "পরিসংখ্যান", icon: BarChart2 },
  { key: "tasks", label: "সব কাজ", icon: ListTodo },
  { key: "services", label: "আমার সার্ভিস/পণ্য", icon: Layers3 },
];

export const TabbedDashboard: React.FC = () => {
  const [active, setActive] = useState("stats");

  const tabClasses = (selected: boolean) =>
    `flex items-center gap-1 px-4 py-2 rounded-t-lg font-bold text-sm md:text-base transition-all ${
      selected
        ? "bg-white shadow border-b-2 border-pink-400 text-pink-600"
        : "bg-transparent text-gray-500 hover:bg-gray-50"
    }`;

  return (
    <div>
      <div className="flex justify-center gap-2 mb-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={tabClasses(active === tab.key)}
            onClick={() => setActive(tab.key)}
          >
            <tab.icon className="h-5 w-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-md p-2 sm:p-4 min-h-[320px] animate-fade-in">
        {active === "stats" && <DashboardStatsCards />}
        {active === "tasks" && <TaskListSection />}
        {active === "services" && <ServiceManageSection />}
      </div>
    </div>
  );
};
