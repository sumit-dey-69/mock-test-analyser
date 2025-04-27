import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const testCode = searchParams.get("testCode");

    if (!testCode) {
      return NextResponse.json(
        { success: false, error: "No test code provided." },
        { status: 400 }
      );
    }

    await prisma.test.delete({
      where: { name: testCode },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting test code:", error);

    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
