import { useState } from "react";
import { useParams, json, useLoaderData } from "@remix-run/react";
import { getUserFromSession } from "../data/auth.server";
import Nav from "../layouts/Nav";
import getMessagesFromConversation from "../data/dynamodb/messages/getMessagesFromConversation";

export async function loader({ request, params }) {
  const user = await getUserFromSession(request);
  if (!user) {
    return json({ messages: [] });
  }

  const messages = await getMessagesFromConversation(params.conversationId);
  return json({
    messages,
    loggedUser: user,
  });
}

export default function Chats() {
  const [message, setMessage] = useState("");
  const { conversationId } = useParams();
  const { messages } = useLoaderData();
  const [messagesList, setMessagesList] = useState([...messages]);

  const handleKeyPress = async (e) => {
    if (e.key === "Enter" && message.trim()) {
      await sendMessage();
    }
  };

  const sendMessage = async () => {
    const body = new FormData();
    body.append("conversationId", conversationId);
    body.append("text", message);
    const response = await fetch("/messages", {
      method: "POST",
      body,
    });

    if (response.ok) {
      const body = await response.json();
      setMessagesList([...messagesList, body.message]);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#cedad3]">
      <Nav />
      <main className="flex-grow mt-6 px-4 sm:px-0 w-full max-w-lg">
        <h1 className="text-4xl font-bold text-center text-[#1c6b44]">
          Chat Individual
        </h1>
        <p className="text-sm text-center text-[#1c6b44] mt-2">
          {conversationId}
        </p>
        <div className="space-y-4 mt-6">
          {messagesList.map((message) => (
            <div
              key={message.id}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <h2 className="text-lg font-bold text-[#1c6b44]">
                {message.senderId}
              </h2>
              <p className="text-[#1c6b44]">{message.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-2">
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu mensaje aquí..."
            className="flex-grow h-12 p-3 rounded-lg border border-[#1c6b44] focus:ring-2 focus:ring-[#1c6b44] focus:outline-none resize-none"
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-[#1c6b44] text-white font-bold rounded-lg hover:bg-[#145232] transition"
          >
            Enviar
          </button>
        </div>
      </main>
    </div>
  );
}
