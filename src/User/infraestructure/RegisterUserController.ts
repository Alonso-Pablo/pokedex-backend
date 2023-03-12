import { Request, Response } from 'express';
import { Service } from 'typedi';
import { Controller } from '../../Shared/domain/Controller'
import { RegisterUserService } from '../application/RegisterUserService'
import { RegisterUserRequest } from './RegisterUserRequest';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

@Service()
export class RegisterUserController implements Controller {
  constructor(
    private readonly registerUserService: RegisterUserService,
  ) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const registerUserRequest: RegisterUserRequest = req.body;
      const tokenAccess = await this.registerUserService.handle(registerUserRequest)
      res.status(StatusCodes.CREATED).send(tokenAccess)
    } catch (e: any) {
      res
        .status(e.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .send(e.message || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
    }
  }
}