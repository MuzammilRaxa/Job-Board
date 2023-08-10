import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// import Settings from './getValidationSettings';
import { JWT_SECRET } from '../../config';

interface DecodedToken {
  userId: string;
}


export const authMiddleware = (req: Request | any, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  console.log('token-->',token)

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    req.userId = decoded.userId;
    console.log('decoded-->',decoded)
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
