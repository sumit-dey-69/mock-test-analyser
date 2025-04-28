import { create } from "zustand";

type State = {
  selectedTestCode: string;
  setSelectedTestCode: (code: string) => void;
};

export const useTestCodeStore = create<State>((set) => ({
  selectedTestCode: "",
  setSelectedTestCode: (code: string) => set({ selectedTestCode: code }),
}));
