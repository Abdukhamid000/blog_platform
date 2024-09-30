import { Logger } from "../libs/logger.lib";
import { Request, Response } from "express";
import { HttpStatus } from "../enums/http-status.enum";

export function notFoundMiddleware(req: Request, res: Response) {
  Logger.warn(`${HttpStatus.NOT_FOUND}: ${req.url}`);

  res.status(HttpStatus.NOT_FOUND).json({
    statusCode: HttpStatus.NOT_FOUND,
    message: "Not Found",
  });
}
