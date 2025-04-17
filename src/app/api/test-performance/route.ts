import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const subjectFilter = searchParams.get("subject");
    const performanceFilter = searchParams.get("performance");

    const subjects = await prisma.subject.findMany({
      select: {
        testCode: true,
        subject: true,
        performance: true,
      },
    });

    const performanceMap: Record<
      string,
      { correct: number; wrong: number; unattempted: number }
    > = {};

    subjects.forEach(({ testCode, subject, performance }) => {
      if (
        (subjectFilter && subjectFilter !== "all" && subject !== subjectFilter) ||
        (performanceFilter && performanceFilter !== "all" && performance !== performanceFilter)
      ) {
        return;
      }

      if (!performanceMap[testCode]) {
        performanceMap[testCode] = {
          correct: 0,
          wrong: 0,
          unattempted: 0,
        };
      }

      if (performance === "correct") {
        performanceMap[testCode].correct += 1;
      } else if (performance === "wrong") {
        performanceMap[testCode].wrong += 1;
      } else if (performance === "unattempted") {
        performanceMap[testCode].unattempted += 1;
      }
    });

    const chartData = Object.entries(performanceMap).map(([testCode, counts]) => ({
      testCode,
      ...counts,
    }));

    return NextResponse.json(chartData);
  } catch (error) {
    console.error("Error fetching test performance data:", error);
    return NextResponse.json({ error: "Failed to load performance data" }, { status: 500 });
  }
}
