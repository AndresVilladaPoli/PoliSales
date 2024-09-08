import { Link } from "@remix-run/react";
import { requireUserSession } from "../data/auth.server";

export function loader({ request }) {
  return requireUserSession(request);
}

export default function Index() {
  return (
    <div className="h-full flex flex-col items-center">
      <h1 className="text-xl mb-2">Bienvenido a Poli Sales</h1>
      <Link
        to="/logout"
        className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800"
      >
        Cerrar sesión
      </Link>
    </div>
  );
}
