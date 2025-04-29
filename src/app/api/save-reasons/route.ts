import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { questionId, reasons } = await req.json();

    if (!questionId) {
      return NextResponse.json({ error: "Missing questionId" }, { status: 400 });
    }

    if (!Array.isArray(reasons)) {
      return NextResponse.json({ error: "Reasons must be an array" }, { status: 400 });
    }

    await prisma.$transaction(async (tx) => {
      await tx.questionReason.deleteMany({
        where: { questionId },
      });

      for (const reasonDescription of reasons) {
        let reason = await tx.reason.findUnique({
          where: { description: reasonDescription },
        });

        if (!reason) {
          reason = await tx.reason.create({
            data: { description: reasonDescription },
          });
        }

        await tx.questionReason.create({
          data: {
            questionId,
            reasonId: reason.id,
          },
        });
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving reasons:", error);
    return NextResponse.json(
      { error: "Failed to save reasons" },
      { status: 500 }
    );
  }
}