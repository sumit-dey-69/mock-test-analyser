"use client";

import { formatTime } from "@/utils/function";
import { useStore } from "@/zustand/store";
import {
  Brain,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Radical,
  Save,
} from "lucide-react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function QuestionBox() {
  const {
    questions,
    timeSpent,
    getCurrentQuestionNumber,
    setCurrentQuestionNumber,
    setCurrentSection,
    currentSection,
    updateQuestionReasons,
  } = useStore();

  const list = questions[currentSection] || [];
  const currentQuestionNumber = getCurrentQuestionNumber();
  const currentTime = timeSpent[currentSection]?.[currentQuestionNumber] || 0;
  const currentQuestion = list.find((q) => q.order === currentQuestionNumber);

  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  useEffect(() => {
    setSaveStatus("idle");

    if (currentQuestion?.reasons) {
      setSelectedReasons(currentQuestion.reasons);
    } else {
      setSelectedReasons([]);
    }
  }, [currentQuestion, currentSection, currentQuestionNumber]);

  const next = () => {
    const nextNum =
      currentQuestionNumber < list.length
        ? currentQuestionNumber + 1
        : currentQuestionNumber;
    setCurrentQuestionNumber(nextNum);
  };

  const prev = () => {
    const prevNum = currentQuestionNumber > 1 ? currentQuestionNumber - 1 : 1;
    setCurrentQuestionNumber(prevNum);
  };

  const sections = [
    { name: "mathematics", icon: <Radical /> },
    { name: "logicalReasoning", icon: <Brain /> },
    { name: "computerEnglish", icon: <Cpu /> },
  ] as const;

  const reasons = [
    "🔍 Almost there",
    "🤦 Silly mistake",
    "⏱️ Last-Second Error",
    "❌ Wrong pick",
    "📖 Misread it",
    "🎯 Tricky Question",
    "⏳ Time ran out",
    "🔄 Overthought it",
    "😵‍💫 Lost focus",
    "🧊 Brain freeze",
    "🖱️ Misclicked",
    "🧩 Confused Logic",
    "🕵️ Missed clue",
    "🚫 Wrong approach",
    "🔄 Lengthy approach",
    "📏 Wrong formula",
    "🤔 Forget formula",
    "🧠 Forget concept",
  ] as const;

  const toggleReason = (reason: string) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason]
    );
  };

  const saveReasons = async () => {
    if (!currentQuestion?.id) return;

    setIsSaving(true);
    setSaveStatus("idle");

    try {
      const response = await fetch("/api/save-reasons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionId: currentQuestion.id,
          reasons: selectedReasons,
        }),
      });

      if (response.ok) {
        updateQuestionReasons(
          currentSection,
          currentQuestion.id,
          selectedReasons
        );
        setSaveStatus("success");
        setTimeout(() => setSaveStatus("idle"), 2000);
      } else {
        setSaveStatus("error");
        setTimeout(() => setSaveStatus("idle"), 2000);
      }
    } catch (error) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col justify-between gap-4 border p-4 w-full">
      <div className="w-full flex justify-between">
        <h2 className="text-2xl">Q{currentQuestionNumber}.</h2>
        <div className="w-[10em]">Time Spent: {formatTime(currentTime)}s</div>

        <div className="w-fit space-x-1">
          {sections.map(({ name, icon }) => (
            <button
              key={name}
              title={name}
              onClick={() => setCurrentSection(name)}
              className={twMerge(
                "bg-gray-700 cursor-pointer p-2 transition-opacity hover:bg-gray-800 rounded-md",
                currentSection === name ? "opacity-100" : "opacity-40"
              )}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-2">
        <h3 className="text-lg mb-2">
          Error Analysis - Select all that apply:
        </h3>
        <div className="flex flex-wrap">
          {reasons.map((reason) => (
            <button
              key={reason}
              title={reason}
              onClick={() => toggleReason(reason)}
              className={twMerge(
                "m-1 cursor-pointer p-2 transition-all hover:bg-gray-800 rounded-md",
                selectedReasons.includes(reason)
                  ? "bg-blue-700 text-white"
                  : "bg-gray-700"
              )}
            >
              {reason}
            </button>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={saveReasons}
            disabled={isSaving}
            className={twMerge(
              "px-4 py-2 rounded flex items-center gap-2",
              saveStatus === "success"
                ? "bg-green-600"
                : saveStatus === "error"
                ? "bg-red-600"
                : "bg-blue-600 hover:bg-blue-700"
            )}
          >
            <Save size={16} />
            {saveStatus === "success"
              ? "Saved!"
              : saveStatus === "error"
              ? "Failed to save"
              : isSaving
              ? "Saving..."
              : "Save Reasons"}
          </button>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={prev}
          className="px-3 py-1.5 bg-gray-800 rounded hover:brightness-125 flex items-center gap-1"
        >
          <ChevronLeft /> Back
        </button>
        <button
          onClick={next}
          className="px-3 py-1.5 bg-gray-800 rounded hover:brightness-125 flex items-center gap-1"
        >
          Next <ChevronRight />
        </button>
      </div>
    </div>
  );
}
