import { HttpException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthDto } from './dto/auth.dto';
import { Change_passwordDto } from './dto/change_password.dto';
import { Forgot_passwordDto } from './dto/forgot_password.dto';
import { email, password } from './admin.json';
import file from './admin.json';
import fs from 'fs';
import path from 'path';
const currentDir = path.resolve();
const payload = {
  email: email,
};
const secretKey = 'secret';
const expiresIn = 60 * 60 * 24;
@Injectable()
export class AuthService {
  constructor(private readonly mailerService: MailerService) {}

  async login(admin: AuthDto) {
    const isMatch = await bcrypt.compare(admin.password, password);
    if (email == admin.email && isMatch) {
      const token = jwt.sign(payload, secretKey, {
        expiresIn,
      });
      return {
        message: 'Success',
        data: {
          token: token,
        },
      };
    } else {
      throw new HttpException('Invalid email or password', 401);
    }
  }
  async change_password(admin: Change_passwordDto) {
    const isMatch = await bcrypt.compare(admin.old_pass, password);
    if (isMatch) {
      if (admin.new_pass === admin.confirm_pass) {
        const hash = await bcrypt.hash(admin.new_pass, 10);
        file.password = hash;
        fs.writeFile(
          path.join(currentDir, 'src/auth/admin.json'),
          JSON.stringify(file),
          (err) => {
            if (err) console.log(err);
            else {
              console.log('File written successfully\n');
            }
          },
        );
        return {
          message: 'Success',
        };
      } else
        throw new HttpException(
          'new password and confirm password is not Match',
          401,
        );
    } else throw new HttpException('old password is not correct', 401);
  }
  async sent_email_forgot_password() {
    const token = jwt.sign(payload, secretKey, {
      expiresIn,
    });
    try {
      await this.mailerService.sendMail({
        to: 'araqelyankatarina@gmail.com',
        from: 'araqelyankatarina@gmail.com',
        subject: `Message from WebSite( Forgot Password ) ✔`,
        html: `<h2>Forgot your password ❓❗</h2><br><h3>Don't worry, you can restore it by clicking on this link 😁 </h3> <h3><a href="http://localhost:3000/jsxmachines/forgot-password.html?activation-code=${token}">Restore password</a></h3>`,
      });
      return {
        message: 'success',
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  async forgot_password(admin: Forgot_passwordDto) {
    if (admin.new_pass === admin.confirm_pass) {
      const hash = await bcrypt.hash(admin.new_pass, 10);
      file.password = hash;
      fs.writeFile(
        path.join(currentDir, 'src/auth/admin.json'),
        JSON.stringify(file),
        (err) => {
          if (err) console.log(err);
          else {
            console.log('File written successfully\n');
          }
        },
      );
      return {
        message: 'Success',
      };
    } else
      throw new HttpException(
        'new password and confirm password is not Match',
        401,
      );
  }
}
