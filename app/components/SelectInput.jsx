import { useState } from "react";

const SelectInput = ({ label, values, onChange }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className="max-w-sm mx-auto">
      <label
        htmlFor="options"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        id="options"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={selectedValue}
        onChange={handleChange}
      >
        <option value="">Todas las categorías</option>
        {values.map((value) => (
          <option key={value.value} value={value.value}>
            {value.option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
