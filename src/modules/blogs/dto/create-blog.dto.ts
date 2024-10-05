import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBlogDTO {
  @IsString({ message: "title must be a string" })
  @IsNotEmpty({ message: "title is required" })
  title: string;

  @IsString({ message: "content must be a string" })
  @IsNotEmpty({ message: "content is required" })
  content: string;

  @IsOptional()
  @IsArray({ message: "tags must be an array" })
  tags: string[];
}

export default CreateBlogDTO;
