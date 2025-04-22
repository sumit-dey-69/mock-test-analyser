// "use client";

// import { useState } from "react";
// import useQuestion from "@/zustand/use-question";
// import useShowResult from "@/zustand/use-show-result";
// import useTestCode from "@/zustand/use-test-code";
// import { useRouter } from "next/navigation";

// export default function SubmitButton() {
//   const { questions, resetQuestions } = useQuestion();
//   const { testCode, resetTestCode } = useTestCode();
//   const { showResult, toggleShowResult } = useShowResult();
//   const router = useRouter();

//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     if (!testCode.trim()) {
//       alert("Please enter a test code before submitting.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await fetch("/api/submit-test", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ testCode, questions }),
//       });

//       const data = await res.json();

//       if (res.ok && data.success) {
//         console.log("Test submitted!");
//           resetTestCode();
//           resetQuestions();
//           if (!showResult) toggleShowResult();
//       } else {
//         console.error("Submission failed:", data);
//         alert("Something went wrong during submission.");
//       }
//     } catch (error) {
//       console.error("Error submitting test:", error);
//       alert("Failed to submit the test.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button
//       onClick={handleSubmit}
//       disabled={loading}
//       className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50`}
//     >
//       {loading ? "Submitting..." : "Submit Test"}
//     </button>
//   );
// }

"use client";

import { parseTestData } from "@/schema/json-parser";
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

      // Parse and validate
      const json = JSON.parse(rawJson);
      const parsedData = parseTestData(json);

      // Submit to API
      const res = await fetch("/api/submit-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert("✅ Test submitted successfully!");
        console.log("Test ID:", data.testId);
      } else {
        console.error("❌ Submission failed:", data);
        alert("Something went wrong during submission.");
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
      // disabled={loading || !rawJson.trim()}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
    >
      {loading ? "Submitting..." : "Submit Test"}
    </button>
  );
}
