import getItemByKey from "../common/getItemByKey";
import ConversationDTO from "../dto/ConversationDTO";

const getConversationById = async (conversationId) => {
  const item = await getItemByKey({
    key: {
      PK: `Conversation#${conversationId}`,
      SK: `Conversation#${conversationId}`,
    },
  });

  return item ? ConversationDTO.toConversation(item) : null;
};

export default getConversationById;
