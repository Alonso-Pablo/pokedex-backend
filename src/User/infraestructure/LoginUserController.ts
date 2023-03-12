import { Request, Response } from 'express';
import {
  Service
} from 'typedi';
import { Controller } from '../../Shared/domain/Controller';
import { LoginUserService } from '../application/LoginUserService';
import { LoginUserRequest } from './LoginUserRequest';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

@Service()
export class LoginUserController implements Controller {
  constructor(
    private readonly loginUserService: LoginUserService,
  ) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const loginUserRequest: LoginUserRequest = req.body;
      const tokenAccess = await this.loginUserService.handle(loginUserRequest)
      res.status(StatusCodes.OK).send(tokenAccess)
    } catch (e: any) {
      res
        .status(e.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .send(e.message || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
    }
  }
}