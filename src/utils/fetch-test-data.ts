import { prisma } from "@/lib/prisma";

export const fetchTestData = async (testCode: string) => {
  const testData = await prisma.test.findUnique({
    where: { testCode },
    include: {
      subjects: true,
    },
  });

  return testData;
};
