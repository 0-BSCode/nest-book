import { Author } from 'src/modules/authors/entities/author.entity';
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

  @ManyToMany(() => Author)
  @JoinTable()
  authors: Author[];
}
