import {
  IsArray,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

// TODO: Allow fields to not be passed in (ask if this is good practice though)
export class UpdateBookDto {
  @IsString()
  @MinLength(5)
  name: string;

  @IsString()
  description: string;

  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
  })
  @IsPositive()
  price: number;

  @IsArray()
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    {
      each: true,
    },
  )
  authorIds: number[];
}
