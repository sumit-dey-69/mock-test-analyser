import { BarChart2 } from "lucide-react";
import { useRouter } from "next/navigation";

function AnalyticsButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/analytics")}
      className="px-4 py-2 cursor-pointer flex items-center gap-2 border border-zinc-700 rounded-lg bg-neutral-700/90 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:brightness-125 transition-colors"
    >
      <span className="text-sm">Analytics</span>
      <BarChart2 className="text-zinc-400 size-5" />
    </button>
  );
}

export default AnalyticsButton;
