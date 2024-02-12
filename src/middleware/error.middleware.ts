import { Request, Response, ErrorRequestHandler, NextFunction } from "express";

import ApiError from "../exceptions/api.error.js";

export default (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
    next(); // so that there is no error that the "next" function is not used
  }
  return res.status(500).json({ message: "Internal Server Error" });
};
