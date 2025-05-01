import { prisma } from "@/lib/prisma";
import { formatTime } from "@/utils/function";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get("section") || "all";
  const testCode = searchParams.get("testCode") || "all";

  try {
    if (testCode !== "all") {
      const test = await prisma.test.findUnique({
        where: { name: testCode },
        select: {
          sections: {
            select: {
              name: true,
              order: true,
              questions: {
                select: {
                  id: true,
                  order: true,
                  timeTaken: true,
                  isAttempted: true,
                  isCorrect: true,
                  section: {
                    select: { name: true },
                  },
                },
                orderBy: { order: "asc" },
              },
            },
          },
        },
      });

      if (!test) {
        return NextResponse.json({ error: "Test not found" }, { status: 404 });
      }

      const questions = test.sections.flatMap((sectionObj) => {
        return sectionObj.questions
          .filter((q) => section === "all" || q.section.name === section)
          .map((q) => ({
            name: `${q.isAttempted ? (q.isCorrect ? "🟢" : "🔴") : "⚪️"} Q${q.order}`,
            attemptDuration: formatTime(q.timeTaken),
          }));
      });

      return NextResponse.json({ chartData: questions, sections: [], testCodes: [] });
    }

    const tests = await prisma.test.findMany({
      select: {
        name: true,
        createdAt: true,
        sectionWiseStats: {
          select: {
            name: true,
            attemptDuration: true,
            correctAnswers: true,
            inCorrectAnswers: true
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const chartData = tests.map((test) => {
      const stats = test.sectionWiseStats;
      const point = {
        name: test.name,
        attemptDuration: "",
      };

      if (section === "all") {
        point.attemptDuration = `${Math.floor(
          stats.reduce((sum, s) => sum + s.attemptDuration, 0)
        )}`;
      } else {
        const s = stats.find((s) => s.name === section);
        if (s) {
          point.attemptDuration = s.attemptDuration.toFixed(2);
        }
      }

      return point;
    });

    const sectionSet = new Set<string>();
    const testCodes = tests.map((test) => test.name);

    tests.forEach((test) => {
      test.sectionWiseStats.forEach((stat) => {
        sectionSet.add(stat.name);
      });
    });

    const sections = Array.from(sectionSet);

    return NextResponse.json({ chartData, sections, testCodes });
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return NextResponse.json(
      { error: "Failed to fetch chart data" },
      { status: 500 }
    );
  }
}
