class Publication {
  constructor(id, title, authorEmail, content, category, price, createdAt) {
    this.id = id;
    this.authorEmail = authorEmail;
    this.title = title;
    this.content = content;
    this.category = category;
    this.price = price;
    this.createdAt = createdAt;
  }
}

export default Publication;
