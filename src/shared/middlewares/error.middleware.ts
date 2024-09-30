import { HttpStatus } from "../enums/http-status.enum";
import { HttpException } from "../exceptions/http.exception";
import { Logger } from "../libs/logger.lib";
import { NextFunction, Request, Response } from "express";

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  Logger.error(`[${new Date().toLocaleString()}] ${err}`);

  if (err instanceof HttpException) {
    res.status(err.status).json({
      statusCode: err.status,
      message: err.message,
    });
  } else {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
    });
  }
}
