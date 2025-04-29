import { useStore } from "@/zustand/store";
import { useTestCodeStore } from "@/zustand/use-test-code-selector";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function TestCodeSelector() {
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

    fetch(`/api/get-all-data?testCode=${selectedTestCode}`)
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
    <div className="flex flex-col md:flex-row md:gap-2 md:justify-center items-center space-y-2">
      <h2 className="text-2xl font-bold">Test Code</h2>
      <div className="relative">
        <select
          id="test-code"
          className="appearance-none cursor-pointer rounded-lg border border-zinc-600 bg-zinc-700 py-2 px-3 pr-10 text-zinc-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedTestCode || ""}
          onChange={handleTestCodeChange}
        >
          {testCodes.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-3 size-4 text-zinc-400" />
      </div>
    </div>
  );
}

export default TestCodeSelector;
