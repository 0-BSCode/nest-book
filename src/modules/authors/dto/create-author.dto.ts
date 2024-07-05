import { Gender } from 'src/database/models/author.model';
import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;
}
