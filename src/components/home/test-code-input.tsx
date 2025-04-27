"use client";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

function TestCodeInput() {
  // const { testCode, setTestCode } = useTestCode();
  const [testCode, setTestCode] = useState([]);
  const [selectedTestCode, setSelectedTestCode] = useState("");

  useEffect(() => {
    const fetchTestCodes = async () => {
      const res = await fetch("/api/test-codes");
      const data = await res.json();
      setTestCode(data);
    };

    fetchTestCodes();
  }, []);

  return (
    <div className="flex items-center gap-4">
      <span className="whitespace-nowrap">Test Code:</span>
      <div className="flex gap-4">
        <div className="relative">
          <select
            className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2 w-full"
            value={selectedTestCode}
            onChange={(e) => setSelectedTestCode(e.target.value)}
          >
            <option value="">-- Select Test --</option>
            {testCode.map((test) => (
              <option key={test} value={test}>
                {test}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* <input
        type="text"
        onChange={(e) => setTestCode(e.target.value)}
        value={testCode}
        className="h-8 w-full border-b-2 border-gray-700 p-2 focus:border-gray-500 focus:outline-none"
      /> */}
    </div>
  );
}
export default TestCodeInput;
