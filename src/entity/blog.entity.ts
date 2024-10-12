import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Comment } from "./comment.entity";
@Entity()
export class Blog {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.blogs)
  author: User;

  @Column()
  title: string;

  @Column("text")
  content: string;

  @Column("simple-array")
  tags: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Comment, (comment) => comment.blog)
  comments: Comment[];
}
