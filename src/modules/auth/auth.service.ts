import { CreateUserDTO } from "../users/dto/create-user.dto";
import UsersService from "../users/users.service";
import { comparePw, hashPw } from "../../shared/utils/hashPw";
import jwt from "jsonwebtoken";
import { LoginUserDTO } from "../users/dto/login-user.dto";
import NotFoundException from "../../shared/exceptions/not-found.exception";
import UnauthorizedException from "../../shared/exceptions/unauthorized.exception";

class AuthService {
  static async signup(data: CreateUserDTO) {
    const { username, email, password } = data;

    const pw = hashPw(password);
    const user = await UsersService.createUser({
      username,
      email,
      password: pw,
    });

    const { password: _, ...userWithoutPw } = user;

    return userWithoutPw;
  }

  static async login(data: LoginUserDTO) {
    const { email, password } = data;
    const user = await UsersService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (!comparePw(password, user.password)) {
      throw new UnauthorizedException("Invalid password");
    }

    const token = jwt.sign(
      { sub: user.id },
      process.env.JWT_SECRET || "SECRET",
      {
        expiresIn: "30m",
        algorithm: "HS256",
      }
    );

    return token;
  }
}

export default AuthService;
