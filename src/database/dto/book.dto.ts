import { Author } from '../models/author.model';
import { Book } from '../models/book.model';

export class DbCreateBookDto {
  name: string;
  description: string;
  price: number;
  authors: Author[];
}

export class DbUpdateBookDto extends DbCreateBookDto {
  id: number;
}

export class DbEditBookAuthorsDto {
  book: Book;
  authors: Author[];
}
