"use client";
import TestAccuracy from "@/components/analytics/accuracy";
import TestMarks from "@/components/analytics/marks";
import TestPerformance from "@/components/analytics/performance";
import TestTimeSpent from "@/components/analytics/time-spent";
import useDashboardToggle, { OptionName } from "@/zustand/use-dashboard-state";
import {
  ArrowLeft,
  BarChart2,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const toggleOptions: {
  name: OptionName;
  icon: ReactNode;
  component: ReactNode;
}[] = [
  {
    name: "Marks",
    icon: <BarChart2 className="w-5 h-5" />,
    component: <TestMarks />,
  },
  {
    name: "Performance",
    icon: <TrendingUp className="w-5 h-5" />,
    component: <TestPerformance />,
  },
  {
    name: "Accuracy",
    icon: <CheckCircle2 className="w-5 h-5" />,
    component: <TestAccuracy />,
  },
  {
    name: "Time Spent",
    icon: <Clock className="w-5 h-5" />,
    component: <TestTimeSpent />,
  },
];

export default function Analytics() {
  const router = useRouter();
  const { selected, setSelected } = useDashboardToggle();

  return (
    <div className="p-6 bg-zinc-900 min-h-screen space-y-6">
      <button
        onClick={() => router.push("/")}
        className="inline-flex items-center text-blue-400 hover:text-blue-300 cursor-pointer focus:outline-none focus:underline focus:underline-offset-4 transition mb-4"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        <span>Back</span>
      </button>

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
