import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto'; //PartialType 은 베이스 타입이 필요하다.

export class UpdateBookDto extends PartialType(CreateBookDto) {}
