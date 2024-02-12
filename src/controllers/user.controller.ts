import { Request, Response, NextFunction } from "express";

import userService from "../services/user.service.js";
import ApiError from "../exceptions/api.error.js";
import { checkIsValidEmail } from "../utils/check.utils.js";

export default new (class User {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const isValidEmail = checkIsValidEmail(email);

      if (!isValidEmail || password.length < 8)
        throw ApiError.BadRequest("Invalid email or password!");

      const user = await userService.register({ email, password });

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const isValidEmail = checkIsValidEmail(email);

      if (!isValidEmail || password.length < 8)
        throw ApiError.BadRequest("Invalid email or password!");

      const token = await userService.login({ email, password });

      res.status(201).json(token);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
})();
