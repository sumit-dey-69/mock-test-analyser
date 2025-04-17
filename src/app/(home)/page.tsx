"use client";
import ActionButtons from "@/components/home/action-buttons";
import DasboardButton from "@/components/home/dasboard-button";
import QuestionBox from "@/components/home/question-box";
import QuestionNumberGrid from "@/components/home/question-number-grid";
import ResultBox from "@/components/home/result-box";
import TestCodeInput from "@/components/home/test-code-input";
import useShowResult from "@/zustand/use-show-result";

function App() {
  const { showResult } = useShowResult();

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] gap-8 p-3">
      <div className="flex justify-between">
        <TestCodeInput />
        <DasboardButton />
      </div>

      {showResult ? (
        <ResultBox />
      ) : (
        <div className="grid grid-rows-[auto_1fr] gap-4">
          <QuestionBox />
          <QuestionNumberGrid />
        </div>
      )}
      <ActionButtons />
    </div>
  );
}

export default App;
