import queryItems from "../common/queryItems";
import ConversationDTO from "../dto/ConversationDTO";

const getConversationsByUserMail = async (userEmail) => {
  const allConversations = [];
  const page1 = await queryItems({
    indexName: "GSI1",
    keyConditionExpression: "GSI1PK = :GSI1PK AND begins_with(GSI1SK, :GSI1SK)",
    expressionAttributeValues: {
      ":GSI1PK": `User#${userEmail}`,
      ":GSI1SK": "Conversation#",
    },
  });

  allConversations.push(...page1.items);

  const page2 = await queryItems({
    indexName: "GSI2",
    keyConditionExpression: "GSI2PK = :GSI2PK AND begins_with(GSI2SK, :GSI2SK)",
    expressionAttributeValues: {
      ":GSI2PK": `User#${userEmail}`,
      ":GSI2SK": "Conversation#",
    },
  });

  allConversations.push(...page2.items);

  return allConversations
    .map((conversation) => ConversationDTO.toConversation(conversation))
    .sort((a, b) => b.lastMessageId - a.lastMessageId);
};

export default getConversationsByUserMail;
