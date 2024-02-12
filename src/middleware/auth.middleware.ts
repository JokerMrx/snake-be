import { Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

import { getToken } from "../utils/token.utils.js";
import { IUser } from "../models/user.types.js";
import { AuthRequest } from "../models/request.types.js";

const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = getToken(authHeader);
    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY ?? "",
      (err: VerifyErrors | null, decoded: unknown) => {
        if (err) {
          return res.sendStatus(403);
        }

        if (decoded && typeof decoded === "object") {
          req.user = decoded as IUser;
        }
        next();
      }
    );
  } else {
    res.sendStatus(401);
  }
};

export { authenticateJWT };
