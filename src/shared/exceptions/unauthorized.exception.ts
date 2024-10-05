import { HttpStatus } from "../enums/http-status.enum";
import { HttpException } from "./http.exception";

class UnauthorizedException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export default UnauthorizedException;
