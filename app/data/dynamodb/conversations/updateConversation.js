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
      ":lastActivityAt": newMessage.sentAt,
      ":GSI1SK": `Conversation#${newMessage.sentAt}`,
      ":GSI2SK": `Conversation#${newMessage.sentAt}`,
    },
  };
  const newConversation = await updateItem(params);

  return ConversationDTO.toConversation(newConversation);
};

export default updateConversation;
