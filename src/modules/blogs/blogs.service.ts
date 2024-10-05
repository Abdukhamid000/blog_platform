import CreateBlogDTO from "./dto/create-blog.dto";
import { AppDataSource } from "../../data-source";
import { Blog } from "../../entity/blog.entity";

class BlogsService {
  private static blogRepo = AppDataSource.getRepository(Blog);

  static async createBlog(data: CreateBlogDTO) {
    return await this.blogRepo.save(data);
  }
}

export default BlogsService;
