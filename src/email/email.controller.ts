import {
  Body,
  Controller,
  Get,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EmailDto } from './dto/email.dto';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}
  @Get()
  @UsePipes(ValidationPipe)
  async SendEmail(@Body() email: EmailDto) {
    return this.emailService.sendEmail(email);
  }
}
