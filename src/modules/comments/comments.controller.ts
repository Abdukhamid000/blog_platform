import { Router } from "express";
import CommentsService from "./comments.service";
import { routeParamsValidator } from "../../shared/validators/route-params.validator";
import { HttpStatus } from "../../shared/enums/http-status.enum";
import { requestBodyValidator } from "../../shared/validators/request-body.validator";
import CreateCommentDTO from "./dto/create-comments.dto";

const CommentsController = Router();

CommentsController.delete("/:id", routeParamsValidator(), async (req, res) => {
  const comment = await CommentsService.deleteComment({
    userId: req.user.id,
    commentId: req.params.id,
  });

  res.status(HttpStatus.OK).json({ data: comment });
});

CommentsController.patch(
  "/:id",
  routeParamsValidator(),
  requestBodyValidator(CreateCommentDTO),
  async (req, res) => {
    const comment = await CommentsService.updateComment({
      userId: req.user.id,
      commentId: req.params.id,
      content: req.body.content,
    });

    res.status(HttpStatus.OK).json({ data: comment });
  }
);

export default CommentsController;
