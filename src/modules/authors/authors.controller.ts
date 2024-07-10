import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
export class AuthorsController {
  private logger = new Logger(AuthorsController.name);
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  fetchAll() {
    this.logger.verbose('Fetching all authors');
    return this.authorsService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    this.logger.verbose(`Fetching author with ID ${id}`);
    return this.authorsService.findOneById(id);
  }

  @Post()
  createOne(@Body(ValidationPipe) createAuthorDto: CreateAuthorDto) {
    this.logger.verbose(
      `Creating author with info: ${JSON.stringify(createAuthorDto)}`,
    );
    return this.authorsService.createOne(createAuthorDto);
  }

  @Put(':id')
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateAuthorDto: UpdateAuthorDto,
  ) {
    this.logger.verbose(
      `Updating author with ID ${id} with info: ${JSON.stringify(updateAuthorDto)}`,
    );
    return this.authorsService.updateOne(id, updateAuthorDto);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    this.logger.verbose(`Deleting author with ID ${id}`);
    return this.authorsService.deleteOne(id);
  }
}
