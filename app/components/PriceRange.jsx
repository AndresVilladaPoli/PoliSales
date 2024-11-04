import { useState } from "react";

const MAX_PRICE = 1000000000;
const MIN_PRICE = 0;

const validatePrice = (price) => {
  if (price < MIN_PRICE) {
    return MIN_PRICE;
  } else if (price > MAX_PRICE) {
    return MAX_PRICE;
  } else {
    return price;
  }
};

const PriceRange = ({ onNewStart, onNewEnd }) => {
  const [priceStart, setPriceStart] = useState(0);
  const [priceEnd, setPriceEnd] = useState(1000000000);

  const onChangeStart = (e) => {
    const value = e.target.value;
    const newPrice = validatePrice(value);

    setPriceStart(newPrice);
    onNewStart(newPrice);
  };

  const onChangeEnd = (e) => {
    const value = e.target.value;
    const newPrice = validatePrice(value);

    setPriceEnd(newPrice);
    onNewEnd(newPrice);
  };

  return (
    <div className="grid gap-6 mb-6 md:grid-cols-2">
      <div>
        <label
          htmlFor="priceStart"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Precio mínimo
        </label>
        <input
          type="number"
          id="priceStart"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={priceStart}
          onChange={onChangeStart}
          required
        />
      </div>
      <div>
        <label
          htmlFor="PriceEnd"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Precio máximo
        </label>
        <input
          type="number"
          id="PriceEnd"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={priceEnd}
          onChange={onChangeEnd}
          required
        />
      </div>
    </div>
  );
};

export default PriceRange;
