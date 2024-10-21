const SearchInput = ({ value, onChange, onSearch }) => (
  <>
    <label
      htmlFor="default-search"
      className="mb-2 text-sm font-medium text-gray-900 sr-only"
    >
      Buscar
    </label>
    <div className="relative w-full max-w-md mx-auto mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-5 h-5 text-[#1c6b44]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="search"
        id="default-search"
        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-[#1c6b44] rounded-lg bg-white focus:ring-[#1c6b44] focus:border-[#1c6b44]"
        placeholder="Ingrese su búsqueda"
        required
        value={value}
        onChange={onChange}
      />
      <button
        type="button"
        className="text-white absolute right-2.5 bottom-2.5 bg-[#1c6b44] hover:bg-[#145732] focus:ring-4 focus:outline-none focus:ring-[#1c6b44] font-medium rounded-lg text-sm px-4 py-2"
        onClick={onSearch}
      >
        Buscar
      </button>
    </div>
  </>
);

export default SearchInput;

