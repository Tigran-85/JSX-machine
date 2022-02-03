import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Price } from './price.entity';
import { Repository } from 'typeorm';
import { CreatePriceDto } from './dto/create_price.dto';
import { UpdatePriceDto } from './dto/update_price.dto';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(Price) private readonly priceRepo: Repository<Price>,
  ) {}
  async createPrice(price: CreatePriceDto) {
    await this.priceRepo.save(price);
    return this.priceRepo.create(price);
  }
  async GetPrice() {
    return this.priceRepo.find();
  }

  async updatePrice(id: number, price: number) {
    try {
      const data = await this.priceRepo.update({ id }, { price });
      if (data && data.affected > 0) {
        const updated = await this.priceRepo.findOne(id);
        return {
          message: 'Updated is success',
          data: updated,
        };
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
