import { json } from "@remix-run/node";
import { getUserFromSession } from "../data/auth.server";
import { createPresignedUrl } from "../data/image.server";

export async function loader({ request }) {
  const user = await getUserFromSession(request);
  if (!user) return json({ success: false }, 401);

  const url = new URL(request.url);
  const mimeType = url.searchParams.get("mimeType");
  if (!mimeType) return json({ success: false }, 400);

  try {
    const presignedUrl = await createPresignedUrl(mimeType);
    return json({ success: true, presignedUrl });
  } catch (error) {
    return json({ success: false, error: error.message }, 500);
  }
}
