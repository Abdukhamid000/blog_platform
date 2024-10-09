import {
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
} from "typeorm";
import { User } from "./user.entity";
import { Blog } from "./blog.entity";
@Entity()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @Column()
  user_id: string;

  @Column()
  title: string;

  @Column("text")
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Blog, (blog) => blog.comments)
  blog: Blog;

  @Column()
  blog_id: string;
}
