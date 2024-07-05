import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/database/models/book.model';
import { Repository } from 'typeorm';
import {
  DbCreateBookDto,
  DbEditBookAuthorsDto,
  DbUpdateBookDto,
} from 'src/database/dto/book.dto';

@Injectable()
export class BooksDbService {
  constructor(
    @InjectRepository(Book) private readonly booksRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.booksRepository.find({
      relations: {
        authors: true,
      },
    });
  }

  async findOneById(id: number): Promise<Book> {
    return this.booksRepository.findOne({
      where: {
        id,
      },
      relations: {
        authors: true,
      },
    });
  }

  async createOne(createBookDto: DbCreateBookDto): Promise<Book | null> {
    const book = new Book();
    book.name = createBookDto.name;
    book.description = createBookDto.description;
    book.price = createBookDto.price;
    book.authors = createBookDto.authors;
    return this.booksRepository.save(book);
  }

  async updateOne(updateBookDto: DbUpdateBookDto): Promise<Book> {
    const book = new Book();
    book.id = updateBookDto.id;
    book.name = updateBookDto.name;
    book.description = updateBookDto.description;
    book.price = updateBookDto.price;
    book.authors = updateBookDto.authors;
    return await this.booksRepository.save(book);
  }

  async deleteOne(id: number): Promise<number | null> {
    await this.booksRepository.delete(id);
    return id;
  }

  async addAuthors(addBookAuthorsDto: DbEditBookAuthorsDto): Promise<Book> {
    const book = new Book();
    book.id = addBookAuthorsDto.book.id;
    book.name = addBookAuthorsDto.book.name;
    book.description = addBookAuthorsDto.book.description;
    book.price = addBookAuthorsDto.book.price;
    book.authors = addBookAuthorsDto.authors;
    return this.booksRepository.save(book);
  }

  async removeAuthors(
    removeBookAuthorsDto: DbEditBookAuthorsDto,
  ): Promise<Book> {
    const book = new Book();
    book.id = removeBookAuthorsDto.book.id;
    book.name = removeBookAuthorsDto.book.name;
    book.description = removeBookAuthorsDto.book.description;
    book.price = removeBookAuthorsDto.book.price;
    book.authors = book.authors.filter(
      (author) => !removeBookAuthorsDto.authors.includes(author),
    );
    return this.booksRepository.save(book);
  }
}
