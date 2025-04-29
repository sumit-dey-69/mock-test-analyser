import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const testCode = new URL(req.url).searchParams.get("testCode");
  if (!testCode) {
    return NextResponse.json({ error: "Missing testCode" }, { status: 400 });
  }

  const sections = await prisma.section.findMany({
    where: { testId: testCode },
    include: { 
      questions: {
        include: {
          questionReasons: {
            include: {
              reason: true
            }
          }
        }
      }
    },
    orderBy: { order: "asc" },
  });

  const totalQuestions: Record<string, number> = {};
  sections.forEach((s) => {
    totalQuestions[s.name] = s.questions.length;
  });

  const performanceStatus: Record<string, Record<number, "correct" | "wrong" | "unattempted">> = {};
  sections.forEach((s) => {
    performanceStatus[s.name] = {};
    s.questions.forEach((q) => {
      performanceStatus[s.name][q.order] = q.isAttempted
        ? (q.isCorrect ? "correct" : "wrong")
        : "unattempted";
    });
  });

  const timeSpent: Record<string, Record<number, number>> = {};
  sections.forEach((s) => {
    timeSpent[s.name] = {};
    s.questions.forEach((q) => {
      timeSpent[s.name][q.order] = q.timeTaken;
    });
  });

  const questions: Record<string, unknown[]> = {};
  sections.forEach((s) => {
    questions[s.name] = s.questions.map((q) => ({
      id: q.id,
      order: q.order,
      isAttempted: q.isAttempted,
      isCorrect: q.isCorrect,
      timeTaken: q.timeTaken,
      marksId: q.marksId,
      reasons: q.questionReasons.map(qr => qr.reason.description)
    }));
  });

  return NextResponse.json({
    totalQuestions,
    sections: sections.map((s) => s.name),
    performanceStatus,
    timeSpent,
    questions,
  });
}