"use client";
import JsonInputBox from "@/components/home/json-input-box";
import TestCodeList from "@/components/home/test-code-list";

export default function JsonParser() {
  return (
      <div className="grid gap-8 mx-auto max-w-lg">
        <JsonInputBox />
        <TestCodeList />
      </div>
  );
}
