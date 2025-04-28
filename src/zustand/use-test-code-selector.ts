import createSessionStorage from "@/utils/session-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  selectedTestCode: string;
  setSelectedTestCode: (code: string) => void;
};

export const useTestCodeStore = create<State>()(
  persist(
    (set) => ({
      selectedTestCode: "",
      setSelectedTestCode: (code: string) => set({ selectedTestCode: code }),
    }),
    {
      name: "testCodeSelector",
      storage: createSessionStorage,
    }
  )
);
