import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const codes = await prisma.test.findMany({
    select: { testCode: true },
  });

  const testCodes = codes.map((code) => code.testCode);

  return NextResponse.json(testCodes);
}
