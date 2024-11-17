import getItemByKey from "../common/getItemByKey";
import PublicationDTO from "../dto/PublicationDTO";

const getPublicationById = async (publicationId) => {
  const item = await getItemByKey({
    PK: `Publication#${publicationId}`,
    SK: `Publication#${publicationId}`,
  });

  return item ? PublicationDTO.toPublication(item) : null;
};

export default getPublicationById;
