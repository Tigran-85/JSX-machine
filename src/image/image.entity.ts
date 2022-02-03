import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  module: string;

  @Column()
  language: string;

  @Column()
  file: string;
}
