import React from "react";
import { ChevronDown } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface ReusableSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  formatLabel?: (value: string) => string;
}

function defaultFormatLabel(val: string): string {
  return val;
}

function ReusableSelect({
  options,
  value,
  onChange,
  className = "",
  placeholder,
  formatLabel = defaultFormatLabel,
}: ReusableSelectProps) {
  const containerClass = twMerge("relative w-full md:w-56", className);
  const selectClass = twMerge(
    "w-full cursor-pointer appearance-none bg-zinc-700 border border-zinc-600 text-zinc-200 rounded-lg py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
  );

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    onChange(event.target.value);
  }

  function renderOption(opt: string) {
    return (
      <option key={opt} value={opt}>
        {formatLabel(opt)}
      </option>
    );
  }

  return (
    <div className={containerClass}>
      <select className={selectClass} value={value} onChange={handleChange}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(renderOption)}
      </select>
      <ChevronDown className="absolute right-3 top-3 size-4 text-zinc-400 pointer-events-none" />
    </div>
  );
}

export default ReusableSelect;
