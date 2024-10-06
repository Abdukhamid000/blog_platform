import {
  IsArray,
  IsOptional,
  IsNotEmpty,
  IsString,
  IsUUID,
} from "class-validator";

export class UpdateBlogDto {
  @IsUUID(4, { message: "author_id must be a valid UUID" })
  @IsString({ message: "author_id must be a string" })
  @IsNotEmpty({ message: "author_id is required" })
  author_id: string;

  @IsOptional()
  @IsString({ message: "title must be a string" })
  title: string;

  @IsOptional()
  @IsString({ message: "content must be a string" })
  content: string;

  @IsOptional()
  @IsArray({ message: "tags must be an array" })
  tags: string[];
}

export default UpdateBlogDto;
