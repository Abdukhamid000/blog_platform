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
    const { author_id } = data;
    const blog = await this.blogRepo.findOne({ where: { id, author_id } });

    if (!blog) {
      throw new NotFoundException("Blog not found or you are not the author");
    }

    Object.assign(blog, data);
    return await this.blogRepo.save(blog);
  }

  static async deleteBlog(id: string) {
    const blog = await this.blogRepo.findOneBy({ id });
    if (!blog) {
      throw new NotFoundException("Blog not found");
    }
    await this.blogRepo.delete(id);
    return blog;
  }
}

export default BlogsService;
