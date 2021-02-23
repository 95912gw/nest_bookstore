import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import {NotFoundException} from "@nestjs/common";

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll',() => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  })

  describe('getOne', () => {
    it('should return a book', () => {
      service.create({
        title: "testBook",
        year: 2021,
        author: "authorBook",
        genres: ["genre1", "genre2"]
      });
      const book = service.getOne(1);
      expect(book).toBeDefined();
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(999)
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Book with id 999 not found.')
      }
    });
  })

  describe('deleteOne', () => {
    it('should delete a book', () => {
      service.create({
        title: "testBook",
        year: 2021,
        author: "authorBook",
        genres: ["genre1", "genre2"]
      });
      const allBooks = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toEqual(allBooks - 1);
    });
    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a book', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: "testBook",
        year: 2021,
        author: "authorBook",
        genres: ["genre1", "genre2"]
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a book', () => {
      service.create({
        title: "testBook",
        year: 2021,
        author: "authorBook",
        genres: ["genre1", "genre2"]
      });
      service.update(1, {title: 'Updated test'});
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated test');
    });
    it('should throw a NotFoundException', () => {
      try {
        service.update(999,{});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
