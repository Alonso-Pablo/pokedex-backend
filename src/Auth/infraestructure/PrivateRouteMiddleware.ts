import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken'
import { User } from '../../User/domain/User';

export interface AuthInfoRequest extends Request {
  user?: User;
}

export class PrivateRouteMiddleware {
  static MISSING_TOKEN = 'MISSING_TOKEN';
  static INVALID_TOKEN = 'INVALID_TOKEN';

  static authenticateToken(req: AuthInfoRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'] as string;
    if (!authHeader) return res.status(StatusCodes.UNAUTHORIZED).send(PrivateRouteMiddleware.MISSING_TOKEN);

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(StatusCodes.UNAUTHORIZED).send(PrivateRouteMiddleware.MISSING_TOKEN);

    const secret = process.env.TOKEN_SECRET as string;
    jwt.verify(token, secret, (err: any, user: any) => {
      if (err) return res.status(StatusCodes.FORBIDDEN).send(PrivateRouteMiddleware.INVALID_TOKEN);

      req.user = user;

      next()
    })
  }
}