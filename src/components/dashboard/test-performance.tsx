"use client";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function TestPerformance() {
  const [chartData, setChartData] = useState(null);
  const [performance, setPerformance] = useState("all");
  const [subject, setSubject] = useState("all");

  useEffect(() => {
    const fetchChartData = async () => {
      const res = await fetch(
        `/api/test-performance?performance=${performance}&subject=${subject}`
      );
      const data = await res.json();
      setChartData(data);
    };
    fetchChartData();
  }, [performance, subject]);

  return (
    <div className="w-full h-max border p-4 rounded-xl">
      <div className="flex gap-4 mb-4">
        <select
          value={performance}
          onChange={(e) => setPerformance(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 cursor-pointer"
        >
          <option value="All">All</option>
          <option value="correct">Correct</option>
          <option value="wrong">Wrong</option>
          <option value="unattempted">Unattempted</option>
        </select>

        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 cursor-pointer"
        >
          <option value="All">All</option>
          <option value="mathematics">Mathematics</option>
          <option value="logicalReasoning">Logical Reasoning</option>
          <option value="computerScience">Computer Science</option>
          <option value="generalEnglish">General English</option>
        </select>
      </div>

      <div className="h-[400px]">
        {chartData ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="testCode" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  color: "white",
                  fontStyle: "bold",
                  backgroundColor: "rgba(10, 10, 10, 0.8)",
                  borderRadius: "20px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="correct"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="wrong"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="unattempted"
                stroke="#facc15"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          "Loading chart data..."
        )}
      </div>
    </div>
  );
}

export default TestPerformance;