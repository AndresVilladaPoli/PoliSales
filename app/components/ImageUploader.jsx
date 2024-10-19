import ImageCarrousel from "./ImageCarrousel";

const MAX_FILES = 5;
const maxFileSize = 2097152; // 2MB

const filterImageList = (files) =>
  Array.from(files).filter((file) => file.size <= maxFileSize);

const ImageUploader = ({ setFiles, files }) => {
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

  const deleteFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div
        className="flex items-center justify-center w-full"
        onDrop={handleDropFiles}
      >
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600"
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
      <ImageCarrousel files={files} deleteFile={deleteFile} />
    </div>
  );
};

export default ImageUploader;
