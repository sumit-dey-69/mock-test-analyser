"use client";

import { parseTestData } from "@/utils/json-parser";
import { useState } from "react";

type Props = {
  rawJson: string;
};

export default function SubmitButton({ rawJson }: Props) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!rawJson.trim()) {
      alert("Please paste valid JSON.");
      return;
    }

    try {
      setLoading(true);

      const json = JSON.parse(rawJson);
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
    <button
      onClick={handleSubmit}
      disabled={loading}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
    >
      {loading ? "Submitting..." : "Submit Test"}
    </button>
  );
}
