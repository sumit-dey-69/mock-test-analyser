"use client";
import JsonInputBox from "@/components/home/json-input-box";
import TestCodeList from "@/components/home/test-code-list";

export default function JsonParser() {
  return (
    <div className="p-6 w-full h-screen bg-zinc-900">
      <div className="grid grid-rows-[1fr_auto] gap-8 mx-auto max-w-lg">
        <JsonInputBox />
        <TestCodeList />
      </div>
    </div>
  );
}
