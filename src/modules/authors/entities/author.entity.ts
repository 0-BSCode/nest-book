import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Gender {
  M = 'male',
  F = 'female',
}

@Entity('authors')
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: Gender;
}
