import { Injectable, NotFoundException } from '@nestjs/common';
import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorsDbService } from 'src/database/services/authors-db/authors-db.service';
import {
  DbCreateAuthorDto,
  DbUpdateAuthorDto,
} from 'src/database/dto/author.dto';

@Injectable()
export class AuthorsService {
  constructor(private readonly authorsDbService: AuthorsDbService) {}

  async findAll(): Promise<Author[]> {
    return this.authorsDbService.findAll();
  }

  async findOneById(id: number): Promise<Author | null> {
    const author = await this.authorsDbService.findOneById(id);

    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }

    return author;
  }

  async findManyById(ids: number[]): Promise<Author[]> {
    return this.authorsDbService.findManyById(ids);
  }

  async createOne(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const dbCreateAuthorDto: DbCreateAuthorDto = {
      name: createAuthorDto.name,
      gender: createAuthorDto.gender,
      description: createAuthorDto.description,
    };

    return this.authorsDbService.createOne(dbCreateAuthorDto);
  }

  async updateOne(
    id: number,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author | null> {
    await this.findOneById(id);

    const dbUpdateAuthorDto: DbUpdateAuthorDto = {
      id,
      name: updateAuthorDto.name,
      gender: updateAuthorDto.gender,
      description: updateAuthorDto.description,
    };

    return this.authorsDbService.updateOne(dbUpdateAuthorDto);
  }

  async deleteOne(id: number): Promise<number | null> {
    await this.findOneById(id);
    return this.authorsDbService.deleteOne(id);
  }
}
