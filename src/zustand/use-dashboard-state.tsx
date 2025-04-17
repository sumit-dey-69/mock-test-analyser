import createSessionStorage from "@/utils/session-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type OptionName =
  | "Marks"
  | "Performance"
  | "Accuracy"
  | "Accuracy"
  | "Time Spent";

interface DashboardToggleState {
  selected: OptionName;
  setSelected: (option: OptionName) => void;
}

const useDashboardToggle = create<DashboardToggleState>()(
  persist(
    (set) => ({
      selected: "Marks",
      setSelected: (option) => set({ selected: option }),
    }),
    {
      name: "dashboardToggle",
      storage: createSessionStorage,
    }
  )
);

export default useDashboardToggle;
