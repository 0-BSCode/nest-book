import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { AuthorsModule } from '../authors/authors.module';

@Module({
  imports: [AuthorsModule, TypeOrmModule.forFeature([Book])],
  providers: [BooksService],
})
export class BooksModule {}
