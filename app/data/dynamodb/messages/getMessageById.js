import getItemByKey from "../common/getItemByKey";
import MessageDTO from "../dto/MessageDTO";

const getMessageById = async (messageId) => {
  const item = await getItemByKey({
    PK: `Message#${messageId}`,
    SK: `Message#${messageId}`,
  });

  return item ? MessageDTO.toMessage(item) : null;
};

export default getMessageById;
