import { ulid } from "ulid";
import putItem from "../common/putItem";
import ConversationDTO from "../dto/ConversationDTO";

const createConversation = async (conversation) => {
  const publicationDTO = ConversationDTO.fromConversation({
    ...conversation,
    id: ulid(),
    createdAt: Math.floor(Date.now() / 1000),
  });

  await putItem(publicationDTO);
};

export default createConversation;
