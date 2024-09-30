import { requireUserSession } from "../data/auth.server";
import Nav from "../layouts/Nav";

export function loader({ request }) {
  return requireUserSession(request);
}

export default function Chats() {
  return (
    <div className="h-screen flex flex-col items-center bg-[#cedad3]">
      <Nav />
      <main className="flex-grow mt-6 px-4 sm:px-0 w-full max-w-lg">
        <h1 className="text-4xl font-bold text-center text-[#1c6b44]">
          Chats Abiertos
        </h1>
      </main>
    </div>
  );
}
