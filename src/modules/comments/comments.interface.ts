import type { CreateCommentDTO } from "../comments/dto/create-comments.dto";

export interface ICreateBlogComment extends CreateCommentDTO {
  blogId: string;
  userId: string;
}
export interface IDeleteUserComment {
  commentId: string;
  userId: string;
}
