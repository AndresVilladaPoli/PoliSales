import { requireUserSession } from "../data/auth.server";
import Nav from "../layouts/Nav";

export function loader({ request }) {
  return requireUserSession(request);
}

export default function Index() {
  return (
    <div className="h-screen flex flex-col items-center bg-gray-100">
      <Nav />
      <main className="flex-grow flex items-center justify-center">
        AQUI SE VA A LISTAR LAS PUBLICACIONES CREADAS INICIALMENTE Y EL BUSCADOR
        DE ELLAS
      </main>
    </div>
  );
}
