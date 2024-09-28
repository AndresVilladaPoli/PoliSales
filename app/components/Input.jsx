import { memo } from "react";

const Input = ({
  id,
  name,
  type,
  value,
  onChange,
  error,
  disabled,
  ...props
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-gray-700 font-medium mb-1">
        {name}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300 ${
          disabled ? "cursor-not-allowed" : ""
        }`}
        onChange={onChange}
        value={value}
        disabled={disabled}
        {...props}
      />
      {error && <em className="text-red-600 text-sm">{error}</em>}
    </div>
  );
};

export default memo(Input);
