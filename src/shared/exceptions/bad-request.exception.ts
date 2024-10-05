import { HttpStatus } from "../enums/http-status.enum";
import { HttpException } from "./http.exception";

class BadRequestException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export default BadRequestException;
