-- CreateTable
CREATE TABLE "MockTest" (
    "id" SERIAL NOT NULL,
    "testCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MockTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubjectPerform" (
    "questionNo" INTEGER NOT NULL,
    "subject" TEXT NOT NULL,
    "time_spent" TEXT NOT NULL,
    "performance" TEXT NOT NULL,
    "remark" TEXT,
    "mockTestId" INTEGER NOT NULL,

    CONSTRAINT "SubjectPerform_pkey" PRIMARY KEY ("questionNo")
);

-- AddForeignKey
ALTER TABLE "SubjectPerform" ADD CONSTRAINT "SubjectPerform_mockTestId_fkey" FOREIGN KEY ("mockTestId") REFERENCES "MockTest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
