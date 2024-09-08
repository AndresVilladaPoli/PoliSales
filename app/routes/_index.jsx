import { requireUserSession } from "../data/auth.server";

export function loader({ request }) {
  return requireUserSession(request);
}

export default function Index() {
  return (
    <div>
      <h1>PAGINA PRINCIPAL</h1>
    </div>
  );
}
