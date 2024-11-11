import updateItem from "../common/updateItem";
import ConversationDTO from "../dto/ConversationDTO";

const updateConversation = async ({ newMessage, oldConversation }) => {
  const { PK, SK } = ConversationDTO.fromConversation(oldConversation);

  const params = {
    key: { PK, SK },
    updateExpression:
      "SET lastMessageId = :lastMessageId, lastActivityAt = :lastActivityAt, GSI1SK = :GSI1SK, GSI2SK = :GSI2SK",
    attributeValues: {
      ":lastMessageId": newMessage.id,
      ":lastActivityAt": newMessage.createdAt,
      ":GSI1SK": `Conversation#${newMessage.createdAt}`,
      ":GSI2SK": `Conversation#${newMessage.createdAt}`,
    },
  };

  const newConversation = await updateItem(params);

  return ConversationDTO.toConversation(newConversation);
};

export default updateConversation;
