import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/database/models/author.model';
import { Repository, In } from 'typeorm';
import { CreateAuthorDto, UpdateAuthorDto } from 'src/database/dto/author.dto';

@Injectable()
export class AuthorsDbService {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
  ) {}

  async findAll(): Promise<Author[]> {
    return await this.authorsRepository.find({
      relations: {
        books: true,
      },
    });
  }

  async findOneById(id: number): Promise<Author | null> {
    return this.authorsRepository.findOne({
      where: {
        id,
      },
      relations: {
        books: true,
      },
    });
  }

  async findManyById(ids: number[]): Promise<Author[]> {
    return this.authorsRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async createOne(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = new Author();

    author.name = createAuthorDto.name;
    author.description = createAuthorDto.description;
    author.gender = createAuthorDto.gender;
    return await this.authorsRepository.save(author);
  }

  async updateOne(updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const author = new Author();
    author.id = updateAuthorDto.id;
    author.name = updateAuthorDto.name;
    author.description = updateAuthorDto.description;
    author.gender = updateAuthorDto.gender;
    return this.authorsRepository.save(author);
  }

  async deleteOne(id: number): Promise<number> {
    await this.authorsRepository.delete(id);
    return id;
  }
}
