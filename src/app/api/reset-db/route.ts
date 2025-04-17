import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    await prisma.test.deleteMany();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("❌ Error while deleting tests:", error.message);

    if (error.code) {
      console.error("🔍 Prisma Error Code:", error.code);
    }
    if (error.meta) {
      console.error("📦 Prisma Error Meta Info:", error.meta);
    }

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
