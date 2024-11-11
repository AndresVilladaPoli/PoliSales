import { ulid } from "ulid";
import putItem from "../common/putItem";
import MessageDTO from "../dto/MessageDTO";
import Message from "../../../models/Message";

const createMessage = async (message) => {
  const messageDTO = MessageDTO.fromMessage({
    ...message,
    id: ulid(),
    sentAt: Math.floor(Date.now() / 1000),
  });

  await putItem(messageDTO);

  return new Message(messageDTO);
};

export default createMessage;
