import { json } from "@remix-run/node";
import { getUserFromSession } from "../data/auth.server";
import { startAChat } from "../data/chat.server";

export async function loader({ request }) {
  const user = await getUserFromSession(request);
  if (!user) return json({ success: false }, 401);

  const { publicationId } = request.body;

  try {
    const newConversation = await startAChat({
      senderEmail: user.email,
      publicationId,
    });

    if (!newConversation) {
      return json({ success: false }, 404);
    }

    return json({ success: true, conversation: newConversation });
  } catch (error) {
    return json({ success: false, error: error.message }, 500);
  }
}
