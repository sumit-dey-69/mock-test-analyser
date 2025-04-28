import createSessionStorage from "@/utils/session-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface InputStore {
  input: string;
  setInput: (input: string) => void;
}

export const useInputStore = create<InputStore>()(
  persist(
    (set) => ({
      input: "",
      setInput: (input: string) => set({ input }),
    }),
    {
      name: "input",
      storage: createSessionStorage,
    }
  )
);
