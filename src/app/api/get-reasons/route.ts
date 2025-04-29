import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const questionId = new URL(req.url).searchParams.get("questionId");
  
  if (!questionId) {
    return NextResponse.json({ error: "Missing questionId" }, { status: 400 });
  }

  try {
    const questionReasons = await prisma.questionReason.findMany({
      where: { questionId },
      include: { reason: true },
    });

    const reasons = questionReasons.map(qr => qr.reason.description);

    return NextResponse.json({ reasons });
  } catch (error) {
    console.error("Error fetching reasons:", error);
    return NextResponse.json(
      { error: "Failed to fetch reasons" },
      { status: 500 }
    );
  }
}