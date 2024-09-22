import putItem from "../common/putItem";
import UserDTO from "../dto/UserDTO";

const createUser = async (user) => {
  const userDTO = UserDTO.fromUser(user);

  await putItem(userDTO);
};

export default createUser;
