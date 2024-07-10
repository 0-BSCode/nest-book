import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Author } from 'src/database/models/author.model';
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
    try {
      const authors = await this.authorsDbService.findAll();
      return authors;
    } catch (error) {
      if (error instanceof Error) {
        const msg = `Failed to fetch all authors: ${error.message}`;
        throw new InternalServerErrorException(msg);
      }
    }
  }

  async findOneById(id: number): Promise<Author> {
    const author = await this.authorsDbService.findOneById(id);

    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }

    return author;
  }

  async findManyById(ids: number[]): Promise<Author[]> {
    try {
      const authors = await this.authorsDbService.findManyById(ids);
      return authors;
    } catch (error) {
      if (error instanceof Error) {
        const msg = `Failed to fetch authors: ${error.message}`;
        throw new InternalServerErrorException(msg);
      }
    }
  }

  async createOne(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const dbCreateAuthorDto: DbCreateAuthorDto = createAuthorDto;

    try {
      const author = await this.authorsDbService.createOne(dbCreateAuthorDto);
      return author;
    } catch (error) {
      if (error instanceof Error) {
        const msg = `Failed to create author: ${error.message}`;
        throw new InternalServerErrorException(msg);
      }
    }
  }

  async updateOne(
    id: number,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author | null> {
    await this.findOneById(id);

    const dbUpdateAuthorDto: DbUpdateAuthorDto = {
      ...updateAuthorDto,
      id,
    };

    try {
      const author = await this.authorsDbService.updateOne(dbUpdateAuthorDto);
      return author;
    } catch (error) {
      if (error instanceof Error) {
        const msg = `Failed to update author with ID ${id}: ${error.message}`;
        throw new InternalServerErrorException(msg);
      }
    }
  }

  async deleteOne(id: number): Promise<number | null> {
    await this.findOneById(id);

    try {
      const authorId = await this.authorsDbService.deleteOne(id);
      return authorId;
    } catch (error) {
      if (error instanceof Error) {
        const msg = `Failed to delete author with ID ${id}: ${error.message}`;
        throw new InternalServerErrorException(msg);
      }
    }
  }
}
