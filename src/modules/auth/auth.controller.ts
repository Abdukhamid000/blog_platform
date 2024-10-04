import { Router } from "express";
import { CreateUserDTO } from "../user/dto/create-user.dto";
import UserService from "../user/user.service";
import { comparePw, hashPw } from "../../shared/utils/hashPw";
import { requestBodyValidator } from "../../shared/validators/request-body.validator";
import { LoginUserDTO } from "../user/dto/login-user.dto";
import { HttpStatus } from "../../shared/enums/http-status.enum";
import { Http } from "winston/lib/winston/transports";
import { HttpException } from "../../shared/exceptions/http.exception";

const AuthController = Router();

export default AuthController;
