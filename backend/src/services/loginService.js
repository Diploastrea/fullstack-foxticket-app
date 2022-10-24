import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config';
import { User } from '../models/User';

export function validateInput(email, password) {
  if (!email && !password) throw Error('All fields are required.');
  if (!email) throw Error('Email is required.');
  if (!password) throw Error('Password is required.');
}

export async function verifyUser(email, password) {
  const user = await User.findOne({
    attributes: ['id', 'password', 'isAdmin', 'isVerified'],
    where: {
      email,
    },
  });
  if (!user) throw Error('Email or password is incorrect.');
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw Error('Email or password is incorrect.');
  return user;
}

export function generateToken(user) {
  const { id, isAdmin, isVerified } = user;
  return jwt.sign(
    {
      id,
      isAdmin,
      isVerified,
    },
    config.access_secret,
    {
      expiresIn: 20 * 60,
    },
  );
}

export const loginService = {
  async loginUser(req) {
    const { email, password } = req.body;
    validateInput(email, password);
    const user = await verifyUser(email, password);
    const accessToken = generateToken(user);
    return {
      status: 'ok',
      token: accessToken,
    };
  },
};
