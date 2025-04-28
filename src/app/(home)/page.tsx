"use client";
import SubmitButton from "@/components/home/submit-button";
import useTestCode from "@/zustand/use-test-code";
import { useTestCodeStore } from "@/zustand/use-test-code-selector";
import { BarChart2, MessageSquarePlus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function JsonParser() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [testCodes, setTestCodes] = useState<string[]>([]);

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
        setTestCodes((prev) => prev.filter((code) => code !== testCode));
      } else {
        alert(data.error || "Failed to delete test code.");
      }
    } catch (error) {
      console.error("Failed to delete test code", error);
      alert("Failed to delete test code.");
    }
  };

  return (
    <div className="p-6 w-full h-screen bg-zinc-900">
      <div className="grid grid-rows-[1fr_auto] gap-8 mx-auto max-w-lg">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-center text-zinc-100">
            Mock Test Analyser
          </h1>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JSON here..."
            className="w-full h-50 p-4 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
          />

          <div className="flex justify-center gap-5">
            <SubmitButton rawJson={input} />
          </div>
        </div>

        <div className="bg-zinc-800 p-4 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-zinc-200">
              Available Test Codes
            </h2>
            <button
              onClick={() => router.push("/analytics")}
              className="px-4 py-2 cursor-pointer flex items-center gap-2 border border-zinc-700 rounded-lg bg-neutral-700/90 text-zinc-100 hover:brightness-125 transition-colors"
            >
              <span className="text-sm">Analytics</span>
              <BarChart2 className="text-zinc-400 size-5" />
            </button>
          </div>

          <div className="overflow-y-auto h-64 hide-scrollbar scroll-smooth  bg-zinc-800 rounded-lg">
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
                        className="flex cursor-pointer items-center text-blue-400 hover:text-blue-300 transition"
                      >
                        <MessageSquarePlus className="w-5 h-5" />
                        <span className="ml-1 text-sm">Add Reasons</span>
                      </button>

                      <button
                        onClick={() => deleteTestCode(code)}
                        className="text-red-600 cursor-pointer hover:text-red-500 transition"
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
      </div>
    </div>
  );
}
