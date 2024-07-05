import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.booksDbService.findAll();
  }

  async findOneById(id: number): Promise<Book | null> {
    const book = await this.booksDbService.findOneById(id);

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  async createOne(createBookDto: CreateBookDto): Promise<Book | null> {
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

    return this.booksDbService.createOne(dbCreateBookDto);
  }

  async updateOne(
    id: number,
    updateBookDto: UpdateBookDto,
  ): Promise<Book | null> {
    await this.findOneById(id);

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

    return this.booksDbService.updateOne(dbUpdateBookDto);
  }

  async deleteOne(id: number): Promise<number | null> {
    await this.findOneById(id);
    return this.booksDbService.deleteOne(id);
  }

  async addAuthors(id: number, authorIds: number[]): Promise<Book | null> {
    const book = await this.findOneById(id);

    const authors = await this.authorsDbService.findManyById(authorIds);
    if (authors.length !== authorIds.length) {
      throw new NotFoundException(`One or more authors not found`);
    }

    const dbDddAuthorsDto: DbEditBookAuthorsDto = {
      authors,
      book,
    };

    return this.booksDbService.addAuthors(dbDddAuthorsDto);
  }

  async removeAuthors(id: number, authorIds: number[]): Promise<Book | null> {
    const book = await this.findOneById(id);
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
    return this.booksDbService.removeAuthors(dbRemoveAuthorsDto);
  }
}
