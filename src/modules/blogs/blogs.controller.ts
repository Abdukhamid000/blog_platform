import { Router } from "express";
import { requestBodyValidator } from "../../shared/validators/request-body.validator";
import CreateBlogDTO from "./dto/create-blog.dto";
import BlogsService from "./blogs.service";
import { HttpStatus } from "../../shared/enums/http-status.enum";

const BlogsController = Router();

BlogsController.post(
  "/",
  requestBodyValidator(CreateBlogDTO),
  async (req, res) => {
    const blog = await BlogsService.createBlog(req.body);
    res.status(HttpStatus.CREATED).json({ data: blog });
  }
);

export default BlogsController;
