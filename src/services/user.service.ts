import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import tokenService from "./token.service.js";
import UserDto from "../dto/user.dto.js";
import ApiError from "../exceptions/api.error.js";
import { IAuthUser, IUser } from "../models/user.types.js";

const prisma = new PrismaClient();

export default new (class UserService {
  async register({ email, password }: IAuthUser) {
    if (!email || !password) throw ApiError.BadRequest();
    const candidate = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (candidate) {
      throw ApiError.BadRequest(
        "The user with this address is already registered"
      );
    }

    const hashPassword = await bcrypt.hash(password, 3);

    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashPassword,
        nickname: email.split("@")[0]
      },
      select: {
        id: true,
        email: true,
        nickname: true
      }
    });

    const token = tokenService.generateToken(JSON.parse(JSON.stringify(user)));

    return { user, token };
  }

  async login({ email, password }: IAuthUser) {
    if (!email || !password) throw ApiError.BadRequest();
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (!user)
      throw ApiError.BadRequest("There is no user with such an email!");

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) throw ApiError.BadRequest("Incorrect login or password");

    const userDto = new UserDto(user as IUser);

    const token = tokenService.generateToken(
      JSON.parse(JSON.stringify(userDto))
    );

    return { token };
  }

  async getUserById(userId: number) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true,
        email: true,
        nickname: true
      }
    });

    if (!user) throw ApiError.NotFoundError();

    return user;
  }

  async getUserMe(userId: number) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true,
        email: true,
        nickname: true
      }
    });

    if (!user) throw ApiError.NotFoundError();

    return user;
  }
})();
