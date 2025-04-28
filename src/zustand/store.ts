import { create } from "zustand";

export interface Question {
  id: string;
  order: number;
  isAttempted: boolean;
  isCorrect: boolean;
  timeTaken: number;
  marksId?: string;
  reasons?: string[];
}

export type Performance = "correct" | "wrong" | "unattempted";

interface Store {
  performanceStatus: Record<string, Record<number, Performance>>;
  setPerformanceStatus: (
    s: Record<string, Record<number, Performance>>
  ) => void;

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

  updateQuestionReasons: (sectionName, questionId, reasons) => {
    const questions = { ...get().questions };

    if (questions[sectionName]) {
      const sectionQuestions = [...questions[sectionName]];
      const questionIndex = sectionQuestions.findIndex(
        (q) => q.id === questionId
      );

      if (questionIndex !== -1) {
        sectionQuestions[questionIndex] = {
          ...sectionQuestions[questionIndex],
          reasons,
        };

        questions[sectionName] = sectionQuestions;
        set({ questions });
      }
    }
  },
}));
