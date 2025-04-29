import { prisma } from "@/lib/prisma";
import { RawDataSchema } from "@/schema/mock-test-schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = RawDataSchema.parse(body);

    const { test, filters, sectionWiseStats, sections } = parsed;

    const createdTest = await prisma.test.create({
      data: {
        name: test.name,
        testTotalDuration: test.testTotalDuration,
        filters: {
          create: {
            incorrect: filters.incorrect,
            correct: filters.correct,
            unattempted: filters.unattempted,
          },
        },
        sectionWiseStats: {
          create: sectionWiseStats.map((stat) => ({
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
        },
        sections: {
          create: sections.map((section) => ({
            name: section.name,
            order: section.order,
            sectionDuration: section.sectionDuration,
            sectionMarks: section.sectionMarks,
            questions: {
              create: section.questions.map((question) => ({
                order: question.order,
                isAttempted: question.isAttempted,
                isCorrect: question.isCorrect,
                timeTaken: question.timeTaken,
                marks: {
                  create: {
                    positive: question.marks.positive,
                    negative: question.marks.negative,
                  },
                },
              })),
            },
          })),
        },
      },
      include: {
        filters: true,
        sectionWiseStats: true,
        sections: {
          include: {
            questions: {
              include: {
                marks: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({ success: true, testId: createdTest.name });
  } catch (error: any) {
    console.error("❌ API Error:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
