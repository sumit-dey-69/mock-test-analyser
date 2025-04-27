"use client";

import { useStore } from "@/zustand/store";
import { useTestCodeStore } from "@/zustand/use-test-code-selector";
import { useEffect, useState } from "react";
import QuestionBox from "@/components/overview/question-box";
import QuestionNumberGrid from "../../components/overview/question-number-grid";

export default function QuizPage() {
  const [testCodes, setTestCodes] = useState<string[]>([]);
  const { selectedTestCode, setSelectedTestCode } = useTestCodeStore();

  const {
    setQuestionLengths,
    setPerformanceStatus,
    setQuestions,
    setTimeSpent,
    currentSection,
    setCurrentSection,
  } = useStore();

  useEffect(() => {
    fetch("/api/test-codes")
      .then((r) => r.json())
      .then((data: string[]) => setTestCodes(data));
  }, []);

  useEffect(() => {
    if (!selectedTestCode) return;
    fetch(`/api/get-all?testCode=${selectedTestCode}`)
      .then((r) => r.json())
      .then((data) => {
        setQuestionLengths(data.totalQuestions);
        setPerformanceStatus(data.performanceStatus);
        setQuestions(data.questions);
        setTimeSpent(data.timeSpent);
        setCurrentSection(data.sections[0] || "");
      });
  }, [
    selectedTestCode,
    setQuestionLengths,
    setPerformanceStatus,
    setQuestions,
    setTimeSpent,
    setCurrentSection,
  ]);

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] gap-8 p-3">
      {/* Header */}
      <div className="flex items-center gap-4">
        <span>Test Code:</span>
        <select
          className="border rounded p-2"
          value={selectedTestCode}
          onChange={(e) => setSelectedTestCode(e.target.value)}
        >
          <option value="">-- Select Test --</option>
          {testCodes.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>

      {/* Content */}
      <div className="grid grid-rows-[auto_1fr] max-w-lg mx-auto gap-4">
        {selectedTestCode && currentSection && (
          <>
            <QuestionBox />
            <QuestionNumberGrid />
          </>
        )}
      </div>

      {/* <ActionButtons /> */}
    </div>
  );
}
