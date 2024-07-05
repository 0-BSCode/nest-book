import { Gender } from '../models/author.model';

export class CreateAuthorDto {
  name: string;
  description: string;
  gender: Gender;
}

export class UpdateAuthorDto extends CreateAuthorDto {
  id: number;
}
