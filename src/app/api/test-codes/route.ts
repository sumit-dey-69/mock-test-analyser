import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const codes = await prisma.test.findMany({
    select: { name: true },
    orderBy: { createdAt: 'asc' },
  });

  const testCodes = codes.map((code) => code.name);

  return NextResponse.json(testCodes);
}
