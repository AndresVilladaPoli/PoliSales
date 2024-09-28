import { memo } from "react";

const Button = ({ name, type, disabled }) => {
  return (
    <button
      type={type}
      className="w-full bg-green-600 text-white rounded-lg py-2 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-400 transition duration-300 disabled:bg-gray-400"
      disabled={disabled}
    >
      {name}
    </button>
  );
};

export default memo(Button);
