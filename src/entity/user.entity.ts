import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { UserRole } from "../shared/enums/user-role.enum";
import { Blog } from "./blog.entity";
import { Comment } from "./comment.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => Blog, (blog) => blog.author_id)
  blogs: Blog[];

  @OneToMany(() => Comment, (comment) => comment.user_id)
  comments: Comment[];
}
