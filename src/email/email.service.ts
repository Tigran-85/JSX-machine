import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailDto } from './dto/email.dto';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendEmail(email: EmailDto) {
    try {
      await this.mailerService.sendMail({
        to: 'araqelyankatarina@gmail.com',
        from: 'araqelyankatarina@gmail.com',
        subject: `Message from WebSite(deliver: ${email.name})✔`,
        text: email.message,
        html: `<h3><b>Name -\t</b>${email.name} <br> <b>Email -\t</b>${email.email} <br> <b>Message -\t</b>${email.message} <br> <b>RESULT -\t</b>${email.result}</h3>`,
      });
      return {
        message: 'success',
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
