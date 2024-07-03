import { IsEnum, IsString, MinLength } from 'class-validator';
import { Gender } from '../entities/author.entity';

export class UpdateAuthorDto {
  @IsString()
  @MinLength(5)
  name: string;

  @IsString()
  description: string;

  @IsEnum(Gender)
  gender: Gender;
}
