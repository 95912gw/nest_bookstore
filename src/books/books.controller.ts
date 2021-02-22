import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {Book} from "./entities/book.entity";
import {BooksService} from "./books.service";

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {
    }
    @Get()
    getAll(): Book[] {
        return this.booksService.getAll();
    }

    @Get('/:id')
    getOne(@Param('id') bookId: string) {
        return this.booksService.getOne(bookId);
    }

    @Post()
    create(@Body() bookData) {
        return this.booksService.create(bookData);
    }

    @Delete('/:id')
    remove(@Param('id') bookId: string) {
        return this.booksService.deleteOne(bookId);
    }

    @Patch('/:id')
    patch(@Param('id') bookId: string, @Body() updateData) {
        return this.booksService.update(bookId, updateData);
    }
}