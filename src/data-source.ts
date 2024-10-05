import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/user.entity";
import { Blog } from "./entity/blog.entity";
import { Comment } from "./entity/comment.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123",
  database: "test",
  synchronize: true,
  logging: false,
  entities: [User, Blog, Comment],
  migrations: [],
  subscribers: [],
});
