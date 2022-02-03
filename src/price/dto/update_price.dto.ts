import { IsNotEmpty } from 'class-validator';

export class UpdatePriceDto {
  @IsNotEmpty()
  price: number;
}
