"use client";

import { useState } from "react";
import useQuestion from "@/zustand/use-question";
import useShowResult from "@/zustand/use-show-result";
import useTestCode from "@/zustand/use-test-code";
import { useRouter } from "next/navigation";

export default function SubmitButton() {
  const { questions, resetQuestions } = useQuestion();
  const { testCode, resetTestCode } = useTestCode();
  const { showResult, toggleShowResult } = useShowResult();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!testCode.trim()) {
      alert("Please enter a test code before submitting.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/submit-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ testCode, questions }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        console.log("Test submitted!");
          resetTestCode();
          resetQuestions();
          if (!showResult) toggleShowResult();
      } else {
        console.error("Submission failed:", data);
        alert("Something went wrong during submission.");
      }
    } catch (error) {
      console.error("Error submitting test:", error);
      alert("Failed to submit the test.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSubmit}
      disabled={loading}
      className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50`}
    >
      {loading ? "Submitting..." : "Submit Test"}
    </button>
  );
}
