import { memo, useState } from "react";
import ImageCarrousel from "./ImageCarrousel";

const Publication = ({ publication }) => {
  const [currentCarouselPosition, setCarouselPosition] = useState(0);

  return (
    <div
      key={publication.id}
      className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <span className="font-bold text-gray-900 dark:text-white">
        {new Date(publication.createdAt * 1000).toLocaleDateString()}
      </span>
      <ImageCarrousel files={publication.images} isUrls={true} />
      <div className="px-5 pb-5">
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
          {publication.category}
        </span>
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {publication.title}
        </h5>
        <div className="flex items-center mt-2.5 mb-5">
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {publication.content}
          </p>
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${publication.price}
          </span>
          <a
            href="#"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Ver detalles
          </a>
        </div>
      </div>
    </div>
  );
};

export default memo(Publication);
