import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface TestSpent {
  testCode: string;
  [subject: string]: number | string;
}

export async function GET(req: Request) {
  try {
    const data = await prisma.subject.findMany({
      select: {
        testCode: true,
        subject: true,
        time_spent: true,
      },
    });

    const spentMap: {
      [testCode: string]: { [subject: string]: number };
    } = {};

    for (const entry of data) {
      const { testCode, subject, time_spent } = entry;
      const time = parseFloat(time_spent) || 0;

      if (!spentMap[testCode]) {
        spentMap[testCode] = {};
      }
      if (!spentMap[testCode][subject]) {
        spentMap[testCode][subject] = 0;
      }

      spentMap[testCode][subject] += time;
    }

    const result: TestSpent[] = [];
    for (const testCode in spentMap) {
      const testEntry: TestSpent = { testCode };
      for (const subject in spentMap[testCode]) {
        testEntry[subject] = parseFloat(spentMap[testCode][subject].toFixed(2));
      }
      result.push(testEntry);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error generating subject-wise time spent data:", error);
    return NextResponse.json(
      { error: "Failed to generate subject-wise time spent data" },
      { status: 500 }
    );
  }
}
