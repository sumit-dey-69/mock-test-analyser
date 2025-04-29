import { ParsedTestData, RawDataSchema } from "@/schema/mock-test-schema";
import { cleanSubjectName } from "./clean-subject-name";
import { extractNumber, formatTime } from "./function";

export function parseTestData(rawData: unknown): ParsedTestData {
  const parsed = RawDataSchema.parse(rawData);

  return {
    ...parsed,
    test: {
      ...parsed.test,
      name: extractNumber(parsed.test.name),
    },
    sections: parsed.sections.map((section) => ({
      ...section,
      name: cleanSubjectName(section.name),
      numberOfQuestions: section.questions.length,
      sectionDuration: formatTime(section.sectionDuration),
      questions: section.questions.map(question => ({
        ...question,
        reasons: question.reasons || []
      }))
    })),
    sectionWiseStats: parsed.sectionWiseStats.map((stat) => ({
      ...stat,
      attemptDuration: formatTime(stat.attemptDuration),
      name: cleanSubjectName(stat.name),
    })),
  };
}
