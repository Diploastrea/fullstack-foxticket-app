import request from 'supertest';
import app from '../src/app';
import { Article } from '../src/models/Article';

const mockDb = [
  {
    title: 'Barbie Girl',
    content: 'I am a Barbie girl, in the Barbie world..',
    createdAt: 6,
  },
  {
    title: 'Hakuna Matata',
    content: 'Hakuna Matata! What a wonderful phrase!',
    createdAt: 7,
  },
];

afterAll(() => jest.clearAllMocks());

test('Should respond with 200 and one article, in case number of articles wanted is 1', (done) => {
  jest.spyOn(Article, 'findAll')
    .mockReturnValue(Promise.resolve(
      [
        {
          title: mockDb[0].title,
          content: mockDb[0].content,
          createdAt: mockDb[0].createdAt,
        },
      ],
    ));
  request(app)
    .get('/api/articles/1')
    .expect('Content-type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.body.length).toEqual(1);
      return done();
    });
});

test('Should respond with 200 and 2 articles in case number of articles wanted is 2', (done) => {
  jest.spyOn(Article, 'findAll')
    .mockReturnValue(Promise.resolve(
      [
        {
          title: mockDb[0].title,
          content: mockDb[0].content,
          createdAt: mockDb[0].createdAt,
        },
        {
          title: mockDb[1].title,
          content: mockDb[1].content,
          createdAt: mockDb[1].createdAt,
        },
      ],
    ));
  request(app)
    .get('/api/articles/2')
    .expect('Content-type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.body.length).toEqual(2);
      return done();
    });
});

test('Should respond with 404 in case number of articles is not given as parameter', (done) => {
  request(app)
    .get('/api/articles/')
    .expect(404)
    .end((err) => {
      if (err) return done(err);
      return done();
    });
});

test('Should respond with 400 in case of not receiving any articles', (done) => {
  jest.spyOn(Article, 'findAll')
    .mockReturnValue(Promise.resolve(
      [],
    ));
  request(app)
    .get('/api/articles/0')
    .expect(400)
    .end((err, res) => {
      if (err) {
        return done(err)
          .expect(res.body.length).toEqual(0)
          .toEqual('There is no available article.');
      }
      return done();
    });
});
