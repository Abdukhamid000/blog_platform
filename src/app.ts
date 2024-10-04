import express from "express";
import cors from "cors";
import {
  loggerMiddleware,
  errorMiddleware,
  limiterMiddleware,
  notFoundMiddleware,
} from "./shared/middlewares";
import UserController from "./modules/user/user.controller";
import AuthController from "./modules/auth/auth.controller";

const app = express();

// ==== Middlewares ==== //
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
app.use(limiterMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

// ==== Routes ==== //
app.use("/user", UserController);
app.use("/auth", AuthController);

// ==== Error Handler ==== //
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export { app };
