import { HttpStatus } from "../enums/http-status.enum";
import { HttpException } from "./http.exception";

class NotFoundException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export default NotFoundException;
