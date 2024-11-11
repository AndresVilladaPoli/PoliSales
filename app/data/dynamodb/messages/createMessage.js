import { ulid } from "ulid";
import putItem from "../common/putItem";
import MessageDTO from "../dto/MessageDTO";

const createMessage = async (message) => {
  const messageDTO = MessageDTO.fromMessage({
    ...message,
    id: ulid(),
    sentAt: Math.floor(Date.now() / 1000),
  });

  await putItem(messageDTO);
};

export default createMessage;
