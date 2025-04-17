"use client";
import useShowResult from "@/zustand/use-show-result";

function ToggleButton() {
  const { toggleShowResult, showResult } = useShowResult();

  return (
    <button
      onClick={toggleShowResult}
      className="cursor-pointer rounded-md bg-gray-700 px-4 py-2 hover:brightness-125"
    >
      {showResult ? "Back" : "Result"}
    </button>
  );
}

export default ToggleButton;
