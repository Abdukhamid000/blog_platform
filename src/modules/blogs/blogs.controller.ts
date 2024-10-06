import { Router } from "express";
import { requestBodyValidator } from "../../shared/validators/request-body.validator";
import CreateBlogDTO from "./dto/create-blog.dto";
import BlogsService from "./blogs.service";
import { HttpStatus } from "../../shared/enums/http-status.enum";
import { routeParamsValidator } from "../../shared/validators/route-params.validator";
import { routeQueryValidator } from "../../shared/validators/route-query.validator";

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
  const blogs = await BlogsService.getAllBlogs(Number(offset), Number(limit));
  res.status(HttpStatus.OK).json({ data: blogs });
});

BlogsController.patch("/:id", routeParamsValidator(), async (req, res) => {
  const blog = await BlogsService.updateBlog(req.body, req.params.id);
  res.status(HttpStatus.OK).json({ data: blog });
});

BlogsController.delete("/:id", routeParamsValidator(), async (req, res) => {
  const blog = await BlogsService.deleteBlog(req.params.id);
  res.status(HttpStatus.OK).json({ data: blog });
});

export default BlogsController;
