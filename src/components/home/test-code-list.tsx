"use client";
import { useTestCode } from "@/zustand/use-test-code-state";
import { useTestCodeStore } from "@/zustand/use-test-code-selector-store";
import { MessageSquarePlus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AnalyticsButton from "./analytics-button";

function TestCodeList() {
  const router = useRouter();
  // const [testCodes, setTestCodes] = useState<string[]>([]);
  const { testCodes, setTestCodes, removeTestCode } = useTestCode();
  const { setSelectedTestCode } = useTestCodeStore();

  useEffect(() => {
    const fetchTestCodes = async () => {
      try {
        const response = await fetch("/api/test-codes");
        const data = await response.json();
        setTestCodes(data);
      } catch (error) {
        console.error("Failed to fetch test codes", error);
      }
    };
    fetchTestCodes();
  }, []);

  const deleteTestCode = async (testCode: string) => {
    try {
      const response = await fetch(`/api/delete-test?testCode=${testCode}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok && data.success) {
        removeTestCode(testCode);
      } else {
        alert(data.error || "Failed to delete test code.");
      }
    } catch (error) {
      console.error("Failed to delete test code", error);
      alert("Failed to delete test code.");
    }
  };

  return (
    <div className="bg-zinc-800 p-4 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-zinc-200">
          Available Test Codes
        </h2>
        <AnalyticsButton />
      </div>

      <div className="overflow-y-auto h-[15rem] hide-scrollbar scroll-smooth  bg-zinc-800 rounded-lg">
        {testCodes.length > 0 ? (
          <ul className="space-y-3">
            {testCodes.map((code) => (
              <li
                key={code}
                className="flex items-center justify-between p-4 bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors"
              >
                <span className="text-zinc-100 font-medium">{code}</span>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      setSelectedTestCode(code);
                      router.push(`/overview?testCode=${code}`);
                    }}
                    className="flex cursor-pointer items-center focus:outline-none focus:text-blue-600 text-blue-400 hover:text-blue-300 transition"
                  >
                    <MessageSquarePlus className="w-5 h-5" />
                    <span className="ml-1 text-sm">Add Reasons</span>
                  </button>

                  <button
                    onClick={() => deleteTestCode(code)}
                    className="cursor-pointer hover:text-red-500 focus:outline-none focus:text-red-500 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-zinc-400 text-center py-8">
            No test codes found. Start by submitting a test.
          </p>
        )}
      </div>
    </div>
  );
}

export default TestCodeList;
