import { memo } from "react";
import { useNavigate } from "@remix-run/react";
import ImageCarrousel from "./ImageCarrousel";

const Publication = ({ publication }) => {
  const navigate = useNavigate();

  const createConversation = async (publicationId) => {
    const response = await fetch("/conversation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        publicationId,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      navigate(`/chats/${data.conversation.id}`);
    }
  };

  return (
    <div
      key={publication.id}
      className="w-full max-w-sm bg-white border border-[#1c6b44] rounded-lg shadow-md"
    >
      <span className="block px-4 py-2 text-sm font-bold text-[#1c6b44] bg-[#cedad3] rounded-t-lg">
        {new Date(publication.createdAt * 1000).toLocaleDateString()}
      </span>
      <ImageCarrousel files={publication.images} isUrls={true} />
      <div className="px-5 pb-5">
        <span className="bg-[#e1be10] text-[#1c6b44] text-xs font-semibold px-2.5 py-0.5 rounded">
          {publication.category}
        </span>
        <h5 className="text-xl font-semibold tracking-tight text-[#1c6b44] mt-2">
          {publication.title}
        </h5>
        <div className="flex items-center mt-2.5 mb-5">
          <p className="mb-3 font-normal text-gray-700">
            {publication.content}
          </p>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-3xl font-bold text-[#1c6b44] mb-3">
            ${publication.price}
          </span>
          <a
            onClick={() => createConversation(publication.id)}
            className="text-white bg-[#1c6b44] hover:bg-[#145732] focus:ring-4 focus:outline-none focus:ring-[#1c6b44] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Ver detalles
          </a>
        </div>
      </div>
    </div>
  );
};

export default memo(Publication);
