import { verify } from 'jsonwebtoken';
import config from '../config';
import 'dotenv/config';

export function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    const decodedToken = verify(token, config.access_secret);
    req.headers.user = {
      id: decodedToken.id,
      isAdmin: decodedToken.isAdmin,
      isVerified: decodedToken.isVerified,
    };
    return next();
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token',
    });
  }
}
