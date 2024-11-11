import { json } from "@remix-run/node";
import { getUserFromSession } from "../data/auth.server";
import { sendMessage } from "../data/chat.server";
import getConversationById from "../data/dynamodb/conversations/getConversationById";

export async function loader({ request }) {
  const user = await getUserFromSession(request);
  if (!user) return json({ success: false }, 401);

  const { conversationId, text } = request.body;

  try {
    const conversation = await getConversationById(conversationId);
    if (!conversation) {
      return json({ success: false }, 404);
    }

    const newMessage = await sendMessage({
      senderEmail: user.email,
      receiverEmail:
        conversation.senderEmail === user.email
          ? conversation.receiverEmail
          : conversation.senderEmail,
      text,
    });

    if (!newMessage) {
      return json({ success: false }, 404);
    }

    return json({ success: true, message: newMessage });
  } catch (error) {
    return json({ success: false, error: error.message }, 500);
  }
}