"use client";
import { useInputStore } from "@/zustand/use-input-store";

function JsonInputBox() {
  const { input, setInput } = useInputStore();

  return (
    <textarea
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Paste your JSON here..."
      className="w-full h-50 p-4 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
    />
  );
}

export default JsonInputBox;
