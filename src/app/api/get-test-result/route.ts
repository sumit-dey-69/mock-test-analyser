import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch test results including subjects related to the testCode
    const testResults = await prisma.test.findMany({
      include: {
        subjects: true, // This will include related subjects for each test
      },
    });

    // Return the fetched test results
    return NextResponse.json(testResults);
  } catch (error) {
    console.error("Error fetching test data:", error);
    return NextResponse.json(
      { error: "Failed to fetch test data" },
      { status: 500 }
    );
  }
}
