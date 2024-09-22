import updateItem from "../common/updateItem";
import UserDTO from "../dto/UserDTO";

const updateUserName = async ({ email, name }) => {
  const { PK, SK } = UserDTO.fromUser({ email });

  const params = {
    key: { PK, SK },
    updateExpression: "SET #name = :name",
    attributeNames: { "#name": "name" },
    attributeValues: { ":name": name },
  };

  const newUser = await updateItem(params);

  return UserDTO.toUser(newUser);
};

export default updateUserName;
