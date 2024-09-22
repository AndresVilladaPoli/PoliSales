import { Link } from "@remix-run/react";
import { requireUserSession } from "../data/auth.server";

export function loader({ request }) {
  return requireUserSession(request);
}

export default function Index() {
  return (
    <div className="h-screen flex flex-col items-center bg-gray-100">
      <header className="w-full bg-[#196844] text-white py-4">
        <h1 className="text-4xl font-bold text-center">
          Bienvenido a POLIsales
        </h1>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <Link
          to="/logout"
          className="text-white bg-[#196844] hover:bg-[#024006] focus:ring-4 focus:ring-[#A3BF3F] font-medium rounded-lg text-sm px-5 py-2.5 transition-colors duration-300"
        >
          Cerrar Sesión
        </Link>
      </main>
    </div>
  );
}
