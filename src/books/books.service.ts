import {Injectable, NotFoundException} from '@nestjs/common';
import {Book} from "./entities/book.entity";

@Injectable()
export class BooksService {
    private books: Book[] = []; //books의 type은 배열

    getAll(): Book[] {
        return this.books;
    }

    getOne(id: string): Book {
        const book = this.books.find(book => book.id === parseInt(id)); //string으로 받아온 값을 number로 바꿔줌
        if (!book) {
            throw new NotFoundException(`Book with id ${id} not found.`);
        }
        return book;
    }

    deleteOne(id: string): Boolean {
        this.getOne(id);
        this.books = this.books.filter(book => book.id !== parseInt(id));
        return true;
    }

    create(bookData) {
        this.books.push({
            id: this.books.length + 1,
            ...bookData
        })
    }

    update(id: string, updateData) {
        const book = this.getOne(id);
        this.deleteOne(id);
        this.books.push({...book, ...updateData});
    }
}
