"use client";
import { parseTestData } from "@/utils/json-parser";
import { useInputStore } from "@/zustand/use-input-store";
import { useState } from "react";

export default function SubmitButton() {
  const { input } = useInputStore();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) {
      alert("Please paste valid JSON.");
      return;
    }

    try {
      setLoading(true);

      const json = JSON.parse(input);
      const parsedData = parseTestData(json);

      const res = await fetch("/api/submit-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert("✅ Test submitted successfully!");
        window.location.reload();
      } else {
        console.error("❌ Submission failed:", data);
        alert("Check your JSON and try again.");
      }
    } catch (err) {
      console.error("🚨 Error:", err);
      if (err instanceof SyntaxError) {
        alert("Invalid JSON format.");
      } else if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto">
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Test"}
      </button>
    </div>
  );
}
