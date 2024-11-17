class Message {
  constructor({
    id,
    senderId,
    receiverId,
    text,
    sentAt,
    readAt,
    conversationId,
  }) {
    this.id = id;
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.messageType = "text";
    this.text = text;
    this.sentAt = sentAt;
    this.readAt = readAt;
    this.conversationId = conversationId;
  }

  static MESSAGE_TYPE_TEXT = "text";
}

export default Message;
