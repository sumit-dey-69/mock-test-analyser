// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import createSessionStorage from "../utils/session-storage";

// interface TimeSpentState {
//   timeSpent: string;
//   setTimeSpent: (time: string) => void;
//   resetTimeSpent: () => void;
// }

// const useTimeSpent = create<TimeSpentState>()(
//   persist(
//     (set) => ({
//       timeSpent: "",
//       setTimeSpent: (time: string) => set({ timeSpent: time }),
//       resetTimeSpent: () => set({ timeSpent: "" }),
//     }),
//     {
//       name: "time-spent",
//       storage: createSessionStorage,
//     },
//   ),
// );

// export default useTimeSpent;


import { create } from "zustand";
import { persist } from "zustand/middleware";
import createSessionStorage from "../utils/session-storage";

interface QuestionTime {
  questionNumber: number;
  subject: string;
  timeSpent: string; // Time spent for the specific question
}

interface TimeSpentState {
  times: QuestionTime[]; // Array of time records for each question
  setTimeSpent: (questionNumber: number, subject: string, time: string) => void; // Method to set time for a specific question
  resetTimeSpent: () => void; // Reset all time records
}

const useTimeSpent = create<TimeSpentState>()(
  persist(
    (set) => ({
      times: [],
      setTimeSpent: (questionNumber: number, subject: string, time: string) =>
        set((state) => {
          const updatedTimes = state.times.filter(
            (entry) => entry.questionNumber !== questionNumber || entry.subject !== subject
          );
          updatedTimes.push({ questionNumber, subject, timeSpent: time });
          return { times: updatedTimes };
        }),
      resetTimeSpent: () => set({ times: [] }),
    }),
    {
      name: "time-spent",
      storage: createSessionStorage,
    }
  )
);

export default useTimeSpent;
