import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsString()
  readonly author: string;

  @IsOptional()
  @IsString({ each: true })
  readonly genres: string[];
}
