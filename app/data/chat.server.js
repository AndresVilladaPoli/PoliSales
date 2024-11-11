import Conversation from "../models/Conversation";
import Message from "../models/Message";
import createConversation from "./dynamodb/conversations/createConversation";
import getConversationBetweenUsers from "./dynamodb/conversations/getConversationBetweenUsers";
import getPublicationById from "./dynamodb/publications/getPublicationById";
import createMessage from "./dynamodb/messages/createMessage";
import updateConversation from "./dynamodb/conversations/updateConversation";

export const sendMessage = async ({ senderEmail, receiverEmail, text }) => {
  const conversation = await getConversationBetweenUsers({
    receiverEmail,
    senderEmail,
  });

  if (!conversation) return null;

  const newMessage = new Message({
    senderId: senderEmail,
    receiverId: receiverEmail,
    text,
  });

  const savedMessage = await createMessage(newMessage);

  await updateConversation({
    newMessage: savedMessage,
    oldConversation: conversation,
  });

  return message;
};

export const startAChat = async ({ senderEmail, publicationId }) => {
  const publication = await getPublicationById(publicationId);

  if (!publication) return null;

  const conversation = await getConversationBetweenUsers({
    receiverEmail: publication.authorEmail,
    senderEmail,
  });

  if (conversation) return conversation;

  const newConversation = new Conversation({
    senderEmail,
    receiverEmail: publication.email,
  });

  return await createConversation(newConversation);
};
