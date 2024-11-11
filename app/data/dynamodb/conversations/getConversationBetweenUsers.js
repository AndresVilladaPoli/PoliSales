import queryItems from "../common/queryItems";
import ConversationDTO from "../dto/ConversationDTO";

const getConversationBetweenUsers = async ({ receiverEmail, senderEmail }) => {
  const { items } = await queryItems({
    indexName: "GSI3",
    keyConditionExpression: "GSI3PK = :GSI3PK AND GSI3SK = :GSI3SK",
    expressionAttributeValues: {
      ":GSI3PK": `Conversation#${senderEmail}`,
      ":GSI3SK": `Conversation#${receiverEmail}`,
    },
  });

  if (items.length) return ConversationDTO.toConversation(items[0]);

  const page2 = await queryItems({
    indexName: "GSI4",
    keyConditionExpression: "GSI4PK = :GSI4PK AND GSI4SK = :GSI4SK",
    expressionAttributeValues: {
      ":GSI4PK": `Conversation#${senderEmail}`,
      ":GSI4SK": `Conversation#${receiverEmail}`,
    },
  });

  return page2.items.length
    ? ConversationDTO.toConversation(page2.items[0])
    : null;
};

export default getConversationBetweenUsers;
