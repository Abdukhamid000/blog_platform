import { IsEmail, IsNotEmpty, Length, Min } from "class-validator";

export class CreateBlogDTO {
  @IsNotEmpty({ message: "title is required" })
  title: string;

  @IsNotEmpty({ message: "content is required" })
  content: string;

  tags: string[];
}

export default CreateBlogDTO;
