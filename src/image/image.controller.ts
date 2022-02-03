import {
  Controller,
  UseInterceptors,
  UploadedFile,
  Post,
  Body,
  Get,
  Patch,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Helper } from 'src/config/upload.config';
import { diskStorage } from 'multer';
import { ImageService } from './image.service';
import { Image } from './image.entity';

@Controller('image')
export class ImageController {
  constructor(private ImageService: ImageService) {}
  @Post('/action/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: Helper.destinationPath,
        filename: Helper.customFileName,
      }),
      fileFilter: Helper.fileFilter,
    }),
  )
  async uploadfile(
    @UploadedFile() file,
    @Body('module') module: Image,
    @Body('language') language: Image,
  ) {
    return this.ImageService.save_image(file.path, module, language);
  }

  @Get('get')
  getPrice() {
    return this.ImageService.get_images();
  }

  @Patch('/action/update/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: Helper.destinationPath,
        filename: Helper.customFileName,
      }),
      fileFilter: Helper.fileFilter,
    }),
  )
  async update_file(@UploadedFile() file, @Param('id') id: number) {
    return this.ImageService.update_image(id, file.path);
  }
}
