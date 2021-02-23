import { Test, TestingModule } from '@nestjs/testing';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
        new ValidationPipe({
          whitelist: true,
          forbidNonWhitelisted: true,
          transform: true,
        })
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Welcome');
  });

  describe('/books', () => {
    it('GET', () => {
      return request(app.getHttpServer())
          .get('/books')
          .expect(200)
          .expect([])
    });
    it('POST 201', () => {
      return request(app.getHttpServer())
          .post('/books')
          .send({
            "title": "titleBook",
            "author": "authorBook",
            "year": 2021,
            "genres": ["genre1", "genre2"]
          })
          .expect(201);
    });
    it('POST 400', () => {
      return request(app.getHttpServer())
          .post('/books')
          .send({
            "title": "titleBook",
            "author": "authorBook",
            "year": 2021,
            "genres": ["genre1", "genre2"],
            "others": "something"
          })
          .expect(400);
    });
    it('DELETE', () => {
      return request(app.getHttpServer())
          .delete('/books')
          .expect(404)
    });
  });

  describe('/books/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer())
          .get('/books/999')
          .expect(404);
    });
    it('GET 404', () => {
      return request(app.getHttpServer())
          .get('/books/1')
          .expect(200);
    });
    it('PATCH', () => {
      return request(app.getHttpServer())
          .patch('/books/1')
          .send({title: "updateBook"})
          .expect(200);
    });
    it('DELETE', () => {
      return request(app.getHttpServer())
          .delete('/books/1')
          .expect(200);
    });
  });
});
