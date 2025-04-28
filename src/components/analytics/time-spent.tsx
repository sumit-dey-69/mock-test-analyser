"use client";

import { formatCamelCase } from "@/utils/function";
import { ChevronDown, Loader2 } from "lucide-react";
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

interface TimeSpentPoint {
  name: string;
  attemptDuration: number;
}

export default function TestTimeSpentChart() {
  const [chartData, setChartData] = useState<TimeSpentPoint[]>([]);
  const [sections, setSections] = useState<string[]>([]);
  const [selectedSection, setSelectedSection] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/time-spent?section=${selectedSection}`);
        if (!res.ok) throw new Error("Could not load time-spent data");

        const { chartData: data, sections: secs } = await res.json();
        setChartData(data);
        if (secs && secs.length) setSections(secs);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [selectedSection]);

  return (
    <div className="bg-zinc-800 rounded-xl p-6 shadow-md space-y-6">
      <div className="flex space-y-2 flex-col md:flex-row items-start md:items-center justify-between">
        <div className="relative w-full md:w-56">
          <select
            className="w-full cursor-pointer appearance-none bg-zinc-700 border border-zinc-600 text-zinc-200 rounded-lg py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="all">All Sections</option>
            {sections.map((sec) => (
              <option key={sec} value={sec}>
                {formatCamelCase(sec)}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-3 size-4 text-zinc-400 pointer-events-none" />
        </div>
      </div>

      <div className="relative h-64 md:h-80">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="animate-spin w-8 h-8 text-blue-400" />
          </div>
        )}

        {!loading && error && (
          <div className="p-4 text-red-400 bg-zinc-900 rounded-lg">
            Error: {error}
          </div>
        )}

        {!loading && !error && chartData.length === 0 && (
          <div className="flex items-center justify-center h-full text-zinc-500">
            No data available
          </div>
        )}

        {!loading && !error && chartData.length > 0 && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 20, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2e2e2e" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#ccc", textAnchor: "end" }}
                height={60}
                angle={-90}
                style={{ fontSize: 10 }}
              />
              <YAxis tick={{ fill: "#ccc" }} style={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  backgroundColor: "#1f1f1f",
                  borderColor: "#444",
                }}
                labelStyle={{ color: "#fff" }}
                itemStyle={{ color: "#fff" }}
              />
              <Legend wrapperStyle={{ color: "#ccc" }} />
              <Line
                type="monotone"
                dataKey="attemptDuration"
                name="Time Spent (min)"
                stroke="#0288d1"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
