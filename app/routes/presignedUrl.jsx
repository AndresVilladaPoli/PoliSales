import { json } from "@remix-run/node";
import { getUserFromSession } from "../data/auth.server";

export async function loader({ request }) {
  const user = await getUserFromSession(request);
  if (!user) return json({ success: false }, 401);

  console.log(request);
}
