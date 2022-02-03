import { Module } from '@nestjs/common';
import { PriceController } from './price.controller';
import { PriceService } from './price.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Price } from './price.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Price])],
  controllers: [PriceController],
  providers: [PriceService],
})
export class PriceModule {}
