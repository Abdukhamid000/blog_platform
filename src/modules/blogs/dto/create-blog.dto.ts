import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

export class CreateBlogDTO {
  @IsUUID(4, { message: "author_id must be a valid UUID" })
  @IsString({ message: "author_id must be a string" })
  @IsNotEmpty({ message: "author_id is required" })
  author_id: string;

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
