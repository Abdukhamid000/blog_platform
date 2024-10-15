import { AppDataSource } from "../../data-source";
import { Blog } from "../../entity/blog.entity";
import { Comment } from "../../entity/comment.entity";
import { User } from "../../entity/user.entity";
import NotFoundException from "../../shared/exceptions/not-found.exception";
import CreateCommentDTO from "./dto/create-comments.dto";
import { ICreateBlogComment, IDeleteUserComment } from "./comments.interface";

class CommentsService {
  private static blogRepo = AppDataSource.getRepository(Blog);
  private static userRepo = AppDataSource.getRepository(User);
  private static commentRepo = AppDataSource.getRepository(Comment);

  static async createComment(data: ICreateBlogComment) {
    const { blogId, userId, content } = data;
    const user = await this.userRepo.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const blog = await this.blogRepo.findOneBy({ id: blogId });
    if (!blog) {
      throw new NotFoundException("Blog not found");
    }

    return await this.commentRepo.save({
      blog: { id: blogId },
      user: { id: userId },
      content,
    });
  }

  static async getBlogComments(id: string) {
    const blog = await this.blogRepo.findOneBy({ id });
    if (!blog) {
      throw new NotFoundException("Blog not found");
    }

    return await this.commentRepo.find({ where: { blog: { id } } });
  }

  private static async getCommentByUser(data: IDeleteUserComment) {
    const { commentId, userId } = data;
    const comment = await this.commentRepo.findOneBy({
      id: commentId,
      user: { id: userId },
    });

    if (!comment) {
      throw new NotFoundException("Comment not found");
    }

    return comment;
  }

  static async deleteComment(data: IDeleteUserComment) {
    const { commentId } = data;
    const comment = await this.getCommentByUser(data);

    await this.commentRepo.delete(commentId);
    return comment;
  }

  static async updateComment(data: IDeleteUserComment & CreateCommentDTO) {
    const { commentId, content } = data;
    const comment = await this.getCommentByUser(data);

    await this.commentRepo.update(commentId, { content });
    return comment;
  }
}

export default CommentsService;
