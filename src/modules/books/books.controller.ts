import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  fetchAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOneById(id);
  }

  @Post()
  createOne(@Body(ValidationPipe) createBookDto: CreateBookDto) {
    return this.booksService.createOne(createBookDto);
  }

  @Put(':id')
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.updateOne(id, updateBookDto);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.deleteOne(id);
  }

  @Patch('add-authors/:id')
  addAuthors(
    @Param('id', ParseIntPipe) id: number,
    @Body('authorIds') authorIds: number[],
  ) {
    return this.booksService.addAuthors(id, authorIds);
  }

  @Patch('remove-authors/:id')
  removeAuthors(
    @Param('id', ParseIntPipe) id: number,
    @Body('authorIds') authorIds: number[],
  ) {
    return this.booksService.removeAuthors(id, authorIds);
  }
}
