import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
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
  private logger = new Logger(BooksController.name);
  constructor(private readonly booksService: BooksService) {}

  @Get()
  fetchAll() {
    this.logger.verbose('Fetching all books');
    return this.booksService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    this.logger.verbose(`Fetching book with ID ${id}`);
    return this.booksService.findOneById(id);
  }

  @Post()
  createOne(@Body(ValidationPipe) createBookDto: CreateBookDto) {
    this.logger.verbose(
      `Creating book with info: ${JSON.stringify(createBookDto)}`,
    );
    return this.booksService.createOne(createBookDto);
  }

  @Put(':id')
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateBookDto: UpdateBookDto,
  ) {
    this.logger.verbose(
      `Updating book with ID ${id} with info: ${JSON.stringify(updateBookDto)}`,
    );
    return this.booksService.updateOne(id, updateBookDto);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    this.logger.verbose(`Deleting book with ID ${id}`);
    return this.booksService.deleteOne(id);
  }

  @Patch('add-authors/:id')
  addAuthors(
    @Param('id', ParseIntPipe) id: number,
    @Body('authorIds') authorIds: number[],
  ) {
    this.logger.verbose(
      `Adding authors with IDs ${authorIds} to book with ID ${id}`,
    );
    return this.booksService.addAuthors(id, authorIds);
  }

  @Patch('remove-authors/:id')
  removeAuthors(
    @Param('id', ParseIntPipe) id: number,
    @Body('authorIds') authorIds: number[],
  ) {
    this.logger.verbose(
      `Removing authors with IDs ${authorIds} from book with ID ${id}`,
    );
    return this.booksService.removeAuthors(id, authorIds);
  }
}
