import { Book } from './book.model';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToMany(() => Book, (book) => book.authors, {
    onDelete: 'CASCADE',
  })
  books: Book[];
}
