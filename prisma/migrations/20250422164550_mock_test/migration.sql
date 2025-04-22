-- CreateTable
CREATE TABLE "Test" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "testTotalDuration" INTEGER NOT NULL,
    "filtersId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Test_filtersId_fkey" FOREIGN KEY ("filtersId") REFERENCES "Filters" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Filters" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "incorrect" INTEGER NOT NULL,
    "correct" INTEGER NOT NULL,
    "unattempted" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "SectionWiseStat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "testId" TEXT NOT NULL,
    "marksScored" REAL NOT NULL,
    "sectionMarks" REAL NOT NULL,
    "accuracy" REAL NOT NULL,
    "totalQuestions" INTEGER NOT NULL,
    "attemptDuration" REAL NOT NULL,
    "correctAnswers" INTEGER NOT NULL,
    "inCorrectAnswers" INTEGER NOT NULL,
    "unAttempted" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "sectionDuration" REAL NOT NULL,
    CONSTRAINT "SectionWiseStat_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "testId" TEXT NOT NULL,
    "sectionDuration" REAL NOT NULL,
    "sectionMarks" REAL NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    CONSTRAINT "Section_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sectionId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "isAttempted" BOOLEAN NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "timeTaken" REAL NOT NULL,
    "marksId" TEXT,
    CONSTRAINT "Question_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Question_marksId_fkey" FOREIGN KEY ("marksId") REFERENCES "Marks" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Marks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "positive" REAL NOT NULL,
    "negative" REAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Test_filtersId_key" ON "Test"("filtersId");

-- CreateIndex
CREATE UNIQUE INDEX "Question_marksId_key" ON "Question"("marksId");
