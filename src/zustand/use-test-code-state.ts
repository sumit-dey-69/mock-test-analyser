import { create } from 'zustand'

type TestCodeStore = {
  testCodes: string[]
  setTestCodes: (codes: string[]) => void
  addTestCode: (code: string) => void
  removeTestCode: (code: string) => void
}

export const useTestCode = create<TestCodeStore>((set) => ({
  testCodes: [],

  setTestCodes: (codes) => set({ testCodes: codes }),

  addTestCode: (code) =>
    set((state) => ({
      testCodes: [...state.testCodes, code],
    })),

  removeTestCode: (code) =>
    set((state) => ({
      testCodes: state.testCodes.filter((c) => c !== code),
    })),
}))
