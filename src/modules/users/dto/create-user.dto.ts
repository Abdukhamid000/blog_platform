import { IsEmail, IsNotEmpty, Length, Min } from "class-validator";

export class CreateUserDTO {
  @IsNotEmpty({ message: "username is required" })
  @Length(4, 20, { message: "username must be between 4 and 20 characters" })
  username: string;

  @IsNotEmpty({ message: "email is required" })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: "password is required" })
  @Length(6, 10, { message: "password must be between 6 and 10 characters" })
  password: string;
}
