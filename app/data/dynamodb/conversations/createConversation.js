import { ulid } from "ulid";
import putItem from "../common/putItem";
import ConversationDTO from "../dto/ConversationDTO";
import Conversation from "../../../models/Conversation";

const createConversation = async (conversation) => {
  const conversationDTO = ConversationDTO.fromConversation({
    ...conversation,
    id: ulid(),
    createdAt: Math.floor(Date.now() / 1000),
  });

  await putItem(conversationDTO);

  return new Conversation(conversationDTO);
};

export default createConversation;
