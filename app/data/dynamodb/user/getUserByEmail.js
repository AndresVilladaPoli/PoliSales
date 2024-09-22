import getItemByKey from "../common/getItemByKey.js";
import UserDTO from "../dto/UserDTO.js";

const getUserByEmail = async (email) => {
  const { PK, SK } = UserDTO.fromUser({ email });

  return getItemByKey({ PK, SK });
};

export default getUserByEmail;
