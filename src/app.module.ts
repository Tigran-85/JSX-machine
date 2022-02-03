import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { PriceModule } from './price/price.module';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageController } from './image/image.controller';
import { ImageModule } from './image/image.module';
import { ImageService } from './image/image.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    EmailModule,
    AuthModule,
    PriceModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
