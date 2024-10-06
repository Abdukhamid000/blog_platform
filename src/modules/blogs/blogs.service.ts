import CreateBlogDTO from "./dto/create-blog.dto";
import UpdateBlogDto from "./dto/update-blog.dto";
import { AppDataSource } from "../../data-source";
import { Blog } from "../../entity/blog.entity";
import NotFoundException from "../../shared/exceptions/not-found.exception";
import { User } from "../../entity/user.entity";

class BlogsService {
  private static blogRepo = AppDataSource.getRepository(Blog);
  private static userRepo = AppDataSource.getRepository(User);

  static async createBlog(data: CreateBlogDTO) {
    const { author_id } = data;
    const user = await this.userRepo.findOneBy({ id: author_id });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return await this.blogRepo.save(data);
  }

  static async getAllBlogs(offset = 0, limit = 10) {
    const [blogs, total] = await this.blogRepo.findAndCount({
      skip: offset,
      take: limit,
    });

    return { blogs, total, limit, offset };
  }

  static async updateBlog(data: UpdateBlogDto, id: string) {
    const res = await this.blogRepo.update(id, data);
    if (res.affected === 0) {
      throw new NotFoundException("Blog not found");
    }
    return await this.blogRepo.findOneBy({ id });
  }

  static async deleteBlog(id: string) {
    const user = await this.blogRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException("Blog not found");
    }
    await this.blogRepo.delete(id);
    return user;
  }
}

export default BlogsService;
