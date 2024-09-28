class Publication {
  constructor({
    id,
    title,
    authorEmail,
    content,
    category,
    price,
    images,
    createdAt,
  }) {
    this.id = id;
    this.authorEmail = authorEmail;
    this.title = title;
    this.content = content;
    this.category = category;
    this.price = price;
    this.images = images;
    this.createdAt = createdAt;
  }

  static CATEGORIA_INMUEBLE = "inmueble";
  static CATEGORIA_VEHICULO = "vehiculo";
  static CATEGORIA_SERVICIOS = "servicios";
  static CATEGORIA_LIBROS = "libros";
  static CATEGORIA_PERSONALES = "personales";
  static CATEGORIA_MASCOTAS = "mascotas";
  static CATEGORIA_INSTITUCIONAL = "institucional";
}

export default Publication;
