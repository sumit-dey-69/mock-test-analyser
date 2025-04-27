import { prisma } from "@/lib/prisma";
import { formatTime } from "@/utils/function";
import { NextRequest, NextResponse } from "next/server";
import { format } from "path";

type ChartDataPoint = {
  name: string;
  attemptDuration: string;
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
            attemptDuration: true,
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
        attemptDuration: "",
      };

      if (section === "all") {
        point.attemptDuration = `${Math.floor(
          stats.reduce((sum, s) => sum + s.attemptDuration, 0)
      )}`
      } else {
        const s = stats.find((s) => s.name === section);
        if (s) {
          point.attemptDuration = s.attemptDuration.toFixed(2);
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
