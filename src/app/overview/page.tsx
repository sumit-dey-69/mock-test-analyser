// "use client";
// import QuestionBox from "@/components/overview/question-box";
// import QuestionNumberGrid from "@/components/overview/question-number-grid";
// import { useStore } from "@/zustand/store";
// import { useTestCodeStore } from "@/zustand/use-test-code-selector";
// import { ChevronDown } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function QuizPage() {
//   const [testCodes, setTestCodes] = useState<string[]>([]);
//   const { selectedTestCode, setSelectedTestCode } = useTestCodeStore();
//   const {
//     setCurrentSection,
//     setQuestionLengths,
//     setPerformanceStatus,
//     setQuestions,
//     setTimeSpent,
//   } = useStore();
//   const router = useRouter();

//   useEffect(() => {
//     const url = new URL(window.location.href);
//     const urlTestCode = url.searchParams.get("testCode");
//     if (urlTestCode && !selectedTestCode) {
//       setSelectedTestCode(urlTestCode);
//     }
//   }, [selectedTestCode, setSelectedTestCode]);

//   useEffect(() => {
//     fetch("/api/test-codes")
//       .then((res) => res.json())
//       .then((data: string[]) => setTestCodes(data));
//   }, []);

//   useEffect(() => {
//     if (!selectedTestCode) return;
//     fetch(`/api/get-all?testCode=${selectedTestCode}`)
//       .then((res) => res.json())
//       .then((data) => {
//         const {
//           totalQuestions,
//           performanceStatus,
//           questions,
//           timeSpent,
//           sections,
//         } = data;
//         setQuestionLengths(totalQuestions);
//         setPerformanceStatus(performanceStatus);
//         setQuestions(questions);
//         setTimeSpent(timeSpent);
//         setCurrentSection(sections[0] || "");
//       });
//   }, [
//     selectedTestCode,
//     setQuestionLengths,
//     setPerformanceStatus,
//     setQuestions,
//     setTimeSpent,
//     setCurrentSection,
//   ]);

//   const handleTestCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const newTestCode = e.target.value;
//     setSelectedTestCode(newTestCode);

//     const url = new URL(window.location.href);
//     url.searchParams.set("testCode", newTestCode);
//     router.replace(url.toString());
//   };

//   return (
//     <div className="grid h-screen grid-rows-[auto_1fr_auto] gap-8 p-3">
//       <header className="flex items-center gap-4">
//         <label htmlFor="test-code" className="font-medium">
//           Test Code:
//         </label>
//         <div className="flex space-y-2 flex-col md:flex-row items-start md:items-center justify-between">
//           <div className="relative">
//             <select
//               id="test-code"
//               className="cursor-pointer appearance-none bg-zinc-700 border border-zinc-600 text-zinc-200 rounded-lg py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//               value={selectedTestCode || ""}
//               onChange={handleTestCodeChange}
//             >
//               {testCodes.map((code) => (
//                 <option key={code} value={code}>
//                   {code}
//                 </option>
//               ))}
//             </select>
//             <ChevronDown className="absolute right-3 top-3 end-0 size-4 text-zinc-400 pointer-events-none" />
//           </div>
//         </div>
//       </header>

//       <main className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-5 transition-all">
//         <QuestionBox />
//         <QuestionNumberGrid />
//       </main>
//     </div>
//   );
// }

"use client";

import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import BackButton from "@/components/global/back-button";
import QuestionBox from "@/components/overview/question-box";
import QuestionNumberGrid from "@/components/overview/question-number-grid";
import { useStore } from "@/zustand/store";
import { useTestCodeStore } from "@/zustand/use-test-code-selector";

export default function QuizPage() {
  const router = useRouter();
  const [testCodes, setTestCodes] = useState<string[]>([]);

  const { selectedTestCode, setSelectedTestCode } = useTestCodeStore();
  const {
    setCurrentSection,
    setQuestionLengths,
    setPerformanceStatus,
    setQuestions,
    setTimeSpent,
  } = useStore();

  useEffect(() => {
    const url = new URL(window.location.href);
    const urlTestCode = url.searchParams.get("testCode");

    if (urlTestCode && !selectedTestCode) {
      setSelectedTestCode(urlTestCode);
    }
  }, [selectedTestCode, setSelectedTestCode]);

  useEffect(() => {
    fetch("/api/test-codes")
      .then((res) => res.json())
      .then((data: string[]) => setTestCodes(data));
  }, []);

  useEffect(() => {
    if (!selectedTestCode) return;

    fetch(`/api/get-all?testCode=${selectedTestCode}`)
      .then((res) => res.json())
      .then((data) => {
        const {
          totalQuestions,
          performanceStatus,
          questions,
          timeSpent,
          sections,
        } = data;

        setQuestionLengths(totalQuestions);
        setPerformanceStatus(performanceStatus);
        setQuestions(questions);
        setTimeSpent(timeSpent);
        setCurrentSection(sections[0] || "");
      });
  }, [
    selectedTestCode,
    setQuestionLengths,
    setPerformanceStatus,
    setQuestions,
    setTimeSpent,
    setCurrentSection,
  ]);

  const handleTestCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTestCode = e.target.value;
    setSelectedTestCode(newTestCode);

    const url = new URL(window.location.href);
    url.searchParams.set("testCode", newTestCode);
    router.replace(url.toString());
  };

  return (
    <div className="grid h-screen grid-rows-[auto_auto_1fr_auto] gap-8 p-3">
      <header className="">
        <BackButton />
        <div className="mx-auto flex flex-col items-center space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-4">
          <h2 className="font-bold text-2xl">Test Code</h2>
          <div className="relative">
            <select
              id="test-code"
              className="cursor-pointer appearance-none bg-zinc-700 border border-zinc-600 text-zinc-200 rounded-lg py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={selectedTestCode || ""}
              onChange={handleTestCodeChange}
            >
              {testCodes.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3 size-4 text-zinc-400 pointer-events-none" />
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-5 transition-all">
        <QuestionBox />
        <QuestionNumberGrid />
      </main>
    </div>
  );
}
