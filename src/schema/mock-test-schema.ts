import { z } from "zod";

export const OptionSchema = z.object({
  isCorrect: z.boolean(),
  isMarked: z.boolean(),
});

export const MarksSchema = z.object({
  positive: z.number(),
  negative: z.number(),
});

export const QuestionSchema = z.object({
  order: z.number(),
  isAttempted: z.boolean(),
  isCorrect: z.boolean(),
  marks: MarksSchema,
  timeTaken: z.number(),
});

export const SectionSchema = z.object({
  sectionDuration: z.number(),
  sectionMarks: z.number(),
  name: z.string(),
  order: z.number(),
  questions: z.array(QuestionSchema),
});

export const SectionWiseStatSchema = z.object({
  marksScored: z.number(),
  sectionMarks: z.number(),
  accuracy: z.number(),
  totalQuestions: z.number(),
  attemptDuration: z.number(),
  correctAnswers: z.number(),
  inCorrectAnswers: z.number(),
  unAttempted: z.number(),
  name: z.string(),
  order: z.number(),
  sectionDuration: z.number(),
});

export const FiltersSchema = z.object({
  incorrect: z.number(),
  correct: z.number(),
  unattempted: z.number(),
});

export const TestSchema = z.object({
  name: z.string(),
  testTotalDuration: z.number(),
});

export const RawDataSchema = z.object({
  test: TestSchema,
  filters: FiltersSchema,
  sectionWiseStats: z.array(SectionWiseStatSchema),
  sections: z.array(SectionSchema),
});

export type ParsedTestData = {
  test: {
    name: string;
    testTotalDuration: number;
  };
  filters: z.infer<typeof FiltersSchema>;
  sectionWiseStats: z.infer<typeof SectionWiseStatSchema>[];
  sections: {
    sectionDuration: number;
    sectionMarks: number;
    name: string;
    order: number;
    numberOfQuestions: number;
    questions: {
      order: number;
      isAttempted: boolean;
      isCorrect: boolean;
      marks: {
        positive: number;
        negative: number;
      };
      timeTaken: number;
    }[];
  }[];
};

export function parseTestData(rawData: unknown): ParsedTestData {
  const parsed = RawDataSchema.parse(rawData);

  return {
    test: {
      name: parsed.test.name,
      testTotalDuration: parsed.test.testTotalDuration,
    },
    filters: parsed.filters,
    sectionWiseStats: parsed.sectionWiseStats.map((stat) => ({
      marksScored: stat.marksScored,
      sectionMarks: stat.sectionMarks,
      accuracy: stat.accuracy,
      totalQuestions: stat.totalQuestions,
      attemptDuration: stat.attemptDuration,
      correctAnswers: stat.correctAnswers,
      inCorrectAnswers: stat.inCorrectAnswers,
      unAttempted: stat.unAttempted,
      name: stat.name,
      order: stat.order,
      sectionDuration: stat.sectionDuration,
    })),
    sections: parsed.sections.map((section) => ({
      sectionDuration: section.sectionDuration,
      sectionMarks: section.sectionMarks,
      name: section.name,
      order: section.order,
      numberOfQuestions: section.questions.length,
      questions: section.questions.map((question) => ({
        order: question.order,
        isAttempted: question.isAttempted,
        isCorrect: question.isCorrect,
        marks: question.marks,
        timeTaken: question.timeTaken,
      })),
    })),
  };
}
