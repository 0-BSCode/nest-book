import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsDbService } from './authors-db.service';

describe('AuthorsDbService', () => {
  let service: AuthorsDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorsDbService],
    }).compile();

    service = module.get<AuthorsDbService>(AuthorsDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
