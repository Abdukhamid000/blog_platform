import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDTO {
  @IsString({ message: "content must be a string" })
  @IsNotEmpty({ message: "content is required" })
  content: string;
}

export default CreateCommentDTO;
