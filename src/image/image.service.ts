import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { Repository } from 'typeorm';
import { promises as fs } from 'fs';
@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image) private readonly imageRepo: Repository<Image>,
  ) {}

  async get_images() {
    return this.imageRepo.find();
  }

  async save_image(file_path, module, language) {
    if (language == 'Ру' || language == 'Арм' || language == 'Груз') {
      const image = new Image();
      image.file = file_path;
      image.module = module;
      image.language = language;
      await this.imageRepo.save(image);
      return {
        message: 'success',
        data: image,
      };
    } else {
      await fs.unlink(file_path);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'language type is not true',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update_image(id, file): Promise<{ data: Image; message: string }> {
    const old_path = await this.imageRepo.findOne(id);
    if (old_path == undefined) {
      await fs.unlink(file);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'nothing found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const data = await this.imageRepo.update({ id }, { file });
    if (data && data.affected > 0) {
      await fs.unlink(old_path.file);
      return {
        message: 'success',
        data: await this.imageRepo.findOne(id),
      };
    }
  }
}
