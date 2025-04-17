"use client";
import { redirect } from "next/navigation";

function BackButton() {
  return (
    <button className="bg-white text-gray-800 hover:bg-white/90 py-1.5 px-2.5 rounded-lg border cursor-pointer" onClick={() => redirect("/")}>
      Back
    </button>
  );
}

export default BackButton;
