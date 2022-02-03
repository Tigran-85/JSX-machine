import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        algorithm: 'HS256',
      },
    }),
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
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule],
})
export class AuthModule {}
