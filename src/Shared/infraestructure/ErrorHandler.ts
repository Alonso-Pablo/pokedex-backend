import { NextFunction, Request, Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { ApiError } from '../domain/ApiError';

export class ErrorHandler {
  static catch(err: ApiError, req: Request, res: Response, next: NextFunction): void {
    if (!err) return next()

    const status: number = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    const body = { message: err.message || getReasonPhrase(status) }
    res.status(status).json(body);
  }
}
