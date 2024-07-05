import { Module } from '@nestjs/common';
import { AuthorsDbService } from './services/authors-db/authors-db.service';
import { BooksDbService } from './services/books-db/books-db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './models/author.model';
import { Book } from './models/book.model';

@Module({
  imports: [TypeOrmModule.forFeature([Author, Book])],
  providers: [AuthorsDbService, BooksDbService],
  exports: [AuthorsDbService, BooksDbService],
})
export class DatabaseModule {}
