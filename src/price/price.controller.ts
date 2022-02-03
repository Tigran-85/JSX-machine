import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PriceService } from './price.service';
import { CreatePriceDto } from './dto/create_price.dto';

@Controller('price')
export class PriceController {
  constructor(private PriceService: PriceService) {}
  @Get('get')
  getPrice() {
    return this.PriceService.GetPrice();
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createPrice(@Body() price: CreatePriceDto) {
    return this.PriceService.createPrice(price);
  }

  @Patch('update/:id')
  @UsePipes(ValidationPipe)
  updatePrice(@Param('id') id: number, @Body('price') price: number) {
    return this.PriceService.updatePrice(id, price);
  }
}
