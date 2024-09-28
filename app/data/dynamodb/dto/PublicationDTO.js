import Publication from "../../../models/Publication";

class PublicationDTO {
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
    this.GSI5PK = null;
    this.GSI5SK = null;
    this.GSI6PK = null;
    this.GSI6SK = null;
    this.id = null;
    this.authorEmail = null;
    this.title = null;
    this.content = null;
    this.category = null;
    this.price = null;
    this.images = null;
    this.createdAt = null;
  }

  static fromPublication(publication) {
    const publicationDTO = new PublicationDTO();

    publicationDTO.PK = `Publication#${publication.id}`;
    publicationDTO.SK = `Publication#${publication.id}`;
    publicationDTO.GSI1PK = `Publication#${publication.id}`;
    publicationDTO.GSI1SK = `User#${publication.authorEmail}`;
    publicationDTO.GSI2PK = `User#${publication.authorEmail}`;
    publicationDTO.GSI2SK = `Publication#${publication.id}`;
    publicationDTO.GSI3PK = "Publication";
    publicationDTO.GSI3SK = `Publication#${publication.title}`;
    publicationDTO.GSI4PK = "Publication";
    publicationDTO.GSI4SK = `Publication#${publication.category}`;
    publicationDTO.GSI5PK = "Publication";
    publicationDTO.GSI5SK = `Publication#${publication.price}`;
    publicationDTO.GSI6PK = "Publication";
    publicationDTO.GSI6SK = `Publication#${publication.id}`;
    publicationDTO.id = publication.id;
    publicationDTO.authorEmail = publication.authorEmail;
    publicationDTO.title = publication.title;
    publicationDTO.content = publication.content;
    publicationDTO.category = publication.category;
    publicationDTO.price = publication.price;
    publicationDTO.images = publication.images;
    publicationDTO.createdAt = publication.createdAt;

    return publicationDTO;
  }

  static toPublication(publicationDTO) {
    return new Publication({
      id: publicationDTO.id,
      authorEmail: publicationDTO.authorEmail,
      title: publicationDTO.title,
      content: publicationDTO.content,
      category: publicationDTO.category,
      price: publicationDTO.price,
      images: publicationDTO.images,
      createdAt: publicationDTO.createdAt,
    });
  }
}

export default PublicationDTO;
