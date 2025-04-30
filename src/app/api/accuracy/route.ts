import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type ChartDataPoint = {
  name: string;
  accuracy: number;
};

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get("section") || "all";

  try {
    const tests = await prisma.test.findMany({
      select: {
        name: true,
        createdAt: true,
        sectionWiseStats: {
          select: {
            name: true,
            correctAnswers: true,
            inCorrectAnswers: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const chartData: ChartDataPoint[] = tests.map((test) => {
      const stats = test.sectionWiseStats;

      const point: ChartDataPoint = {
        name: test.name,
        accuracy: 0,
      };

      if (section === "all") {
        let totalCorrect = 0;
        let totalAttempted = 0;

        stats.forEach((s) => {
          totalCorrect += s.correctAnswers;
          totalAttempted += s.correctAnswers + s.inCorrectAnswers;
        });

        point.accuracy =
          totalAttempted > 0
            ? +((totalCorrect / totalAttempted) * 100).toFixed(2)
            : 0;
      } else {
        const s = stats.find((s) => s.name === section);
        if (s) {
          const attempted = s.correctAnswers + s.inCorrectAnswers;
          point.accuracy =
            attempted > 0
              ? +((s.correctAnswers / attempted) * 100).toFixed(2)
              : 0;
        }
      }

      return point;
    });

    const sectionSet = new Set<string>();
    tests.forEach((test) => {
      test.sectionWiseStats.forEach((stat) => {
        sectionSet.add(stat.name);
      });
    });

    const sections = Array.from(sectionSet);

    return NextResponse.json({ chartData, sections });
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return NextResponse.json(
      { error: "Failed to fetch chart data" },
      { status: 500 }
    );
  }
}
