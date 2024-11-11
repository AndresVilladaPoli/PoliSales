import { useLoaderData } from "@remix-run/react";
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

  return (
    <div className="h-screen flex flex-col items-center bg-[#cedad3]">
      <Nav />
      <main className="flex-grow mt-6 px-4 sm:px-0 w-full max-w-lg">
        <h1 className="text-4xl font-bold text-center text-[#1c6b44]">
          Chats Abiertos
        </h1>

        {chats.map((chat) => (
          <div key={chat.id} className="bg-white shadow-md rounded-lg p-4 mt-4">
            <h2 className="text-xl font-bold text-[#1c6b44]">
              {chat.senderEmail}
            </h2>
            <p className="text-[#1c6b44]">{chat.receiverEmail}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
