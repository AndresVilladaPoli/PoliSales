import { destroyUserSession } from "../data/auth.server";
import Spinner from "../components/Spinner";

export function loader({ request }) {
  return destroyUserSession(request);
}

export default function Logout() {
  return (
    <div className="h-full flex flex-col items-center">
      <Spinner />
    </div>
  );
}
