import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {Book} from "./entities/book.entity";
import {BooksService} from "./books.service";
import {CreateBookDto} from "./dto/create-book.dto";
import {UpdateBookDto} from "./dto/update-book.dto";

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {
    }
    @Get()
    getAll(): Book[] {
        return this.booksService.getAll();
    }

    @Get('/:id')
    getOne(@Param('id') bookId: number) {
        return this.booksService.getOne(bookId);
    }

    @Post()
    create(@Body() bookData: CreateBookDto) {
        return this.booksService.create(bookData);
    }

    @Delete('/:id')
    remove(@Param('id') bookId: number) {
        return this.booksService.deleteOne(bookId);
    }

    @Patch('/:id')
    patch(@Param('id') bookId: number, @Body() updateData: UpdateBookDto) {
        return this.booksService.update(bookId, updateData);
    }
}