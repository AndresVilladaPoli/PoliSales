class Conversation {
  constructor({
    id,
    senderEmail,
    receiverEmail,
    lastMessageId,
    lastActivityAt,
    createdAt,
  }) {
    this.id = id;
    this.senderEmail = senderEmail;
    this.receiverEmail = receiverEmail;
    this.lastMessageId = lastMessageId;
    this.lastActivityAt = lastActivityAt;
    this.createdAt = createdAt;
  }
}

export default Conversation;
