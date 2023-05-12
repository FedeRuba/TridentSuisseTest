import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface TokenPayload {
  userId: string;
}

function verifyToken(req: Request, res: Response, next: NextFunction) {
  const access_token = req.cookies.access_token;

  if (!access_token) {
    return res.status(401).json({ error: 'Cookie accesso mancante!' });
  }

  try {
    const decoded = jwt.verify(access_token, 'secret') as TokenPayload;
    req.cookies.userId = decoded.userId;
    next();
  } catch (err) {
    console.log(err)
    return res.status(401).json({ error: 'Invalid token' });
  }
}

export default verifyToken;
