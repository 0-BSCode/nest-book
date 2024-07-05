import { Author } from '../models/author.model';
import { Book } from '../models/book.model';

export class CreateBookDto {
  name: string;
  description: string;
  price: number;
  authors: Author[];
}

export class UpdateBookDto extends CreateBookDto {
  id: number;
}

export class EditBookAuthorsDto {
  book: Book;
  authors: Author[];
}
