import { useSearchParams, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { useState, useEffect } from "react";
import { requireUserSession } from "../data/auth.server";
import Nav from "../layouts/Nav";
import getAllPublications, {
  orderAndFilterBy,
} from "../data/dynamodb/publications/getAllPublications";
import SearchInput from "../components/SearchInput";
import Publication from "../components/Publication";
import SelectInput from "../components/SelectInput";
import PublicationModel from "../models/Publication";
import PriceRange from "../components/PriceRange";

const categories = [
  { value: PublicationModel.CATEGORIA_INMUEBLE, option: "Inmueble" },
  { value: PublicationModel.CATEGORIA_VEHICULO, option: "Vehículo" },
  { value: PublicationModel.CATEGORIA_INSTITUCIONAL, option: "Institucional" },
  { value: PublicationModel.CATEGORIA_LIBROS, option: "Libros" },
  { value: PublicationModel.CATEGORIA_MASCOTAS, option: "Mascotas" },
  { value: PublicationModel.CATEGORIA_PERSONALES, option: "Personales" },
  { value: PublicationModel.CATEGORIA_SERVICIOS, option: "Servicios" },
];

export async function loader({ request }) {
  const user = await requireUserSession(request);

  const searchParams = new URLSearchParams(request.url.split("?")[1]);
  const fromId = searchParams.get("fromId");
  const title = searchParams.get("title");
  const category = searchParams.get("category");
  const priceStart = searchParams.get("priceStart");
  const priceEnd = searchParams.get("priceEnd");
  const orderBy = searchParams.get("orderBy");

  const { items, nextKey } = await getAllPublications({
    nextKey: fromId,
    searchKey: {
      searchKeyTitle: title,
      category,
      price: {
        start: priceStart || 0,
        end: priceEnd || 10000000,
      },
    },
    orderBy: orderBy || orderAndFilterBy.creationDate,
  });

  return json({
    publications: items,
    nextKey,
  });
}

export default function Index() {
  const { publications, nextKey } = useLoaderData();
  const [previousKeys, setPreviousKeys] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    document.body.style.backgroundColor = "#cedad3"; // Fondo de la página
    return () => {
      document.body.style.backgroundColor = ""; // Limpia el color al salir
    };
  }, []);

  const handleNextPage = () => {
    setPreviousKeys((prev) => [...prev, searchParams.get("fromId")]);
    setSearchParams((prevVals) => {
      prevVals.delete("fromId");
      prevVals.append("fromId", nextKey);
      return prevVals;
    });
  };

  const handlePreviousPage = () => {
    const previousKey = previousKeys.pop();
    setPreviousKeys(previousKeys);
    setSearchParams((prevVals) => {
      prevVals.delete("fromId");
      prevVals.append("fromId", previousKey);
      return prevVals;
    });
  };

  const handleStartSearch = () => {
    setSearchParams((prevVals) => {
      prevVals.delete("title");
      prevVals.append("title", searchKey);
      return prevVals;
    });
    setSearchKey("");
  };

  const handleSearchChange = (e) => {
    setSearchKey(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#cedad3]">
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
        {/* Filtro de categoría y rango de precios */}
        <div className="flex flex-wrap justify-between items-center mt-4 gap-4">
          <div className="flex-1 min-w-[200px] flex items-center">
            <SelectInput
              label={
                <span className="text-[#1c6b44] font-semibold">
                  Selecciona una categoría
                </span>
              }
              values={categories}
              className="bg-[#cedad3] text-[#1c6b44] border border-[#1c6b44] p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1c6b44] w-full"
              onChange={(value) =>
                setSearchParams((prevVals) => {
                  prevVals.delete("category");
                  prevVals.append("category", value);
                  return prevVals;
                })
              }
            />
          </div>
          <div className="flex flex-1 min-w-[200px] flex items-center justify-between gap-4">
            <div className="flex flex-col w-full">
              <span className="text-[#1c6b44] font-semibold">
                Precio mínimo
              </span>
              <input
                type="number"
                placeholder="0"
                className="bg-[#ffffff] text-[#1c6b44] border border-[#1c6b44] p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1c6b44] w-full"
                onChange={(e) =>
                  setSearchParams((searchParams) => {
                    searchParams.delete("priceStart");
                    searchParams.append("priceStart", e.target.value);
                    return searchParams;
                  })
                }
              />
            </div>
            <div className="flex flex-col w-full">
              <span className="text-[#1c6b44] font-semibold">
                Precio máximo
              </span>
              <input
                type="number"
                placeholder="10000000"
                className="bg-[#ffffff] text-[#1c6b44] border border-[#1c6b44] p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1c6b44] w-full"
                onChange={(e) =>
                  setSearchParams((searchParams) => {
                    searchParams.delete("priceEnd");
                    searchParams.append("priceEnd", e.target.value);
                    return searchParams;
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Grid de publicaciones */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {publications.map((publication) => (
            <Publication publication={publication} key={publication.id} />
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={previousKeys.length === 0}
            className={`${
              previousKeys.length === 0
                ? "bg-gray-400"
                : "bg-[#1c6b44] hover:bg-[#145732]"
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
