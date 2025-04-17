"use client";
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

type ChartData = {
  testCode: string;
  [subject: string]: number | string;
};

export default function TestTimeSpent() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);

  useEffect(() => {
    const fetchChartData = async () => {
      const res = await fetch(`/api/test-time-spent`);
      const data: ChartData[] = await res.json();

      const uniqueSubjects = Array.from(
        new Set(
          data.flatMap((entry) =>
            Object.keys(entry).filter((key) => key !== "testCode")
          )
        )
      );
      setSubjects(uniqueSubjects);
      setChartData(data);
    };

    fetchChartData();
  }, []);

  return (
    <div className="w-full h-max border p-4 rounded-xl">
      {chartData.length > 0 ? (
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
              formatter={(value) => `${value}`}
            />
            <Legend />
            {subjects.map((subject) => (
              <Line
                key={subject}
                type="monotone"
                dataKey={subject}
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
  );
}
