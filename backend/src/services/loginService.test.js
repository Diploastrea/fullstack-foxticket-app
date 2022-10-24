import { verify } from 'jsonwebtoken';
import config from '../config';
import { validateInput, generateToken } from './loginService';

test('validateInput given no params', () => {
  const fnc = () => {
    validateInput();
  };
  expect(fnc).toThrow('All fields are required.');
});

test('validateInput given email', () => {
  const email = 'user1@example.com';
  const password = undefined;
  const fnc = () => {
    validateInput(email, password);
  };
  expect(fnc).toThrow('Password is required.');
});

test('validateInput given password', () => {
  const email = undefined;
  const password = '111';
  const fnc = () => {
    validateInput(email, password);
  };
  expect(fnc).toThrow('Email is required.');
});

test('validateInput given email and password', () => {
  const email = 'user1@example.com';
  const password = '111';
  const fnc = () => {
    validateInput(email, password);
  };
  expect(fnc).not.toThrow(Error);
});

test('generateToken', () => {
  const input = {
    id: 1,
    isAdmin: true,
    isVerified: true,
  };
  const token = generateToken(input);
  const decodedToken = verify(token, config.access_secret);
  expect(decodedToken.id).toEqual(1);
  expect(decodedToken.isAdmin).toEqual(true);
  expect(decodedToken.isVerified).toEqual(true);
});
