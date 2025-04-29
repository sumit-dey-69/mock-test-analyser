"use client";
import { formatTime } from "@/utils/function";
import { reasons } from "@/utils/reasons";
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
    currentSection,
    getCurrentQuestionNumber,
    setCurrentQuestionNumber,
    setCurrentSection,
    questions,
    timeSpent,
    updateQuestionReasons,
  } = useStore();

  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const sections = [
    { name: "mathematics", icon: <Radical /> },
    { name: "logicalReasoning", icon: <Brain /> },
    { name: "computerEnglish", icon: <Cpu /> },
  ] as const;

  const list = questions[currentSection] || [];
  const currentQuestionNumber = getCurrentQuestionNumber();
  const currentQuestion = list.find((q) => q.order === currentQuestionNumber);
  const currentTime = timeSpent[currentSection]?.[currentQuestionNumber] || 0;

  useEffect(() => {
    setSaveStatus("idle");
    setSelectedReasons(currentQuestion?.reasons || []);
  }, [currentQuestion, currentSection, currentQuestionNumber]);

  const toggleReason = (reason: string) =>
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason]
    );

  const saveReasons = async () => {
    if (!currentQuestion?.id) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/save-reasons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: currentQuestion.id,
          reasons: selectedReasons,
        }),
      });
      if (res.ok) {
        updateQuestionReasons(
          currentSection,
          currentQuestion.id,
          selectedReasons
        );
        setSaveStatus("success");
      } else setSaveStatus("error");
    } catch {
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
      goTo("next");
      setSaveStatus("idle");
    }
  };

  const goTo = (direction: "next" | "prev") => {
    const index =
      direction === "next"
        ? currentQuestionNumber + 1
        : currentQuestionNumber - 1;
    setCurrentQuestionNumber(Math.min(Math.max(index, 1), list.length));
  };

  const handleNext = () => {
    if (selectedReasons.length === 0) {
      goTo("next");
    } else {
      saveReasons();
      goTo("next");
    }
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center space-y-[0.75em] border rounded-2xl p-[0.95em] w-full">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-[1.45em]">Q{currentQuestionNumber}.</h2>
        <div className="font-semibold">
          Time Spent: {formatTime(currentTime)}minute(s)
        </div>
        <div className="w-fit space-x-1">
          {sections.map(({ name, icon }) => (
            <button
              key={name}
              title={name}
              onClick={() => setCurrentSection(name)}
              className={twMerge(
                "bg-gray-700 cursor-pointer p-[0.5em] transition-opacity rounded-md",
                currentSection === name
                  ? "opacity-100 bg-blue-600"
                  : "opacity-40"
              )}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-[0.5em]">
        <span>Select Reasons :-</span>
        <div className="flex flex-wrap">
          {reasons.map((reason) => (
            <button
              key={reason}
              onClick={() => toggleReason(reason)}
              className={twMerge(
                "m-[0.25em] cursor-pointer rounded-md p-[0.5em] transition-all text-center flex-grow",
                selectedReasons.includes(reason)
                  ? "bg-blue-700 text-white"
                  : "bg-gray-700 hover:bg-gray-800"
              )}
            >
              {reason}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => goTo("prev")}
          className="flex cursor-pointer items-center gap-[0.25em] rounded bg-gray-800 px-[0.75em] py-[0.5em] hover:brightness-125"
        >
          <ChevronLeft /> Back
        </button>

        <button
          onClick={saveReasons}
          disabled={isSaving}
          className={twMerge(
            "flex items-center gap-[0.5em] px-[1em] py-[0.5em] rounded cursor-pointer",
            saveStatus === "success"
              ? "bg-green-600"
              : saveStatus === "error"
              ? "bg-red-600"
              : "bg-blue-600 hover:bg-blue-700"
          )}
        >
          <Save size={16} />
          {isSaving
            ? "Saving..."
            : saveStatus === "success"
            ? "Saved!"
            : saveStatus === "error"
            ? "Failed to save"
            : "Save"}
        </button>

        <button
          onClick={handleNext}
          className="flex cursor-pointer items-center gap-[0.5em] rounded bg-gray-800 px-[0.75em] py-[0.35em] hover:brightness-125"
        >
          Next <ChevronRight />
        </button>
      </div>
    </div>
  );
}
