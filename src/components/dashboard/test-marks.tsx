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

type ChartData = {
  testCode: string;
  marks: number;
};

export default function TestMarks() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [selectedSubject, setSelectedSubject] = useState("All");

  useEffect(() => {
    const fetchMarksData = async () => {
      const res = await fetch(`/api/test-mark?subject=${selectedSubject}`);
      const data: ChartData[] = await res.json();
      setChartData(data);
    };

    fetchMarksData();
  }, [selectedSubject]);

  return (
    <div>
      <div className="mb-4">
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 cursor-pointer"
        >
          <option value="All">All</option>
          <option value="mathematics">Mathematics</option>
          <option value="logicalReasoning">Logical Reasoning</option>
          <option value="computerScience">Computer Science</option>
          <option value="generalEnglish">General English</option>
        </select>
      </div>

      <div className="w-full h-[450px]">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="testCode" />
              <YAxis domain={[0, 1000]} />
              <Tooltip
                contentStyle={{
                  color: "white",
                  fontStyle: "bold",
                  backgroundColor: "rgba(10, 10, 10, 0.8)",
                  borderRadius: "20px",
                }}
                formatter={(value: number) => `${value}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="marks"
                stroke="#6366f1"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          "Loading chart..."
        )}
      </div>
    </div>
  );
}
