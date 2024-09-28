import { memo } from "react";

const Select = ({
  id,
  name,
  placeHolder,
  options,
  value,
  onChange,
  ...props
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-gray-700 font-medium mb-1">
        {name}
      </label>
      <select
        id={id}
        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        value={value}
        onChange={onChange}
        {...props}
      >
        <option selected key="placeholder">
          {placeHolder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(Select);
