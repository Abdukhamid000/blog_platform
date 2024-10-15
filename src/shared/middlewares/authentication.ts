import { Request, Response, NextFunction } from "express";
import UnauthorizedException from "../exceptions/unauthorized.exception";
import jwt from "jsonwebtoken";

export function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    throw new UnauthorizedException("Token not provided");
  }

  jwt.verify(token, process.env.JWT_SECRET || "SECRET", (err, user) => {
    if (err) {
      throw new UnauthorizedException("Invalid token");
    }

    if (typeof user === "object") {
      req.user = user;
    }

    next();
  });
}
