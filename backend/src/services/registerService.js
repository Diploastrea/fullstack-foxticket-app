import bcrypt from 'bcryptjs';
import { User } from '../models/User';

export async function getUserByEmail(email) {
  const emailCheck = await User.findOne({
    attributes: ['id', 'email', 'isAdmin', 'isVerified'],
    where: {
      email,
    },
  });
  if (emailCheck) throw Error('Email already taken.');
}

export async function getUserByUsername(name) {
  const nameCheck = await User.findOne({
    attributes: ['id', 'email', 'isAdmin', 'isVerified'],
    where: {
      name,
    },
  });
  if (nameCheck) throw Error('Name already taken.');
}

export function dataValidation(name, email, password) {
  if (!name && !email && !password) {
    throw Error('Name, email and password are required.');
  } else if (!name) {
    throw Error('Name is required.');
  } else if (!email) {
    throw Error('Email is required.');
  } else if (!password) {
    throw Error('Password is required.');
  } else if (password.length < 8) {
    throw Error('Password must be at least 8 characters.');
  }
}

export async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
  return hashedPassword;
}

export const registerService = {
  async registerUser(req) {
    const { name, email, password } = req.body;
    dataValidation(name, email, password);
    await getUserByEmail(email);
    await getUserByUsername(name);
    const hash = await hashPassword(password);
    await User.create({
      name,
      email,
      password: hash,
    });
    const newUser = await User.findOne({
      attributes: ['id', 'email', 'isAdmin', 'isVerified'],
      where: {
        email,
      },
    });
    return newUser;
  },
};
