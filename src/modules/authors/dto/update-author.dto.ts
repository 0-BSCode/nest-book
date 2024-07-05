import { IsEnum, IsString, MinLength } from 'class-validator';
import { Gender } from 'src/database/models/author.model';

export class UpdateAuthorDto {
  @IsString()
  @MinLength(5)
  name: string;

  @IsString()
  description: string;

  @IsEnum(Gender)
  gender: Gender;
}
