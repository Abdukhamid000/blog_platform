import { Router } from "express";
import { CreateUserDTO } from "../users/dto/create-user.dto";
import { requestBodyValidator } from "../../shared/validators/request-body.validator";
import { LoginUserDTO } from "../users/dto/login-user.dto";
import { HttpStatus } from "../../shared/enums/http-status.enum";
import getBody from "../../shared/utils/getBody";
import AuthService from "./auth.service";

const AuthController = Router();

AuthController.post(
  "/signup",
  requestBodyValidator(CreateUserDTO),
  async (req, res) => {
    const user = await AuthService.signup(getBody<CreateUserDTO>(req));

    res.status(HttpStatus.CREATED).json({ data: user });
  }
);

AuthController.post(
  "/login",
  requestBodyValidator(LoginUserDTO),
  async (req, res) => {
    const token = await AuthService.login(getBody<LoginUserDTO>(req));
    res.json({ token });
  }
);

export default AuthController;
