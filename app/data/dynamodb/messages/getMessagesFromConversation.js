import queryItems from "../common/queryItems";
import MessageDTO from "../dto/MessageDTO";

const getMessagesFromConversation = async (conversationId) => {
  const { items } = await queryItems({
    indexName: "GSI1",
    keyConditionExpression: "GSI1PK = :GSI1PK AND begins_with(GSI1SK, :GSI1SK)",
    expressionAttributeValues: {
      ":GSI1PK": `Conversation#${conversationId}`,
      ":GSI1SK": "Message#",
    },
  });

  return items.map((item) => MessageDTO.toMessage(item));
};

export default getMessagesFromConversation;
