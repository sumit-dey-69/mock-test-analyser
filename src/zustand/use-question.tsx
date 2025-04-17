// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import patternPerSection from "../utils/pattern";
// import createSessionStorage from "../utils/session-storage";

// export type Performances = "correct" | "wrong" | "unattempted";
// export type Subjects = keyof typeof patternPerSection;

// type Remark = "out-of-box" | "unknown" | "not-confident" | null;

// type Question = {
//   number: number;
//   performance: Performances;
//   subject: Subjects;
//   remark: Remark;
// };

// type QuestionStore = {
//   questions: Question[];
//   setQuestionStatus: (arg: {
//     number: number;
//     performance: Performances;
//     subject: Subjects;
//     remark: Remark;
//   }) => void;
//   resetQuestions: () => void;
//   getCorrectCount: () => number;
// };

// const subjectRanges: Array<[number, number, Subjects]> = [
//   [0, 49, "mathematics"],
//   [50, 89, "logicalReasoning"],
//   [90, 109, "computerScience"],
//   [110, 119, "generalEnglish"],
// ];

// const defaultQuestionsData: Question[] = Array.from({ length: 120 }, (_, index) => {
//   for (const [start, end, subject] of subjectRanges) {
//     if (index >= start && index <= end) {
//       return {
//         number: index - start + 1,
//         performance: "unattempted",
//         subject,
//         remark: null,
//       };
//     }
//   }
//   throw new Error(`Index ${index} out of subject ranges`);
// });

// const useQuestion = create<QuestionStore>()(
//   persist(
//     (set, get) => ({
//       questions: defaultQuestionsData,
//       setQuestionStatus: (arg) => {
//         set((state) => ({
//           questions: state.questions.map((q) =>
//             q.number === arg.number && q.subject === arg.subject
//               ? { ...q, ...arg }
//               : q
//           ),
//         }));
//       },
//       resetQuestions: () => set({ questions: defaultQuestionsData }),
//       getCorrectCount: () =>
//         get().questions.filter((q) => q.performance === "correct").length,
//     }),
//     {
//       name: "question",
//       storage: createSessionStorage,
//     }
//   )
// );

// export default useQuestion;

// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import patternPerSection from "../utils/pattern";
// import createSessionStorage from "../utils/session-storage";

// export type Performances = "correct" | "wrong" | "unattempted";
// export type Subjects = keyof typeof patternPerSection;

// type Remark = "out-of-box" | "unknown" | "not-confident" | null;

// type Question = {
//   number: number;
//   performance: Performances;
//   subject: Subjects;
//   remark: Remark;
//   timeSpent: number;  // Added timeSpent field
// };

// type QuestionStore = {
//   questions: Question[];
//   setQuestionStatus: (arg: {
//     number: number;
//     performance: Performances;
//     subject: Subjects;
//     remark: Remark;
//   }) => void;
//   setTimeSpent: (arg: { number: number; time: number; subject: Subjects }) => void;  // Added setTimeSpent method
//   resetQuestions: () => void;
//   getCorrectCount: () => number;
// };

// const subjectRanges: Array<[number, number, Subjects]> = [
//   [0, 49, "mathematics"],
//   [50, 89, "logicalReasoning"],
//   [90, 109, "computerScience"],
//   [110, 119, "generalEnglish"],
// ];

// const defaultQuestionsData: Question[] = Array.from({ length: 120 }, (_, index) => {
//   for (const [start, end, subject] of subjectRanges) {
//     if (index >= start && index <= end) {
//       return {
//         number: index - start + 1,
//         performance: "unattempted",
//         subject,
//         remark: null,
//         timeSpent: 0,
//       };
//     }
//   }
//   throw new Error(`Index ${index} out of subject ranges`);
// });

// const useQuestion = create<QuestionStore>()(
//   persist(
//     (set, get) => ({
//       questions: defaultQuestionsData,
//       setQuestionStatus: (arg) => {
//         set((state) => ({
//           questions: state.questions.map((q) =>
//             q.number === arg.number && q.subject === arg.subject
//               ? { ...q, ...arg }
//               : q
//           ),
//         }));
//       },
//       setTimeSpent: ({ number, time, subject }) => {
//         set((state) => ({
//           questions: state.questions.map((q) =>
//             q.number === number && q.subject === subject
//               ? { ...q, timeSpent: time }
//               : q
//           ),
//         }));
//       },
//       resetQuestions: () => set({ questions: defaultQuestionsData }),
//       getCorrectCount: () =>
//         get().questions.filter((q) => q.performance === "correct").length,
//     }),
//     {
//       name: "question",
//       storage: createSessionStorage,
//     }
//   )
// );

// export default useQuestion;

// zustand/use-question.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import patternPerSection from "../utils/pattern";
import createSessionStorage from "../utils/session-storage";

export type Performances = "correct" | "wrong" | "unattempted";
export type Subjects = keyof typeof patternPerSection;
export type Remark = "out-of-box" | "unknown" | "not-confident" | null;

export type Question = {
  number: number;
  performance: Performances;
  subject: Subjects;
  remark: Remark;
  timeSpent: number; // time in minutes (or any unit you prefer)
};

export type QuestionStore = {
  questions: Question[];
  setQuestionStatus: (arg: {
    number: number;
    performance: Performances;
    subject: Subjects;
    remark: Remark;
  }) => void;
  setTimeSpent: (arg: { number: number; time: number; subject: Subjects }) => void;
  resetQuestions: () => void;
  getCorrectCount: () => number;
};

// Define subject ranges so each question's subject is predetermined
const subjectRanges: Array<[number, number, Subjects]> = [
  [0, 49, "mathematics"],
  [50, 89, "logicalReasoning"],
  [90, 109, "computerScience"],
  [110, 119, "generalEnglish"],
];

// Initialize default questions data for 120 questions
const defaultQuestionsData: Question[] = Array.from({ length: 120 }, (_, index) => {
  for (const [start, end, subject] of subjectRanges) {
    if (index >= start && index <= end) {
      return {
        number: index - start + 1,
        performance: "unattempted",
        subject,
        remark: null,
        timeSpent: 0,
      };
    }
  }
  throw new Error(`Index ${index} out of subject ranges`);
});

const useQuestion = create<QuestionStore>()(
  persist(
    (set, get) => ({
      questions: defaultQuestionsData,
      setQuestionStatus: (arg) => {
        set((state) => ({
          questions: state.questions.map((q) =>
            q.number === arg.number && q.subject === arg.subject
              ? { ...q, ...arg }
              : q
          ),
        }));
      },
      setTimeSpent: ({ number, time, subject }) => {
        set((state) => ({
          questions: state.questions.map((q) =>
            q.number === number && q.subject === subject
              ? { ...q, timeSpent: time }
              : q
          ),
        }));
      },
      resetQuestions: () => set({ questions: defaultQuestionsData }),
      getCorrectCount: () =>
        get().questions.filter((q) => q.performance === "correct").length,
    }),
    {
      name: "question",
      storage: createSessionStorage,
    }
  )
);

export default useQuestion;
