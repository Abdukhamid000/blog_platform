import { Request } from "express";

export function getBody<T>(req: Request): T {
  return req.body;
}

export default getBody;
