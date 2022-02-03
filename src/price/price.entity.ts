import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Price {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  module: string;

  @Column()
  title: string;

  @Column()
  price: number;
}
