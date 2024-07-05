import { Gender } from '../models/author.model';

export class DbCreateAuthorDto {
  name: string;
  description: string;
  gender: Gender;
}

export class DbUpdateAuthorDto extends DbCreateAuthorDto {
  id: number;
}
