import { Module } from '@nestjs/common';
import { AuthorsDbService } from './services/authors-db/authors-db.service';
import { BooksDbService } from './services/books-db/books-db.service';

@Module({
  // providers: [AuthorsDbService, BooksDbService],
  exports: [AuthorsDbService, BooksDbService],
})
export class DatabaseModule {}
