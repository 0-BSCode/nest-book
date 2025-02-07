import { Author } from './author.model';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'double precision',
  })
  price: number;

  @ManyToMany(() => Author, (author) => author.books)
  @JoinTable()
  authors: Author[];
}
