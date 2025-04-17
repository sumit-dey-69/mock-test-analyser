"use client";

import useDashboardToggle, { OptionName } from "@/zustand/use-dashboard-state";
import { ReactNode } from "react";
import TestAccuracy from "./test-accuracy";
import TestMarks from "./test-marks";
import TestPerformance from "./test-performance";
import TestTimeSpent from "./test-time-spent";

const toggleOptions: { name: OptionName; component: ReactNode }[] = [
  { name: "Marks", component: <TestMarks /> },
  { name: "Performance", component: <TestPerformance /> },
  { name: "Accuracy", component: <TestAccuracy /> },
  { name: "Time Spent", component: <TestTimeSpent /> },
];

function DashboardDisplay() {
  const { selected, setSelected } = useDashboardToggle();

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Test Dashboard</h2>
      <div className="flex flex-wrap gap-3 my-6">
        {toggleOptions.map((option) => (
          <button
            key={option.name}
            onClick={() => setSelected(option.name)}
            className={`px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer hover:brightness-90 transition-all
              ${
                selected === option.name
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
          >
            {option.name}
          </button>
        ))}
      </div>

      <div>
        {toggleOptions.find((option) => option.name === selected)?.component}
      </div>
    </div>
  );
}

export default DashboardDisplay;
