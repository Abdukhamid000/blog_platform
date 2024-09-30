import { AppDataSource } from "../../data-source";
import { User } from "../../entity/user.entity";
import { HttpStatus } from "../../shared/enums/http-status.enum";
import { HttpException } from "../../shared/exceptions/http.exception";
import { CreateUserDTO } from "./dto/create-user.dto";

class UserService {
  private static userRepo = AppDataSource.getRepository(User);

  static async createUser(data: CreateUserDTO) {
    try {
      return await this.userRepo.save(data);
    } catch (err) {
      throw new HttpException("email already exists", HttpStatus.BAD_REQUEST);
    }
  }
}

export default UserService;
