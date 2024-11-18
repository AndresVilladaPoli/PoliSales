import { useLoaderData, useNavigate, json } from "@remix-run/react";
import { requireUserSession } from "../data/auth.server";
import Nav from "../layouts/Nav";
import getConversationsByUserMail from "../data/dynamodb/conversations/getConversationsByUserMail";
import getMessageById from "../data/dynamodb/messages/getMessageById";

export async function loader({ request }) {
  const user = await requireUserSession(request);
  const chats = await getConversationsByUserMail(user.email);

  const chatsWithMessagePromise = chats.map(async (chat) => {
    if (!chat.lastMessageId) return chat;

    const message = await getMessageById(chat.lastMessageId);
    return {
      ...chat,
      lastMessage: message,
    };
  });

  const chatsWithMessage = await Promise.all(chatsWithMessagePromise);

  return json({
    chats: chatsWithMessage,
  });
}

export default function Chats() {
  const { chats } = useLoaderData();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#cedad3]">
      <Nav />
      <main className="flex-grow mt-6 px-4 sm:px-0 w-full max-w-lg">
        <h1 className="text-4xl font-bold text-center text-[#1c6b44] mb-6">
          Chats Abiertos
        </h1>

        <div className="space-y-4">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => navigate(`/chats/${chat.id}`)}
            >
              <h2 className="text-lg font-bold text-[#1c6b44]">
                {chat.senderEmail}
              </h2>
              <p className="text-sm font-medium text-[#6b1c1c]">
                {chat.receiverEmail}
              </p>
              {chat.lastMessage && (
                <p className="text-sm text-gray-600 mt-2">
                  {chat.lastMessage.text}
                </p>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
