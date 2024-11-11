import { useParams, json, useLoaderData } from "@remix-run/react";
import { getUserFromSession } from "../data/auth.server";
import Nav from "../layouts/Nav";
import getMessagesFromConversation from "../data/dynamodb/messages/getMessagesFromConversation";

export async function loader({ request }) {
  const { params } = request;
  const user = await getUserFromSession(request);
  if (!user) {
    return json({ messages: [] });
  }

  const messages = await getMessagesFromConversation(params.conversationId);

  return json({
    messages,
  });
}

export default function Chats() {
  const { conversationId } = useParams();
  const { messages } = useLoaderData();

  return (
    <div className="h-screen flex flex-col items-center bg-[#cedad3]">
      <Nav />
      <main className="flex-grow mt-6 px-4 sm:px-0 w-full max-w-lg">
        <h1 className="text-4xl font-bold text-center text-[#1c6b44]">
          Chat Individual {conversationId}
        </h1>
        {messages.map((message) => (
          <div
            key={message.id}
            className="bg-white shadow-md rounded-lg p-4 mt-4"
          >
            <h2 className="text-xl font-bold text-[#1c6b44]">
              {message.senderEmail}
            </h2>
            <p className="text-[#1c6b44]">{message.content}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
