import { Logger } from "../libs/logger.lib";
import { Request, Response } from "express";
import { HttpStatus } from "../enums/http-status.enum";
import NotFoundException from "../exceptions/not-found.exception";

export function notFoundMiddleware(req: Request, res: Response) {
  Logger.warn(`${HttpStatus.NOT_FOUND}: ${req.url}`);

  throw new NotFoundException("Not found");
}
