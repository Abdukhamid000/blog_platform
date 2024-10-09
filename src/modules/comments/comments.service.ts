import { AppDataSource } from "../../data-source";
import { Blog } from "../../entity/blog.entity";
import { User } from "../../entity/user.entity";

class CommentsService {
  private static blogRepo = AppDataSource.getRepository(Blog);
  private static userRepo = AppDataSource.getRepository(User);

  static async createComment() {}
}
