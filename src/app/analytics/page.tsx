"use client";
import TestAccuracy from "@/components/analytics/accuracy";
import TestMarks from "@/components/analytics/marks";
import TestPerformance from "@/components/analytics/performance";
import TestTimeSpent from "@/components/analytics/time-spent";
import BackButton from "@/components/global/back-button";
import useDashboardToggle, { OptionName } from "@/zustand/use-dashboard-state";
import { BarChart2, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { ReactNode } from "react";

const toggleOptions: {
  name: OptionName;
  icon: ReactNode;
  component: ReactNode;
}[] = [
  {
    name: "Marks",
    icon: <BarChart2 className="size-5" />,
    component: <TestMarks />,
  },
  {
    name: "Performance",
    icon: <TrendingUp className="size-5" />,
    component: <TestPerformance />,
  },
  {
    name: "Accuracy",
    icon: <CheckCircle2 className="size-5" />,
    component: <TestAccuracy />,
  },
  {
    name: "Time Spent",
    icon: <Clock className="size-5" />,
    component: <TestTimeSpent />,
  },
];

export default function Analytics() {
  const { selected, setSelected } = useDashboardToggle();

  return (
    <div className="p-6 bg-zinc-900 min-h-screen space-y-6">
      <BackButton />

      <h2 className="text-3xl font-bold text-center text-zinc-100">
        Tests Analytics
      </h2>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {toggleOptions.map((option) => {
          const isActive = selected === option.name;
          return (
            <button
              key={option.name}
              onClick={() => setSelected(option.name)}
              className={`w-36 h-12 hover:brightness-125 flex cursor-pointer items-center justify-center gap-2 rounded-lg text-sm font-medium transition focus:outline-none focus:ring-2 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md focus:ring-blue-400"
                  : "bg-zinc-700 text-zinc-200 focus:ring-blue-500"
              }`}
            >
              {option.icon}
              <span className="">{option.name}</span>
            </button>
          );
        })}
      </div>

      {toggleOptions.find((option) => option.name === selected)?.component}
    </div>
  );
}
