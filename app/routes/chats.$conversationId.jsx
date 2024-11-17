import { useState } from "react";
import { useParams, json, useLoaderData } from "@remix-run/react";
import { getUserFromSession } from "../data/auth.server";
import Nav from "../layouts/Nav";
import getMessagesFromConversation from "../data/dynamodb/messages/getMessagesFromConversation";
import Input from "../components/Input";

export async function loader({ request, params }) {
  const user = await getUserFromSession(request);
  if (!user) {
    return json({ messages: [] });
  }

  const messages = await getMessagesFromConversation(params.conversationId);
  console.log("API MESSAGES", messages);
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
    if (e.key === "Enter") {
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
    }
  };

  return (
    <div className="h-screen flex flex-col items-center bg-[#cedad3]">
      <Nav />
      <main className="flex-grow mt-6 px-4 sm:px-0 w-full max-w-lg">
        <h1 className="text-4xl font-bold text-center text-[#1c6b44]">
          Chat Individual {conversationId}
        </h1>
        {messagesList.map((message) => (
          <div
            key={message.id}
            className="bg-white shadow-md rounded-lg p-4 mt-4"
          >
            <h2 className="text-xl font-bold text-[#1c6b44]">
              {message.senderId}
            </h2>
            <p className="text-[#1c6b44]">{message.text}</p>
          </div>
        ))}
        <Input
          id="message"
          label="Mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </main>
    </div>
  );
}
