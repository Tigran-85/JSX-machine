import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { ImageController } from './image.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [ImageService],
  controllers: [ImageController],
})
export class ImageModule {}
