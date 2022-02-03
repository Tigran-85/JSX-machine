import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class Change_passwordDto {
  @IsString()
  @IsNotEmpty()
  old_pass: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  new_pass: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  confirm_pass: string;
}
