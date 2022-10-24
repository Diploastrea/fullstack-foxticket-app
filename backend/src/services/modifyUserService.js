import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { hashPassword } from './registerService';

async function validateInput(name, email, password) {
  if (!name && !email && !password) {
    throw Error('A field is required.');
  }
}

async function modifyEmailAddress(newEmail, userId) {
  const emailExists = await User.findOne({
    where: {
      email: newEmail,
    },
  });
  if (emailExists) {
    throw Error('Email already taken.');
  }
  await User.update({ email: newEmail }, {
    where: {
      id: parseInt(userId, 10),
    },
  });
}

async function modifyUsername(newUsername, userId) {
  const usernameExists = await User.findOne({
    where: {
      name: newUsername,
    },
  });
  if (usernameExists) {
    throw Error('Name already taken.');
  }
  await User.update({ name: newUsername }, {
    where: {
      id: parseInt(userId, 10),
    },
  });
}

async function modifyPassword(newPassword, userId) {
  const user = await User.findOne({
    where: {
      id: parseInt(userId, 10),
    },
  });
  const passwordMatch = await bcrypt.compare(newPassword, user.password);
  if (passwordMatch) {
    throw Error('Please try again with another password!');
  }
  const hashedNewPassword = await hashPassword(newPassword);
  await User.update({ password: hashedNewPassword }, {
    where: {
      id: parseInt(userId, 10),
    },
  });
}

async function modifiedProfileData(userId) {
  const response = await User.findOne({
    attributes: ['id', 'name', 'email'],
    where: { id: userId },
  });
  return response;
}

export const modifyData = {
  async modifyUser(req) {
    const { id } = req.headers.user;
    const { name, email, password } = req.body;
    await validateInput(name, email, password);
    if (email) {
      await modifyEmailAddress(email, id);
    }
    if (name) {
      await modifyUsername(name, id);
    }
    if (password) {
      await modifyPassword(password, id);
    }
    const response = await modifiedProfileData(id);
    return response;
  },
};
