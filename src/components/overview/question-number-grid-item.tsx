"use client";
import { twMerge } from "tailwind-merge";

interface Props {
  num: number;
  active: boolean;
  status: "correct" | "wrong" | "unattempted";
  onClick: () => void;
  hasReasons?: boolean;
}

export default function QuestionNumberGridItem({
  num,
  active,
  status,
  onClick,
  hasReasons = false,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "size-10 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all hover:brightness-125 relative",
        status === "correct" && "border-green-500 bg-green-900 text-green-300",
        status === "wrong" && "border-red-500 bg-red-800 text-red-200",
        status === "unattempted" &&
          "border-orange-500 bg-orange-800 text-orange-200",
        active && "border-dashed text-white"
      )}
    >
      {num}
      {hasReasons && (
        <span className="absolute -top-1 -right-1 size-3 bg-blue-500 rounded-full" />
      )}
    </button>
  );
}
