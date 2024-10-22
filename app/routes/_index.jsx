import { useSearchParams, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/react";
import { useState } from "react";
import { requireUserSession } from "../data/auth.server";
import Nav from "../layouts/Nav";
import getAllPublications, {
  orderAndFilterBy,
} from "../data/dynamodb/publications/getAllPublications";
import SearchInput from "../components/SearchInput";
import Publication from "../components/Publication";

export async function loader({ request }) {
  const user = await requireUserSession(request);

  const searchParams = new URLSearchParams(request.url.split("?")[1]);
  const fromId = searchParams.get("fromId");
  const title = searchParams.get("title");
  const orderBy = searchParams.get("orderBy");

  const { items, nextKey } = await getAllPublications({
    nextKey: fromId,
    searchKey: {
      searchKeyTitle: title,
    },
    orderBy: orderBy || orderAndFilterBy.creationDate,
  });

  return json({
    publications: items,
    nextKey,
  });
}

// TODO: Implementar paginación

export default function Index() {
  const { publications, nextKey } = useLoaderData();
  const [previousKeys, setPreviousKeys] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleNextPage = () => {
    setPreviousKeys((prev) => [...prev, searchParams.get("fromId")]);
    setSearchParams({ fromId: nextKey });
  };

  const handlePreviousPage = () => {
    const previousKey = previousKeys.pop();
    setPreviousKeys(previousKeys);
    setSearchParams({ fromId: previousKey });
  };

  const handleStartSearch = () => {
    setSearchParams({ title: searchKey });
    setSearchKey("");
  };

  const handleSearchChange = (e) => {
    setSearchKey(e.target.value);
  };

  return (
    <div className="h-screen flex flex-col items-center bg-[#cedad3]">
      <Nav />
      <main className="flex-grow mt-6 px-4 sm:px-0 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-[#1c6b44] mb-6 w-full">
          Publicaciones
        </h1>
        <SearchInput
          searchKey={searchKey}
          onChange={handleSearchChange}
          onSearch={handleStartSearch}
        />
        
        {/* Para las columnas de publicaciones */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {publications.map((publication) => (
            <Publication publication={publication} key={publication.id} />
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={previousKeys.length === 0}
            className={`${
              previousKeys.length === 0 ? "bg-gray-400" : "bg-[#1c6b44] hover:bg-[#145732]"
            } text-white font-medium rounded-lg text-sm px-5 py-2.5`}
          >
            Anterior
          </button>
          <button
            onClick={handleNextPage}
            disabled={!nextKey}
            className={`${
              !nextKey ? "bg-gray-400" : "bg-[#1c6b44] hover:bg-[#145732]"
            } text-white font-medium rounded-lg text-sm px-5 py-2.5`}
          >
            Siguiente
          </button>
        </div>
      </main>
    </div>
  );
}
