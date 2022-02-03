import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { Change_passwordDto } from './dto/change_password.dto';
import { Forgot_passwordDto } from './dto/forgot_password.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @Post('login')
  async login(@Body() admin: AuthDto) {
    return this.authService.login(admin);
  }
  @UsePipes(ValidationPipe)
  @Patch('change_password')
  async change_password(@Body() admin: Change_passwordDto) {
    return this.authService.change_password(admin);
  }
  @Post('email-forgot-password')
  async email_forgot_password() {
    return this.authService.sent_email_forgot_password();
  }
  @UsePipes(ValidationPipe)
  @Post('forgot-password')
  async forgot_password(@Body() admin: Forgot_passwordDto) {
    return this.authService.forgot_password(admin);
  }
}
