import CreateBlogDTO from "./dto/create-blog.dto";
import UpdateBlogDto from "./dto/create-blog.dto";
import { AppDataSource } from "../../data-source";
import { Blog } from "../../entity/blog.entity";
import NotFoundException from "../../shared/exceptions/not-found.exception";

class BlogsService {
  private static blogRepo = AppDataSource.getRepository(Blog);

  static async createBlog(data: CreateBlogDTO) {
    return await this.blogRepo.save(data);
  }

  static async getAllBlogs(offset = 0, limit = 10) {
    return await this.blogRepo.find({ skip: offset, take: limit });
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
