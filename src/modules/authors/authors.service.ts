import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
  ) {}

  async findAll(): Promise<Author[]> {
    return await this.authorsRepository.find();
  }

  async findOneById(id: number): Promise<Author | null> {
    const author = await this.authorsRepository.findOne({
      where: {
        id,
      },
    });

    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }

    return author;
  }

  async createone(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = new Author();

    author.name = createAuthorDto.name;
    author.description = createAuthorDto.description;
    author.gender = createAuthorDto.gender;
    return await this.authorsRepository.save(author);
  }

  async updateOne(
    id: number,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author | null> {
    await this.findOneById(id);
    const author = new Author();
    author.id = id;
    author.name = updateAuthorDto.name;
    author.description = updateAuthorDto.description;
    author.gender = updateAuthorDto.gender;
    return await this.authorsRepository.save(author);
  }

  async deleteOne(id: number): Promise<number | null> {
    await this.findOneById(id);
    await this.authorsRepository.delete(id);
    return id;
  }
}
