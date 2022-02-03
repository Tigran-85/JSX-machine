import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  result;
}
