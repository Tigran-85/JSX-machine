import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'localhost',
        port: 465,
        secure: true,
        service: 'Gmail',
        auth: {
          user: 'araqelyankatarina@gmail.com',
          pass: 'TerHisusEsSirumEmQez',
        },
      },
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
