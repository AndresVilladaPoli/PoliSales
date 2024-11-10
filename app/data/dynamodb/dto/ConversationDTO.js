import Conversation from "../../../models/Conversation";

class ConversationDTO {
  constructor() {
    this.PK = null;
    this.SK = null;
    this.GSI1PK = null;
    this.GSI1SK = null;
    this.GSI2PK = null;
    this.GSI2SK = null;
    this.GSI3PK = null;
    this.GSI3SK = null;
    this.GSI4PK = null;
    this.GSI4SK = null;
    this.id = null;
    this.senderEmail = null;
    this.receiverEmail = null;
    this.lastMessageId = null;
    this.lastActivityAt = null;
    this.createdAt = null;
  }

  static fromConversation(conversation) {
    const conversationDTO = new ConversationDTO();

    conversationDTO.PK = `Conversation#${conversation.id}`;
    conversationDTO.SK = `Conversation#${conversation.id}`;
    conversationDTO.GSI1PK = `User#${conversation.senderEmail}`;
    conversationDTO.GSI1SK = `Conversation#${conversation.lastActivityAt}`;
    conversationDTO.GSI2PK = `User#${conversation.receiverEmail}`;
    conversationDTO.GSI2SK = `Conversation#${conversation.lastActivityAt}`;
    conversationDTO.GSI3PK = `Conversation#${conversation.senderEmail}`;
    conversationDTO.GSI3SK = `Conversation#${conversation.receiverEmail}`;
    conversationDTO.GSI4PK = `Conversation#${conversation.receiverEmail}`;
    conversationDTO.GSI4SK = `Conversation#${conversation.senderEmail}`;
    conversationDTO.id = publication.id;
    conversationDTO.senderEmail = conversation.senderEmail;
    conversationDTO.receiverEmail = conversation.receiverEmail;
    conversationDTO.lastMessageId = conversation.lastMessageId;
    conversationDTO.lastActivityAt = conversation.lastActivityAt;
    conversationDTO.createdAt = conversation.createdAt;

    return conversationDTO;
  }

  static toConversation(conversationDTO) {
    return new Conversation({
      id: conversationDTO.id,
      senderEmail: conversationDTO.senderEmail,
      receiverEmail: conversationDTO.receiverEmail,
      lastMessageId: conversationDTO.lastMessageId,
      lastActivityAt: conversationDTO.lastActivityAt,
      createdAt: conversationDTO.createdAt,
    });
  }
}

export default ConversationDTO;
