import request from 'supertest';
import app from '../src/app';
import { generateToken } from '../src/services/loginService';
import { Product } from '../src/models/Product';

const mockDb = [
  {
    id: 1,
    name: 'Day ticket',
    price: 360,
    duration: 24,
    description: 'You can use this ticket for a whole day!',
    type: 'ticket',
  },
  {
    id: 2,
    name: 'Day ticket',
    price: 360,
    duration: 24,
    description: 'You can use this ticket for a whole day!',
    type: 'ticket',
  },
  {
    id: 3,
    name: 'Day pass',
    price: 360,
    duration: 24,
    description: 'You can use this pass for a whole day!',
    type: 'pass',
  },
  {
    id: 4,
    name: 'Day pass',
    price: 360,
    duration: 24,
    description: 'You can use this pass for a whole day!',
    type: 'pass',
  },
];

test('Should respond with 200 and all products', (done) => {
  const mockSimpleUser = {
    id: 1,
    isAdmin: 1,
    isVerified: 1,
  };
  const token = generateToken(mockSimpleUser);
  jest.spyOn(Product, 'findAll').mockReturnValue(
    Promise.resolve([
      {
        id: mockDb[0].id,
        name: mockDb[0].name,
        price: mockDb[0].price,
        duration: mockDb[0].duration,
        description: mockDb[0].description,
        type: mockDb[0].type,
      },
      {
        id: mockDb[1].id,
        name: mockDb[1].name,
        price: mockDb[1].price,
        duration: mockDb[1].duration,
        description: mockDb[1].description,
        type: mockDb[1].type,
      },
      {
        id: mockDb[2].id,
        name: mockDb[2].name,
        price: mockDb[2].price,
        duration: mockDb[2].duration,
        description: mockDb[2].description,
        type: mockDb[2].type,
      },
      {
        id: mockDb[3].id,
        name: mockDb[3].name,
        price: mockDb[3].price,
        duration: mockDb[3].duration,
        description: mockDb[3].description,
        type: mockDb[3].type,
      },
    ]),
  );
  request(app)
    .get('/api/products')
    .set('Authorization', `Bearer ${token}`)
    .expect('Content-type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.body.length).toEqual(4);
      return done();
    });
});

test('Should respond with 503 and no products', (done) => {
  const mockSimpleUser = {
    id: 1,
    isAdmin: true,
    isVerified: true,
  };
  const token = generateToken(mockSimpleUser);
  jest.spyOn(Product, 'findAll').mockReturnValue(
    Promise.resolve([
    ]),
  );
  request(app)
    .get('/api/products')
    .set('Authorization', `Bearer ${token}`)
    .expect('Content-type', /json/)
    .expect(503)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.body.error).toEqual('There are no available products right now.');
      return done();
    });
});
