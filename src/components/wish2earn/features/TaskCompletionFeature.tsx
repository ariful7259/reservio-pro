
import React, { useState } from "react";
import { CheckCircle, Clock8 } from "lucide-react";
import { Button } from "@/components/ui/button";

const tasksDemo = [
  { id: 1, title: "ভিডিও শেয়ার করুন", completed: false, time: 1800 },
  { id: 2, title: "বন্ধুকে রেফার করুন", completed: false, time: 7200 },
  { id: 3, title: "লোকেশন Task সম্পন্ন করুন", completed: false, time: 5400 },
];

export const TaskCompletionFeature: React.FC = () => {
  const [tasks, setTasks] = useState(tasksDemo);

  const toggleTask = (id: number) => {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  };

  return (
    <div className="p-3">
      <h2 className="text-lg font-bold text-green-700 mb-2">টাস্ক কমপ্লিশন</h2>
      <ul className="space-y-3">
        {tasks.map(task => (
          <li key={task.id} className="rounded border bg-white p-2 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <CheckCircle className={task.completed ? "text-green-500" : "text-gray-300"} />
              <span className={`text-sm font-medium ${task.completed && "line-through text-gray-400"}`}>{task.title}</span>
              {!task.completed && (
                <span className="text-xs flex items-center gap-1 ml-2 text-gray-500">
                  <Clock8 className="w-3 h-3" />{Math.floor(task.time/60)} মিনিট
                </span>
              )}
            </div>
            <Button size="sm" className="mt-1 w-fit" onClick={() => toggleTask(task.id)}>
              {task.completed ? "আবার করুন" : "Complete"}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
