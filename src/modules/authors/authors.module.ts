import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthorsDbService } from 'src/database/services/authors-db/authors-db.service';

@Module({
  imports: [DatabaseModule],
  providers: [AuthorsService],
  controllers: [AuthorsController],
})
export class AuthorsModule {}
