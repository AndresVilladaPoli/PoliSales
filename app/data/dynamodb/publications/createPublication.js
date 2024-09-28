import { ulid } from "ulid";
import putItem from "../common/putItem";
import PublicationDTO from "../dto/PublicationDTO";

const createPublication = async (publication) => {
  const publicationDTO = PublicationDTO.fromPublication({
    ...publication,
    id: ulid(),
    createdAt: Math.floor(Date.now() / 1000),
  });

  await putItem(publicationDTO);
};

export default createPublication;
