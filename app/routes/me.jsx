import { requireUserSession } from "../data/auth.server";
import Nav from "../layouts/Nav";

export function loader({ request }) {
  return requireUserSession(request);
}

export default function Me() {
  return (
    <div className="h-screen flex flex-col items-center bg-gray-100">
      <Nav />
      <main className="flex-grow mt-2">
        <h1 className="text-4xl font-bold text-center">Mi perfil</h1>
      </main>
    </div>
  );
}
