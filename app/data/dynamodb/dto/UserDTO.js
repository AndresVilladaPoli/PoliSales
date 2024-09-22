import User from "../../../models/User";

class UserDTO {
  constructor() {
    this.PK = null;
    this.SK = null;
    this.name = null;
    this.email = null;
  }

  static fromUser(user) {
    const userDTO = new UserDTO();

    userDTO.PK = `User#${user.email}`;
    userDTO.SK = `User#${user.email}`;
    userDTO.name = user.name;
    userDTO.email = user.email;

    return userDTO;
  }

  static toUser(userDTO) {
    return new User(userDTO.name, userDTO.email);
  }
}

export default UserDTO;
