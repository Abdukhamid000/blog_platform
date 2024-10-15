import { Router } from "express";
import { requestBodyValidator } from "../../shared/validators/request-body.validator";
import CreateBlogDTO from "./dto/create-blog.dto";
import BlogsService from "./blogs.service";
import { HttpStatus } from "../../shared/enums/http-status.enum";
import { routeParamsValidator } from "../../shared/validators/route-params.validator";
import { routeQueryValidator } from "../../shared/validators/route-query.validator";
import UpdateBlogDto from "./dto/update-blog.dto";
import CommentsService from "../comments/comments.service";
import CreateCommentDTO from "../comments/dto/create-comments.dto";

const BlogsController = Router();

BlogsController.post(
  "/",
  requestBodyValidator(CreateBlogDTO),
  async (req, res) => {
    const blog = await BlogsService.createBlog(req.body);
    res.status(HttpStatus.CREATED).json({ data: blog });
  }
);

BlogsController.get("/", routeQueryValidator(), async (req, res) => {
  const { limit = 10, offset = 0 } = req.query;
  const { blogs, ...additional } = await BlogsService.getAllBlogs(
    Number(offset),
    Number(limit)
  );
  res.status(HttpStatus.OK).json({ data: blogs, ...additional });
});

BlogsController.patch(
  "/:id",
  routeParamsValidator(),
  requestBodyValidator(UpdateBlogDto),
  async (req, res) => {
    const blog = await BlogsService.updateBlog(req.body, req.params.id);
    res.status(HttpStatus.OK).json({ data: blog });
  }
);

BlogsController.delete("/:id", routeParamsValidator(), async (req, res) => {
  const blog = await BlogsService.deleteBlog(req.params.id);
  res.status(HttpStatus.OK).json({ data: blog });
});

BlogsController.post(
  "/:id/comments",
  routeParamsValidator(),
  requestBodyValidator(CreateCommentDTO),
  async (req, res) => {
    const comment = await CommentsService.createComment({
      blogId: req.params.id,
      userId: req.user.sub as string,
      content: req.body.content,
    });
    res.status(HttpStatus.OK).json({ data: comment });
  }
);

BlogsController.get(
  "/:id/comments",
  routeParamsValidator(),
  async (req, res) => {
    const comments = await CommentsService.getBlogComments(req.params.id);
    res.status(HttpStatus.OK).json({ data: comments });
  }
);

export default BlogsController;
