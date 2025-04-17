"use client";
import { formatLabel } from "@/utils/format-label";
import getSubjectColor from "@/utils/get-subject-color";
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

type CharData = {
  testCode: string;
  [subject: string]: number | string;
};

export default function TestAccuracy() {
  const [chartData, setChartData] = useState<CharData[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchChartData = async () => {
      const res = await fetch(`/api/test-accuracy`);
      const data: CharData[] = await res.json();

      const uniqueSubjects = Array.from(
        new Set(
          data.flatMap((entry) =>
            Object.keys(entry).filter((k) => k !== "testCode")
          )
        )
      );
      setSubjects(uniqueSubjects);
      setChartData(data);
    };

    fetchChartData();
  }, []);

  const displayed = filter === "All" ? subjects : [filter];

  return (
    <div>
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 cursor-pointer hover:brightness-90"
        >
          <option value="All">All</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {formatLabel(subject)}
            </option>
          ))}
        </select>
      </div>

      <div className="h-[400px]">
        {chartData.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="testCode" />
              <YAxis domain={[0, 100]} tickFormatter={(val) => `${val}%`} />
              <Tooltip
                contentStyle={{
                  color: "white",
                  fontWeight: "bold",
                  backgroundColor: "rgba(10, 10, 10, 0.8)",
                  borderRadius: "12px",
                }}
                formatter={(value) => `${value}%`}
              />
              <Legend />
              {displayed.map((subject) => (
                <Line
                  key={subject}
                  dataKey={subject}
                  type="monotone"
                  stroke={getSubjectColor(subject)}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        ) : (
          "Loading chart data..."
        )}
      </div>
    </div>
  );
}
