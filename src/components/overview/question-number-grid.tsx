"use client";
import { useStore } from "@/zustand/store";
import QuestionNumberGridItem from "./question-number-grid-item";
import { Loader2 } from "lucide-react";

export default function QuestionNumberGrid() {
  const {
    questionLengths,
    performanceStatus,
    setCurrentQuestionNumber,
    currentSection,
    getCurrentQuestionNumber,
    questions,
  } = useStore();

  const len = questionLengths[currentSection] || 0;
  const perf = performanceStatus[currentSection] || {};
  const currentQuestionNumber = getCurrentQuestionNumber();
  const sectionQuestions = questions[currentSection] || [];

  const hasReasons = (questionOrder: number) => {
    const question = sectionQuestions.find((q) => q.order === questionOrder);
    return question?.reasons && question.reasons.length > 0;
  };

  if (len === 0)
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8 text-blue-400" />
      </div>
    );

  return (
    <div>
      <div className="grid grid-cols-10 md:grid-cols-8 gap-3 py-2">
        {Array.from({ length: len }, (_, i) => {
          const num = i + 1;
          return (
            <QuestionNumberGridItem
              key={num}
              num={num}
              active={num === currentQuestionNumber}
              status={perf[num]}
              hasReasons={hasReasons(num)}
              onClick={() => setCurrentQuestionNumber(num)}
            />
          );
        })}
      </div>
    </div>
  );
}
