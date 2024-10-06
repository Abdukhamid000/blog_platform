import {
  IsArray,
  IsOptional,
  IsNotEmpty,
  IsString,
  IsUUID,
} from "class-validator";

export class UpdateBlogDto {
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
