import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
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
