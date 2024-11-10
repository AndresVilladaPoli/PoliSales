import Message from "../../../models/Message";

class messageDTO {
  constructor() {
    this.PK = null; // ID
    this.SK = null;
    this.GSI1PK = null; // ID / CONVERSATION ID
    this.GSI1SK = null;
    this.id = null;
    this.senderId = null;
    this.receiverId = null;
    this.messageType = null;
    this.text = null;
    this.sentAt = null;
    this.readAt = null;
  }

  static fromMessage(message) {
    const messageDTO = new messageDTO();

    messageDTO.PK = `Message#${message.id}`;
    messageDTO.SK = `Message#${message.id}`;
    messageDTO.GSI1PK = `Conversation#${message.conversationId}`;
    messageDTO.GSI1SK = `Message#${message.id}`;
    messageDTO.id = message.id;
    messageDTO.senderId = message.senderId;
    messageDTO.receiverId = message.receiverId;
    messageDTO.messageType = message.messageType;
    messageDTO.text = message.text;
    messageDTO.sentAt = message.sentAt;
    messageDTO.readAt = message.readAt;

    return messageDTO;
  }

  static toMessage(messageDTO) {
    return new Message({
      id: messageDTO.id,
      senderId: messageDTO.senderId,
      receiverId: messageDTO.receiverId,
      messageType: messageDTO.messageType,
      text: messageDTO.text,
      sentAt: messageDTO.sentAt,
      readAt: messageDTO.readAt,
    });
  }
}

export default messageDTO;
