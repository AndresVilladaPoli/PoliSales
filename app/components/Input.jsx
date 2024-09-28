import { forwardRef, memo } from "react";

const Input = ({ id, label, disabled, error, ...props }, ref) => {
  return (
    <div>
      <label htmlFor={id} className="block text-gray-700 font-medium mb-1">
        {label}
      </label>
      <input
        id={id}
        className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300 ${
          disabled ? "cursor-not-allowed" : ""
        }`}
        {...props}
        ref={ref}
      />
      {error && <em className="text-red-600 text-sm">{error}</em>}
    </div>
  );
};

export default memo(forwardRef(Input));
