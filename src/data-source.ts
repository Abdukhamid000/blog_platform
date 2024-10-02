import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/user.entity";
import { Blog } from "./entity/blog.entity";
import { Comment } from "./entity/comment.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Blog, Comment],
  migrations: [],
  subscribers: [],
});
