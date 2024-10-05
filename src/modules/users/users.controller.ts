import { Router } from "express";
import { CreateUserDTO } from "./dto/create-user.dto";
import { requestBodyValidator } from "../../shared/validators/request-body.validator";
import UserService from "./users.service";

const UsersController = Router();

UsersController.post(
  "/",
  requestBodyValidator(CreateUserDTO),
  async (req, res) => {
    const user = await UserService.createUser(req.body);
    res.json({ user });
  }
);

export default UsersController;
