"use client";
import { parseTestData } from "@/utils/json-parser";
import { useInputStore } from "@/zustand/use-input-store";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function JsonInputBox() {
  return (
    <div className="grid space-y-5">
      <h1 className="text-3xl font-bold text-center text-zinc-100">
        Mock Test Analyser
      </h1>

      <InputBox />
      <ActionButtons />
    </div>
  );
}

function InputBox() {
  const { input, setInput } = useInputStore();

  return (
    <textarea
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Paste your JSON here..."
      className="w-full h-50 p-4 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
    />
  );
}

function ActionButtons() {
  const { input, setInput } = useInputStore();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [submittionError, setSubmittionError] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return setMessage("Please paste valid JSON.");

    try {
      setLoading(true);
      setSubmittionError(false);
      setMessage("");

      const json = JSON.parse(input);
      const parsedData = parseTestData(json);

      const res = await fetch("/api/submit-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        setInput("");
        setMessage("✅ Test submitted successfully!");
        window.location.reload();
      } else {
        setSubmittionError(true);
        setMessage("Check your JSON and try again.");
      }
    } catch (err) {
      console.error("🚨 Error:", err);
      if (err instanceof SyntaxError) {
        setMessage("Please paste valid JSON.");
      } else if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex flex-col items-center gap-2">
      <div className="space-x-5 flex">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 w-full min-w-[120px]"
        >
          {submitted
            ? "Submitted"
            : loading
            ? "Submitting..."
            : submittionError
            ? "Try Again"
            : "Submit Test"}
        </button>

        <button
          onClick={() => setInput("")}
          className="bg-red-600 hover:bg-red-700 text-white cursor-pointer px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400 w-full min-w-[120px]"
        >
          Clear
        </button>
      </div>

      <p
        className={twMerge(
          submitted && "text-green-500",
          submittionError && "text-red-500",
          "text-sm h-5"
        )}
      >
        {message}
      </p>
    </div>
  );
}
