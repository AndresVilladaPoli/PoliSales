import { memo } from "react";

const Publication = ({ publication }) => {
  return (
    <div key={publication.id} className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-[#1c6b44]">
        {publication.titulo}
      </h2>
      <p className="text-gray-700 mt-2">{publication.contenido}</p>
    </div>
  );
};

export default memo(Publication);
