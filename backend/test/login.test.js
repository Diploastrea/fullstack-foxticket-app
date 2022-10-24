import request from 'supertest';
import app from '../src/app';
import { User } from '../src/models/User';

const mockDb = {
  email: 'user@example.com',
  password: '$2a$10$cMZtVjPNLmvrnnafdLOAo.0E8r6Cly3HNj5HTXFnYoOHtjPpmBwxe',
};

jest.mock('../src/models/User.js');

beforeAll(() => jest.spyOn(User, 'findOne')
  .mockReturnValue(Promise.resolve({
    email: mockDb.email,
    password: mockDb.password,
  })));

afterAll(() => jest.clearAllMocks());

describe('POST /api/login', () => {
  it('responds with status code 200 given valid credentials', (done) => {
    request(app)
      .post('/api/login')
      .send({
        email: 'user@example.com',
        password: '111',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toHaveProperty('status', 'ok');
        expect(res.body).toHaveProperty('token', expect.any(String));
        return done();
      });
  });

  it('responds with status code 400 given invalid credentials', (done) => {
    request(app)
      .post('/api/login')
      .send({
        email: 'user@example.com',
        password: '000',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toHaveProperty('error', 'Email or password is incorrect.');
        return done();
      });
  });

  it('responds with status code 400 given email', (done) => {
    request(app)
      .post('/api/login')
      .send({
        email: 'user@example.com',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toHaveProperty('error', 'Password is required.');
        return done();
      });
  });

  it('responds with status code 400 given password', (done) => {
    request(app)
      .post('/api/login')
      .send({
        password: '111',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toHaveProperty('error', 'Email is required.');
        return done();
      });
  });

  it('responds with status code 400 given empty request body', (done) => {
    request(app)
      .post('/api/login')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toHaveProperty('error', 'All fields are required.');
        return done();
      });
  });
});
