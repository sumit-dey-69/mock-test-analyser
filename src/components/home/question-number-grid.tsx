"use client";
import patternPerSection from "@/utils/pattern";
import useQuestion from "@/zustand/use-question";
import useQuestionNumber from "@/zustand/use-question-number";
import { twMerge } from "tailwind-merge";

type Section = keyof typeof patternPerSection;

function QuestionNumberGrid() {
  const { currentQuestionNumber, currentSection } = useQuestionNumber();

  const sectionKey = currentSection as Section;

  return (
    <div className="mx-auto grid size-max grid-cols-10 gap-2">
      {Array.from(
        { length: patternPerSection[sectionKey].totalQuestions },
        (_, i) => (
          <QuestionNumberGridItem
            key={i}
            num={i + 1}
            active={i + 1 === currentQuestionNumber}
          />
        )
      )}
    </div>
  );
}
export default QuestionNumberGrid;

function QuestionNumberGridItem({
  num,
  active,
}: {
  num: number;
  active: boolean;
}) {
  const { setQuestionNumber, currentSection } = useQuestionNumber();
  const { questions } = useQuestion();

  const filteredQuestions = questions.filter(
    (q) => q.subject === currentSection
  );

  return (
    <button
      onClick={() => setQuestionNumber(num)}
      className={twMerge(
        "size-8 cursor-pointer rounded-md border-2 border-gray-500 text-[0.65rem] text-gray-400 transition-all hover:brightness-125",
        filteredQuestions[num - 1].subject &&
          filteredQuestions[num - 1].performance === "correct" &&
          "border-green-500 bg-green-900 text-green-300",
        filteredQuestions[num - 1].subject &&
          filteredQuestions[num - 1].performance === "wrong" &&
          "border-red-500 bg-red-800 text-red-200",
        filteredQuestions[num - 1].subject &&
          filteredQuestions[num - 1].performance === "unattempted" &&
          "border-orange-500 bg-orange-800 text-orange-200",
        active && "border-dashed text-white"
      )}
    >
      {num}
    </button>
  );
}
