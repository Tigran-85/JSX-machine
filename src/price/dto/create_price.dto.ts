import { IsNotEmpty } from 'class-validator';

export class CreatePriceDto {
  @IsNotEmpty()
  module: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  price: number;
}
