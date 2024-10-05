import { requireUserSession } from "../data/auth.server";
import Nav from "../layouts/Nav";

export function loader({ request }) {
  return requireUserSession(request);
}

export default function Publications() {   //Simulacion ficticia
  const publicacion = {
    id: 1,
    titulo: "Publicación de ejemplo",
    contenido: "Contenido de una publicación ficticia.",
  };

  return (
    <div className="h-screen flex flex-col items-center bg-[#cedad3]">
      <Nav />
      <main className="flex-grow mt-6 px-4 sm:px-0 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-[#1c6b44] mb-6">
          Mis Publicaciones
        </h1>
        <div className="w-full grid grid-cols-1 gap-4">
          <div key={publicacion.id} className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-[#1c6b44]">
              {publicacion.titulo}
            </h2>
            <p className="text-gray-700 mt-2">
              {publicacion.contenido}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

