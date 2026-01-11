import { useState } from 'react';
import clsx from 'clsx';

export default function Select({
  label,
  value,
  onChange,
  children,
  className = "",
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value !== '' && value !== null && value !== undefined;
  const isFloating = isFocused || hasValue;

  return (
    <div className={clsx("relative w-full", className)}>
      <select
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none cursor-pointer"
        {...props}
      >
        {children}
      </select>
      <label
        className={clsx(
          "absolute left-3 transition-all duration-200 pointer-events-none",
          isFloating ? ["-top-2 text-xs bg-white px-1", isFocused ? "text-blue-600" : "text-gray-600"] : "top-2 text-sm text-gray-500"
        )}
      >
        {label}
      </label>
      <svg
        className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
