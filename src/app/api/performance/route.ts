import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type ChartDataPoint = {
  name: string;
  correctAnswers: number;
  inCorrectAnswers: number;
  unAttempted: number;
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
            unAttempted: true,
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
        correctAnswers: 0,
        inCorrectAnswers: 0,
        unAttempted: 0,
      };

      if (section === "all") {
        const count = stats.length || 1;
        point.correctAnswers = +(
          stats.reduce((sum, s) => sum + s.correctAnswers, 0) / count
        ).toFixed(2);
        point.inCorrectAnswers = +(
          stats.reduce((sum, s) => sum + s.inCorrectAnswers, 0) / count
        ).toFixed(2);
        point.unAttempted = +(
          stats.reduce((sum, s) => sum + s.unAttempted, 0) / count
        ).toFixed(2);
      } else {
        const s = stats.find((s) => s.name === section);
        if (s) {
          point.correctAnswers = s.correctAnswers;
          point.inCorrectAnswers = s.inCorrectAnswers;
          point.unAttempted = s.unAttempted;
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
