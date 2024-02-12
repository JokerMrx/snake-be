import { IUser } from "../models/user.types.js";

export default class UserDto {
  email: string;
  id: number;
  nickname: string;

  constructor(model: IUser) {
    this.email = model.email;
    this.id = model.id;
    this.nickname = model.nickname;
  }
}
