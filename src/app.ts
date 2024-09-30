import express from "express";
import cors from "cors";
import { loggerMiddleware } from "./shared/middlewares/logger.middleware";
import { errorMiddleware } from "./shared/middlewares/error.middleware";
import { notFoundMiddleware } from "./shared/middlewares/not-found.middleware";

import {
  CreateUserDTO,
  requestBodyValidator,
} from "./shared/validators/request-body.validator";
import { AppDataSource } from "./data-source";
import { User } from "./entity/user.entity";

export const app = express();

// ==== Middlewares ==== //
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

// ==== Routes ==== //
app.get("/", async (_req, res) => {
  res.send("Hello World");
});

app.post("/", requestBodyValidator(CreateUserDTO), async (req, res) => {
  const userRepo = AppDataSource.getRepository(User);
  const saved = await userRepo.save(req.body);
  res.json({ user: saved });
});

// ==== Error Handler ==== //
app.use(notFoundMiddleware);
app.use(errorMiddleware);
