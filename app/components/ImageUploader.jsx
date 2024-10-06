import { useState } from "react";

const MAX_FILES = 5;
const maxFileSize = 2097152; // 2MB

const filterImageList = (files) =>
  Array.from(files).filter((file) => file.size <= maxFileSize);

const ImageUploader = ({ onUpload }) => {
  const [files, setFiles] = useState([]);
  const [currentCarouselPosition, setCarouselPosition] = useState(0);

  const handleDropFiles = (event) => {
    event.preventDefault();
    if (!event.dataTransfer?.files) return;

    setFiles((prevFiles) => {
      return [...prevFiles, ...filterImageList(event.dataTransfer.files)].slice(
        0,
        MAX_FILES,
      );
    });
  };

  const handleSelectFiles = (event) => {
    if (!event.target?.files) return;

    setFiles((prevFiles) => {
      return [...prevFiles, ...filterImageList(event.target.files)].slice(
        0,
        MAX_FILES,
      );
    });
  };

  return (
    <div>
      <div
        className="flex items-center justify-center w-full"
        onDrop={handleDropFiles}
      >
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click para subir</span> o suelta
              los archivos aquí
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PNG o JPG (máx. 2MB por archivo, máx. 5 archivos)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept="image/png, image/jpeg, image/jpg"
            multiple
            onChange={handleSelectFiles}
          />
        </label>
      </div>
      {files.length > 0 && (
        <div className="relative w-full">
          <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
            {files.map((file, index) => (
              <div
                key={file.name}
                className={index === currentCarouselPosition ? "" : "hidden "}
              >
                <img
                  src={URL.createObjectURL(file)}
                  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            onClick={() => {
              setCarouselPosition((prev) =>
                Math.abs((prev - 1 + files.length) % files.length),
              );
            }}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            onClick={() => {
              setCarouselPosition((prev) => (prev + 1) % files.length);
            }}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
