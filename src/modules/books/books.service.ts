import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Book } from 'src/database/models/book.model';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksDbService } from 'src/database/services/books-db/books-db.service';
import { AuthorsDbService } from 'src/database/services/authors-db/authors-db.service';
import {
  DbCreateBookDto,
  DbEditBookAuthorsDto,
  DbUpdateBookDto,
} from 'src/database/dto/book.dto';

@Injectable()
export class BooksService {
  constructor(
    private readonly booksDbService: BooksDbService,
    private readonly authorsDbService: AuthorsDbService,
  ) {}

  async findAll(): Promise<Book[]> {
    try {
      const books = await this.booksDbService.findAll();
      return books;
    } catch (error) {
      if (error instanceof Error) {
        const msg = `Failed to fetch all books: ${error.message}`;
        throw new InternalServerErrorException(msg);
      }
    }
  }

  async findOneById(id: number): Promise<Book | null> {
    try {
      const book = await this.booksDbService.findOneById(id);

      if (!book) {
        throw new NotFoundException(`Book with ID ${id} not found`);
      }

      return book;
    } catch (error) {
      if (error instanceof Error) {
        const msg = `Failed to fetch book with ID ${id}: ${error.message}`;
        if (error instanceof NotFoundException) {
          throw new NotFoundException(msg);
        }
        throw new InternalServerErrorException(msg);
      }
    }
  }

  async createOne(createBookDto: CreateBookDto): Promise<Book | null> {
    try {
      const authors = await this.authorsDbService.findManyById(
        createBookDto.authorIds,
      );

      if (authors.length !== createBookDto.authorIds.length) {
        throw new NotFoundException(`One or more authors not found`);
      }

      const dbCreateBookDto: DbCreateBookDto = {
        name: createBookDto.name,
        description: createBookDto.description,
        price: createBookDto.price,
        authors: authors,
      };

      const newBook = await this.booksDbService.createOne(dbCreateBookDto);
      return newBook;
    } catch (error) {
      if (error instanceof Error) {
        const msg = `Failed to create book: ${error.message}`;
        if (error instanceof NotFoundException) {
          throw new NotFoundException(msg);
        }
        throw new InternalServerErrorException(msg);
      }
    }
  }

  async updateOne(
    id: number,
    updateBookDto: UpdateBookDto,
  ): Promise<Book | null> {
    await this.findOneById(id);

    try {
      const authors = await this.authorsDbService.findManyById(
        updateBookDto.authorIds,
      );

      if (authors.length !== updateBookDto.authorIds.length) {
        throw new NotFoundException(`One or more authors not found`);
      }

      const dbUpdateBookDto: DbUpdateBookDto = {
        id,
        authors,
        ...updateBookDto,
      };

      const updatedBook = await this.booksDbService.updateOne(dbUpdateBookDto);
      return updatedBook;
    } catch (error) {
      if (error instanceof Error) {
        const msg = `Failed to update book with ID ${id}: ${error.message}`;
        if (error instanceof NotFoundException) {
          throw new NotFoundException(msg);
        }
        throw new InternalServerErrorException(msg);
      }
    }
  }

  async deleteOne(id: number): Promise<number | null> {
    await this.findOneById(id);

    try {
      const bookId = await this.booksDbService.deleteOne(id);
      return bookId;
    } catch (error) {
      if (error instanceof Error) {
        const msg = `Failed to delete book with ID ${id}: ${error.message}`;
        throw new InternalServerErrorException(msg);
      }
    }
  }

  async addAuthors(id: number, authorIds: number[]): Promise<Book | null> {
    const book = await this.findOneById(id);

    try {
      const authors = await this.authorsDbService.findManyById(authorIds);
      if (authors.length !== authorIds.length) {
        throw new NotFoundException(`One or more authors not found`);
      }

      const dbDddAuthorsDto: DbEditBookAuthorsDto = {
        authors,
        book,
      };

      const updatedBook = await this.booksDbService.addAuthors(dbDddAuthorsDto);
      return updatedBook;
    } catch (error) {
      if (error instanceof Error) {
        const msg = `Failed to add authors to book with ID ${id}: ${error.message}`;
        if (error instanceof NotFoundException) {
          throw new NotFoundException(msg);
        }
        throw new InternalServerErrorException(msg);
      }
    }
  }

  async removeAuthors(id: number, authorIds: number[]): Promise<Book | null> {
    const book = await this.findOneById(id);

    try {
      const authors = await this.authorsDbService.findManyById(authorIds);
      if (authors.length !== authorIds.length) {
        throw new NotFoundException(`One or more authors not found`);
      }

      const hasAllAuthors = book.authors.every((author) =>
        authorIds.includes(author.id),
      );
      if (!hasAllAuthors) {
        throw new NotFoundException(`Provided author isn't author of book`);
      }

      const dbRemoveAuthorsDto: DbEditBookAuthorsDto = {
        authors,
        book,
      };
      const updatedBook =
        await this.booksDbService.removeAuthors(dbRemoveAuthorsDto);
      return updatedBook;
    } catch (error) {
      if (error instanceof Error) {
        const msg = `Failed to remove authors from book with ID ${id}: ${error.message}`;
        if (error instanceof NotFoundException) {
          throw new NotFoundException(msg);
        }
        throw new InternalServerErrorException(msg);
      }
    }
  }
}
