import { forwardRef, memo } from "react";

const Select = ({ id, label, error, placeHolder, options, ...props }, ref) => {
  return (
    <div>
      <label htmlFor={id} className="block text-gray-700 font-medium mb-1">
        {label}
      </label>
      <select
        id={id}
        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        {...props}
        ref={ref}
      >
        <option key="placeholder" value="">
          {placeHolder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <em className="text-red-600 text-sm">{error}</em>}
    </div>
  );
};

export default memo(forwardRef(Select));
