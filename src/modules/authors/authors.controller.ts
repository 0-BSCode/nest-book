import {
  Body,
  Controller,
  Delete,
  Get,
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
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  fetchAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.findOneById(id);
  }

  @Post()
  createOne(@Body(ValidationPipe) createAuthorDto: CreateAuthorDto) {
    return this.authorsService.createone(createAuthorDto);
  }

  @Put(':id')
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateAuthorDto: UpdateAuthorDto,
  ) {
    return this.authorsService.updateOne(id, updateAuthorDto);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.deleteOne(id);
  }
}
