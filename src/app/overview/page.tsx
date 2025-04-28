"use client";
import BackButton from "@/components/global/back-button";
import TestCodeSelector from "@/components/home/test-code-selector";
import QuestionBox from "@/components/overview/question-box";
import QuestionNumberGrid from "@/components/overview/question-number-grid";

export default function QuizPage() {
  return (
    <div className="grid h-screen grid-rows-[auto_auto_1fr] gap-8 p-3">
      <header className="px-5 py-2">
        <BackButton />
        <TestCodeSelector />
      </header>

      <main className="mx-auto grid max-w-5xl grid-cols-1 gap-5 transition-all md:grid-cols-2">
        <QuestionBox />
        <QuestionNumberGrid />
      </main>
    </div>
  );
}
