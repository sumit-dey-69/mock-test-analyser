import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export type TestResult = {
  testCode: string;
  overall: number;
  [subject: string]: number | string;
};

export async function GET(req: Request) {
  try {
    const questions = await prisma.subject.findMany({
      select: {
        testCode: true,
        subject: true,
        performance: true,
      },
    });

    const testSubjectStats: Record<
      string,
      Record<string, { correct: number; attempted: number }>
    > = {};
    const overallStats: Record<string, { correct: number; attempted: number }> =
      {};

    for (const { testCode, subject, performance } of questions) {
      if (!testSubjectStats[testCode]) {
        testSubjectStats[testCode] = {};
        overallStats[testCode] = { correct: 0, attempted: 0 };
      }
      if (!testSubjectStats[testCode][subject]) {
        testSubjectStats[testCode][subject] = { correct: 0, attempted: 0 };
      }

      if (performance === "correct") {
        testSubjectStats[testCode][subject].correct++;
        testSubjectStats[testCode][subject].attempted++;
        overallStats[testCode].correct++;
        overallStats[testCode].attempted++;
      } else if (performance === "wrong") {
        testSubjectStats[testCode][subject].attempted++;
        overallStats[testCode].attempted++;
      }
    }

    const result: TestResult[] = [];
    for (const testCode in testSubjectStats) {
      const entry: TestResult = { testCode, overall: 0 };

      for (const subject in testSubjectStats[testCode]) {
        const { correct, attempted } = testSubjectStats[testCode][subject];
        const accuracy =
          attempted > 0
            ? parseFloat(((correct / attempted) * 100).toFixed(2))
            : 0;
        entry[subject] = accuracy;
      }

      const { correct, attempted } = overallStats[testCode];
      entry.overall =
        attempted > 0
          ? parseFloat(((correct / attempted) * 100).toFixed(2))
          : 0;

      result.push(entry);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error generating subject-wise test accuracy:", error);
    return NextResponse.json(
      { error: "Failed to generate subject-wise test accuracy" },
      { status: 500 }
    );
  }
}
