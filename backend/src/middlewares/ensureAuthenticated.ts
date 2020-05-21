import { Request, Response, NextFunction, request } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { secret } = authConfig.jwt;
    const decoded = verify(token, secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    next();
  } catch (err) {
    throw new Error('Invalid JWT');
  }
}

export default ensureAuthenticated;
