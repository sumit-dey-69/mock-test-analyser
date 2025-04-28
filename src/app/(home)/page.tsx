"use client";
import JsonInputBox from "@/components/home/json-input-box";
import SubmitButton from "@/components/home/submit-button";
import TestCodeList from "@/components/home/test-code-list";

export default function JsonParser() {
  return (
    <div className="p-6 w-full h-screen bg-zinc-900">
      <div className="grid grid-rows-[1fr_auto] gap-8 mx-auto max-w-lg">
        <div className="grid space-y-6">
          <h1 className="text-3xl font-bold text-center text-zinc-100">
            Mock Test Analyser
          </h1>
          <JsonInputBox />
          <SubmitButton />
        </div>
        <TestCodeList />
      </div>
    </div>
  );
}
