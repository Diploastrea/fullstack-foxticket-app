import request from 'supertest';
import app from '../src/app';
import { User } from '../src/models/User';

const mockDb = {
  name: 'testuser',
  email: 'test@test.com',
  password: 'testpassword',
};

jest.mock('../src/models/User.js');

beforeAll(() => jest.spyOn(User, 'findOne')
  .mockReturnValue(Promise.resolve({
    name: mockDb.name,
    email: mockDb.email,
    password: mockDb.password,
  })));

afterAll(() => jest.clearAllMocks());

describe('POST /api/register email tests : ', () => {
  it('responds with status code 400 given email is already taken', (done) => {
    const registerData = {
      name: 'uniqueTestuser',
      email: 'test@test.com',
      password: 'testpassword',
    };
    request(app)
      .post('/api/register')
      .send(registerData)
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual('Email already taken.');
        return done();
      });
  });

  it('responds with status code 400 given no email', (done) => {
    const registerData = {
      name: 'testuser',
      password: 'testpassword',
    };
    request(app)
      .post('/api/register')
      .send(registerData)
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual('Email is required.');
        return done();
      });
  });
});

describe('POST /api/register name tests', () => {
  it('responds with status code 400 given name is already taken', (done) => {
    const registerData = {
      name: 'testuser',
      email: 'test@uniqueEmail.com',
      password: 'testpassword',
    };
    request(app)
      .post('/api/register')
      .send(registerData)
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err).expect(res.body).toEqual('Name already taken.');
        return done();
      });
  });

  it('responds with status code 400 given no name', (done) => {
    const registerData = {
      email: 'test@uniqueEmail.com',
      password: 'testpassword',
    };
    request(app)
      .post('/api/register')
      .send(registerData)
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual('Name is required.');
        return done();
      });
  });
});

describe('POST /api/register password tests', () => {
  it('responds with status code 400 given password with fewer than 8 characters', (done) => {
    const registerData = {
      name: 'uniqueTestUser',
      email: 'test@uniqueEmail.com',
      password: 'testp',
    };
    request(app)
      .post('/api/register')
      .send(registerData)
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual('Password must be at least 8 characters.');
        return done();
      });
  });

  it('responds with status code 400 given no password', (done) => {
    const registerData = {
      name: 'testuser',
      email: 'test@uniqueEmail.com',
    };
    request(app)
      .post('/api/register')
      .send(registerData)
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual('Password is required.');
        return done();
      });
  });
});

describe('POST /api/register', () => {
  it('responds with status code 200 given correct credentials', (done) => {
    const registerData = {
      name: 'uniqueTestUser',
      email: 'test@uniqueEmail.com',
      password: 'testpassword123f',
    };
    request(app)
      .post('/api/register')
      .send(registerData)
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .end((err) => {
        if (err) return done(err);
        expect(200);
        return done();
      });
  });

  it('responds with defined body ', (done) => {
    const registerData = {
      name: 'uniqueTestUser',
      email: 'test@uniqueEmail.com',
      password: 'testpassword123f',
    };
    request(app)
      .post('/api/register')
      .send(registerData)
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toBeDefined();
        return done();
      });
  });
});
