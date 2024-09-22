import getItemByKey from "../common/getItemByKey.js";
import UserDTO from "../dto/UserDTO.js";

const getUserByEmail = async (email) => {
  const { PK, SK } = UserDTO.fromUser({ email });

  const savedUser = await getItemByKey({ PK, SK });
  if (!savedUser) {
    return null;
  }

  return UserDTO.toUser(savedUser);
};

export default getUserByEmail;
