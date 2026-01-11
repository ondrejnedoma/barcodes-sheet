import { useState } from 'react';
import clsx from 'clsx';

export default function Input({
  label,
  type = "text",
  value,
  onChange,
  className = "",
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value !== '' && value !== null && value !== undefined;
  const isFloating = isFocused || hasValue;

  return (
    <div className={clsx("relative w-full", className)}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white peer"
        placeholder=" "
        {...props}
      />
      <label
        className={clsx(
          "absolute left-3 transition-all duration-200 pointer-events-none",
          isFloating ? ["-top-2 text-xs bg-white px-1", isFocused ? "text-blue-600" : "text-gray-600"] : "top-2 text-sm text-gray-500"
        )}
      >
        {label}
      </label>
    </div>
  );
};
