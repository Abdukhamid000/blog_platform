import { IsEmail, IsNotEmpty, Length, Min } from "class-validator";

export class LoginUserDTO {
  @IsNotEmpty({ message: "email is required" })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: "password is required" })
  @Length(6, 10, { message: "password must be between 6 and 10 characters" })
  password: string;
}
