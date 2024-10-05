import { Router } from "express";
import { requestBodyValidator } from "../../shared/validators/request-body.validator";
import CreateBlogDTO from "./dto/create-blog.dto";

const BlogsController = Router();

BlogsController.post(
  "/",
  requestBodyValidator(CreateBlogDTO),
  async (req, res) => {
    res.send("Hello from blog");
  }
);

export default BlogsController;
