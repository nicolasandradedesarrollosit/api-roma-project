import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class AuthLoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password!: string;
}

export class AuthRegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password!: string;
}

export class CreateSessionDto {
  @IsString()
  idToken!: string;
}
