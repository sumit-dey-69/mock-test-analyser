// import { create } from "zustand";

// export interface Question {
//   id: string;
//   order: number;
//   isAttempted: boolean;
//   isCorrect: boolean;
//   timeTaken: number;
//   marksId?: string;
// }

// export type Performance = "correct" | "wrong" | "unattempted";

// interface Store {
//   performanceStatus: Record<string, Record<number, Performance>>;
//   setPerformanceStatus: (s: Record<string, Record<number, Performance>>) => void;

//   questionLengths: Record<string, number>;
//   setQuestionLengths: (l: Record<string, number>) => void;

//   questions: Record<string, Question[]>;
//   setQuestions: (q: Record<string, Question[]>) => void;

//   timeSpent: Record<string, Record<number, number>>;
//   setTimeSpent: (t: Record<string, Record<number, number>>) => void;

//   currentQuestionNumber: number;
//   setCurrentQuestionNumber: (n: number) => void;

//   currentSection: string;
//   setCurrentSection: (s: string) => void;
// }

// export const useStore = create<Store>((set) => ({
//   performanceStatus: {},
//   setPerformanceStatus: (s) => set({ performanceStatus: s }),

//   questionLengths: {},
//   setQuestionLengths: (l) => set({ questionLengths: l }),

//   questions: {},
//   setQuestions: (q) => set({ questions: q }),

//   timeSpent: {},
//   setTimeSpent: (t) => set({ timeSpent: t }),

//   currentQuestionNumber: 1,
//   setCurrentQuestionNumber: (n) => set({ currentQuestionNumber: n }),

//   currentSection: "",
//   setCurrentSection: (s) => set({ currentSection: s }),
// }));






// import { create } from "zustand";

// export interface Question {
//   id: string;
//   order: number;
//   isAttempted: boolean;
//   isCorrect: boolean;
//   timeTaken: number;
//   marksId?: string;
// }

// export type Performance = "correct" | "wrong" | "unattempted";

// interface Store {
//   performanceStatus: Record<string, Record<number, Performance>>;
//   setPerformanceStatus: (s: Record<string, Record<number, Performance>>) => void;

//   questionLengths: Record<string, number>;
//   setQuestionLengths: (l: Record<string, number>) => void;

//   questions: Record<string, Question[]>;
//   setQuestions: (q: Record<string, Question[]>) => void;

//   timeSpent: Record<string, Record<number, number>>;
//   setTimeSpent: (t: Record<string, Record<number, number>>) => void;

//   currentSection: string;
//   setCurrentSection: (s: string) => void;

//   currentQuestionNumbers: Record<string, number>;
//   setCurrentQuestionNumber: (n: number) => void;

//   getCurrentQuestionNumber: () => number;
// }

// export const useStore = create<Store>((set, get) => ({
//   performanceStatus: {},
//   setPerformanceStatus: (s) => set({ performanceStatus: s }),

//   questionLengths: {},
//   setQuestionLengths: (l) => set({ questionLengths: l }),

//   questions: {},
//   setQuestions: (q) => set({ questions: q }),

//   timeSpent: {},
//   setTimeSpent: (t) => set({ timeSpent: t }),

//   currentSection: "",
//   setCurrentSection: (section) => {
//     const { currentQuestionNumbers } = get();
//     // If this section hasn't been visited yet, set Q1 as default
//     if (!currentQuestionNumbers[section]) {
//       currentQuestionNumbers[section] = 1;
//     }
//     set({
//       currentSection: section,
//       currentQuestionNumbers: { ...currentQuestionNumbers },
//     });
//   },

//   currentQuestionNumbers: {},

//   setCurrentQuestionNumber: (n) => {
//     const section = get().currentSection;
//     const currentQuestionNumbers = {
//       ...get().currentQuestionNumbers,
//       [section]: n,
//     };
//     set({ currentQuestionNumbers });
//   },

//   getCurrentQuestionNumber: () => {
//     const section = get().currentSection;
//     return get().currentQuestionNumbers[section] || 1;
//   },
// }));





import { create } from "zustand";

export interface Question {
  id: string;
  order: number;
  isAttempted: boolean;
  isCorrect: boolean;
  timeTaken: number;
  marksId?: string;
  reasons?: string[]; // Added reasons field
}

export type Performance = "correct" | "wrong" | "unattempted";

interface Store {
  performanceStatus: Record<string, Record<number, Performance>>;
  setPerformanceStatus: (s: Record<string, Record<number, Performance>>) => void;

  questionLengths: Record<string, number>;
  setQuestionLengths: (l: Record<string, number>) => void;

  questions: Record<string, Question[]>;
  setQuestions: (q: Record<string, Question[]>) => void;

  timeSpent: Record<string, Record<number, number>>;
  setTimeSpent: (t: Record<string, Record<number, number>>) => void;

  currentSection: string;
  setCurrentSection: (s: string) => void;

  currentQuestionNumbers: Record<string, number>;
  setCurrentQuestionNumber: (n: number) => void;

  getCurrentQuestionNumber: () => number;
  
  // New function to update reasons for a question
  updateQuestionReasons: (
    sectionName: string, 
    questionId: string, 
    reasons: string[]
  ) => void;
}

export const useStore = create<Store>((set, get) => ({
  performanceStatus: {},
  setPerformanceStatus: (s) => set({ performanceStatus: s }),

  questionLengths: {},
  setQuestionLengths: (l) => set({ questionLengths: l }),

  questions: {},
  setQuestions: (q) => set({ questions: q }),

  timeSpent: {},
  setTimeSpent: (t) => set({ timeSpent: t }),

  currentSection: "",
  setCurrentSection: (section) => {
    const { currentQuestionNumbers } = get();
    // If this section hasn't been visited yet, set Q1 as default
    if (!currentQuestionNumbers[section]) {
      currentQuestionNumbers[section] = 1;
    }
    set({
      currentSection: section,
      currentQuestionNumbers: { ...currentQuestionNumbers },
    });
  },

  currentQuestionNumbers: {},

  setCurrentQuestionNumber: (n) => {
    const section = get().currentSection;
    const currentQuestionNumbers = {
      ...get().currentQuestionNumbers,
      [section]: n,
    };
    set({ currentQuestionNumbers });
  },

  getCurrentQuestionNumber: () => {
    const section = get().currentSection;
    return get().currentQuestionNumbers[section] || 1;
  },

  // Update reasons for a specific question in a section
  updateQuestionReasons: (sectionName, questionId, reasons) => {
    const questions = { ...get().questions };
    
    if (questions[sectionName]) {
      const sectionQuestions = [...questions[sectionName]];
      const questionIndex = sectionQuestions.findIndex(q => q.id === questionId);
      
      if (questionIndex !== -1) {
        sectionQuestions[questionIndex] = {
          ...sectionQuestions[questionIndex],
          reasons
        };
        
        questions[sectionName] = sectionQuestions;
        set({ questions });
      }
    }
  },
}));