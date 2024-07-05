import { Test, TestingModule } from '@nestjs/testing';
import { BooksDbService } from './books-db.service';

describe('BooksDbService', () => {
  let service: BooksDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksDbService],
    }).compile();

    service = module.get<BooksDbService>(BooksDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
