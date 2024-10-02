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

AuthController.post(
  "/signup",
  requestBodyValidator(CreateUserDTO),
  async (req, res) => {
    const { username, email, password } = req.body as CreateUserDTO;

    const pw = hashPw(password);
    const user = await UserService.createUser({
      username,
      email,
      password: pw,
    });

    const { password: _, ...userWithoutPw } = user;
    res.status(HttpStatus.CREATED).json(userWithoutPw);
  }
);

AuthController.post(
  "/login",
  requestBodyValidator(LoginUserDTO),
  async (req, res) => {
    const { email, password } = req.body as LoginUserDTO;
    const user = await UserService.getUserByEmail(email);
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    if (!comparePw(password, user.password)) {
      throw new HttpException("Invalid password", HttpStatus.BAD_REQUEST);
    }
  }
);

export default AuthController;
