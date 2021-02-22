import {Injectable, NotFoundException} from '@nestjs/common';
import {Book} from "./entities/book.entity";
import {CreateBookDto} from "./dto/create-book.dto";
import {UpdateBookDto} from "./dto/update-book.dto";

@Injectable()
export class BooksService {
    private books: Book[] = []; //books의 type은 배열

    getAll(): Book[] {
        return this.books;
    }

    getOne(id: number): Book {
        const book = this.books.find(book => book.id === id);
        if (!book) {
            throw new NotFoundException(`Book with id ${id} not found.`);
        }
        return book;
    }

    deleteOne(id: number): Boolean {
        this.getOne(id);
        this.books = this.books.filter(book => book.id !== id);
        return true;
    }

    create(bookData: CreateBookDto) {
        this.books.push({
            id: this.books.length + 1,
            ...bookData
        })
    }

    update(id: number, updateData: UpdateBookDto) {
        const book = this.getOne(id);
        this.deleteOne(id);
        this.books.push({...book, ...updateData});
    }
}
