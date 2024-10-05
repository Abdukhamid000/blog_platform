import { AppDataSource } from "../../data-source";
import { User } from "../../entity/user.entity";
import { HttpStatus } from "../../shared/enums/http-status.enum";
import BadRequestException from "../../shared/exceptions/bad-request.exception";
import { HttpException } from "../../shared/exceptions/http.exception";
import { CreateUserDTO } from "./dto/create-user.dto";

class UsersService {
  private static userRepo = AppDataSource.getRepository(User);

  static async createUser(data: CreateUserDTO) {
    try {
      return await this.userRepo.save(data);
    } catch (err) {
      throw new BadRequestException("email already exists");
    }
  }

  static async getUserByEmail(email: string) {
    return await this.userRepo.findOneBy({ email });
  }
}

export default UsersService;
