import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { AuthorsService } from '../authors/authors.service';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly booksRepository: Repository<Book>,
    private readonly authorsService: AuthorsService,
  ) {}

  async findAll(): Promise<Book[]> {
    return await this.booksRepository.find();
  }

  async findOneById(id: number): Promise<Book | null> {
    const book = await this.booksRepository.findOne({ where: { id } });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  async createOne(createBookDto: CreateBookDto): Promise<Book | null> {
    const authors = await this.authorsService.findManyById(
      createBookDto.authorIds,
    );

    if (authors.length !== createBookDto.authorIds.length) {
      throw new NotFoundException(`One or more authors not found`);
    }

    const book = new Book();
    book.name = createBookDto.name;
    book.description = createBookDto.description;
    book.price = createBookDto.price;
    book.authors = authors;
    return await this.booksRepository.save(book);
  }

  async updateOne(
    id: number,
    updateBookDto: UpdateBookDto,
  ): Promise<Book | null> {
    await this.findOneById(id);

    const authors = await this.authorsService.findManyById(
      updateBookDto.authorIds,
    );

    if (authors.length !== updateBookDto.authorIds.length) {
      throw new NotFoundException(`One or more authors not found`);
    }

    const book = new Book();
    book.id = id;
    book.name = updateBookDto.name;
    book.description = updateBookDto.description;
    book.price = updateBookDto.price;
    book.authors = authors;
    return await this.booksRepository.save(book);
  }

  async deleteOne(id: number): Promise<number | null> {
    await this.findOneById(id);
    await this.booksRepository.delete(id);
    return id;
  }
}
