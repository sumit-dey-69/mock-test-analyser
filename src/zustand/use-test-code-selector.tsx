import { create } from "zustand";

interface TestCodeStore {
  selectedTestCode: string;
  setSelectedTestCode: (testCode: string) => void;
}

export const useTestCodeStore = create<TestCodeStore>((set) => ({
  selectedTestCode: "",
  setSelectedTestCode: (testCode) => set({ selectedTestCode: testCode }),
}));
