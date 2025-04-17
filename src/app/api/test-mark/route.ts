import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const subject = searchParams.get("subject");

  const markingScheme: Record<string, { correct: number; wrong: number }> = {
    mathematics: { correct: 12, wrong: -3 },
    logicalReasoning: { correct: 6, wrong: -1.5 },
    computerScience: { correct: 6, wrong: -1.5 },
    generalEnglish: { correct: 4, wrong: -1 },
  };

  try {
    const data = await prisma.subject.findMany({
      where: subject && subject !== "All" ? { subject } : {},
      select: {
        testCode: true,
        subject: true,
        performance: true,
      },
    });

    const marksMap: Record<string, number> = {};

    for (const { testCode, subject, performance } of data) {
      const scheme = markingScheme[subject];
      if (!scheme) continue;

      if (!marksMap[testCode]) marksMap[testCode] = 0;
      marksMap[testCode] += performance === "correct" ? scheme.correct : scheme.wrong;
    }

    const chartData = Object.entries(marksMap).map(([testCode, marks]) => ({
      testCode,
      marks,
    }));

    return NextResponse.json(chartData);
  } catch (error) {
    console.error("Error calculating test marks:", error);
    return NextResponse.json(
      { error: "Failed to calculate test marks" },
      { status: 500 }
    );
  }
}
