import { dataValidation, hashPassword } from './registerService';

test('dataValidation given no params', async () => {
  const result = await hashPassword('password');
  expect(result).toEqual(expect.any(String));
});

test('dataValidation given no params', () => {
  const fnc = () => {
    dataValidation();
  };
  expect(fnc).toThrow('Name, email and password are required.');
});

test('dataValidation given no name', () => {
  const name = undefined;
  const email = 'email';
  const password = 'password';
  const fnc = () => {
    dataValidation(name, email, password);
  };
  expect(fnc).toThrow('Name is required.');
});

test('dataValidation given no email', () => {
  const name = 'name';
  const email = undefined;
  const password = 'password';
  const fnc = () => {
    dataValidation(name, email, password);
  };
  expect(fnc).toThrow('Email is required.');
});

test('dataValidation given no password', () => {
  const name = 'name';
  const email = 'email';
  const password = undefined;
  const fnc = () => {
    dataValidation(name, email, password);
  };
  expect(fnc).toThrow('Password is required.');
});

test('dataValidation given password shorter than 8 characters', () => {
  const name = 'name';
  const email = 'email';
  const password = 'pass';
  const fnc = () => {
    dataValidation(name, email, password);
  };
  expect(fnc).toThrow('Password must be at least 8 characters.');
});

test('dataValidation given correct credentials', () => {
  const name = 'name';
  const email = 'email';
  const password = 'password';
  const fnc = () => {
    dataValidation(name, email, password);
  };
  expect(fnc).not.toThrow(Error);
});
