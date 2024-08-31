import React from "react";

interface FilterInputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FilterInput({
  placeholder,
  value,
  onChange,
}: FilterInputProps) {
  return (
    <input
      className="border rounded-lg p-3 w-full sm:w-1/4 shadow-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
