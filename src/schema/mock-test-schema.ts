import { cleanSubjectName } from "@/utils/clean-subject-name";
import { formatTime } from "@/utils/function";
import { z } from "zod";

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
  reasons: z.array(z.string()).optional(), // Added reasons array
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

// Updated ParsedTestData type to include reasons in questions
export type ParsedTestData = {
  test: z.infer<typeof TestSchema>;
  filters: z.infer<typeof FiltersSchema>;
  sectionWiseStats: z.infer<typeof SectionWiseStatSchema>[];
  sections: (z.infer<typeof SectionSchema> & {
    numberOfQuestions: number;
  })[];
};

// If you need a more explicit type for questions with reasons
export type QuestionWithReasons = z.infer<typeof QuestionSchema>;

// import { cleanSubjectName } from "@/utils/clean-subject-name";
// import { formatTime } from "@/utils/function";
// import { z } from "zod";

// export const MarksSchema = z.object({
//   positive: z.number(),
//   negative: z.number(),
// });

// export const QuestionSchema = z.object({
//   order: z.number(),
//   isAttempted: z.boolean(),
//   isCorrect: z.boolean(),
//   marks: MarksSchema,
//   timeTaken: z.number(),
// });

// export const SectionSchema = z.object({
//   sectionDuration: z.number(),
//   sectionMarks: z.number(),
//   name: z.string(),
//   order: z.number(),
//   questions: z.array(QuestionSchema),
// });

// export const SectionWiseStatSchema = z.object({
//   marksScored: z.number(),
//   sectionMarks: z.number(),
//   accuracy: z.number(),
//   totalQuestions: z.number(),
//   attemptDuration: z.number(),
//   correctAnswers: z.number(),
//   inCorrectAnswers: z.number(),
//   unAttempted: z.number(),
//   name: z.string(),
//   order: z.number(),
//   sectionDuration: z.number(),
// });

// export const FiltersSchema = z.object({
//   incorrect: z.number(),
//   correct: z.number(),
//   unattempted: z.number(),
// });

// export const TestSchema = z.object({
//   name: z.string(),
//   testTotalDuration: z.number(),
// });

// export const RawDataSchema = z.object({
//   test: TestSchema,
//   filters: FiltersSchema,
//   sectionWiseStats: z.array(SectionWiseStatSchema),
//   sections: z.array(SectionSchema),
// });

// export type ParsedTestData = {
//   test: z.infer<typeof TestSchema>;
//   filters: z.infer<typeof FiltersSchema>;
//   sectionWiseStats: z.infer<typeof SectionWiseStatSchema>[];
//   sections: (z.infer<typeof SectionSchema> & {
//     numberOfQuestions: number;
//   })[];
// };