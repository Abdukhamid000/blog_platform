import { Router } from "express";
import { CreateUserDTO } from "../user/dto/create-user.dto";
import UserService from "../user/user.service";
import { comparePw, hashPw } from "../../shared/utils/hashPw";
import { requestBodyValidator } from "../../shared/validators/request-body.validator";
import { LoginUserDTO } from "../user/dto/login-user.dto";
import { HttpStatus } from "../../shared/enums/http-status.enum";
import jwt from "jsonwebtoken";
import { HttpException } from "../../shared/exceptions/http.exception";
import BadRequestException from "../../shared/exceptions/bad-request.exception";
import getBody from "../../shared/utils/getBody";

const AuthController = Router();

AuthController.post(
  "/signup",
  requestBodyValidator(CreateUserDTO),
  async (req, res) => {
    const { username, email, password } = getBody<CreateUserDTO>(req);

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
    const { email, password } = getBody<LoginUserDTO>(req);
    const user = await UserService.getUserByEmail(email);
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    if (!comparePw(password, user.password)) {
      throw new BadRequestException("Invalid password");
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "15m",
      algorithm: "HS256",
    });
    res.status(HttpStatus.OK).json({ token });
  }
);

export default AuthController;
