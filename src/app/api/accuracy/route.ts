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
            accuracy: true,
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
        const count = stats.length || 1;
        point.accuracy = +(
          stats.reduce((sum, s) => sum + s.accuracy, 0) / count
        ).toFixed(2);
      } else {
        const s = stats.find((s) => s.name === section);
        if (s) {
          point.accuracy = s.accuracy;
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
