import { useSearchParams, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { useState } from "react";
import { requireUserSession } from "../data/auth.server";
import getMyPublications from "../data/dynamodb/publications/getMyPublications";
import Nav from "../layouts/Nav";
import SearchInput from "../components/SearchInput";
import Publication from "../components/Publication";

export async function loader({ request }) {
  const user = await requireUserSession(request);

  const searchParams = new URLSearchParams(request.url.split("?")[1]);
  const fromId = searchParams.get("fromId");
  const searchKey = searchParams.get("searchKey");

  const { items, nextKey } = await getMyPublications({
    fromId,
    searchKey,
    userEmail: user.email,
  });

  return json({
    publications: items,
    nextKey,
  });
}

// TODO: Implementar paginación

export default function Publications() {
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
    setSearchParams({ searchKey });
    setSearchKey("");
  };

  const handleSearchChange = (e) => {
    setSearchKey(e.target.value);
  };

  return (
    <div className="h-screen flex flex-col items-center bg-[#cedad3]">
      <Nav />
      <main className="flex-grow mt-6 px-4 sm:px-0 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-[#1c6b44] mb-6">
          Mis Publicaciones
        </h1>
        <SearchInput
          searchKey={searchKey}
          onChange={handleSearchChange}
          onSearch={handleStartSearch}
        />
        <div className="w-full grid grid-cols-1 gap-4">
          {publications.map((publication) => (
            <Publication publication={publication} key={publication.id} />
          ))}
        </div>
      </main>
    </div>
  );
}
