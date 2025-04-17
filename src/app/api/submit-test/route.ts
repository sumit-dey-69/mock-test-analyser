import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { testCode, questions } = await req.json();

    const test = await prisma.test.create({
      data: {
        testCode,
        subjects: {
          create: questions.map(
            (q: {
              number: number;
              subject: string;
              timeSpent: number | null;
              performance: string;
              remark?: string | null;
            }) => ({
              questionNo: q.number,
              subject: q.subject,
              time_spent:
                q.timeSpent !== null && q.timeSpent !== undefined
                  ? q.timeSpent.toString()
                  : "0",
              performance: q.performance,
              remark: q.remark ?? null,
            })
          ),
        },
      },
    });

    return NextResponse.json({ success: true, testCode: test.testCode });
  } catch (error: any) {
    console.error("❌ Prisma Error:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
