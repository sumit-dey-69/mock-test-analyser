"use client";
import useQuestion from "@/zustand/use-question";
import useTestCode from "@/zustand/use-test-code";
import useTimeSpent from "@/zustand/use-time-spent";

function ResetButton() {
  const { resetTestCode } = useTestCode();
  const { resetQuestions } = useQuestion();
  const { resetTimeSpent } = useTimeSpent();
  return (
    <button
      onClick={() => {
        resetTestCode();
        resetQuestions();
        resetTimeSpent();
      }}
      className="cursor-pointer rounded-md  bg-gray-700 px-4 py-2 hover:brightness-125"
    >
      Reset
    </button>
  );
}

export default ResetButton;
