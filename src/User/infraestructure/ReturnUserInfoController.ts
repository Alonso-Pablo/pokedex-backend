import { Response } from 'express';
import { Service } from 'typedi';
import { AuthInfoRequest } from '../../Auth/infraestructure/PrivateRouteMiddleware';
import { Controller } from '../../Shared/domain/Controller';
import { ReturnUserInfoService } from '../application/ReturnUserInfoService';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

@Service()
export class ReturnUserInfoController implements Controller {
  constructor(
    private readonly returnUserService: ReturnUserInfoService,
  ) {}

  async run(req: AuthInfoRequest, res: Response): Promise<void> {
    try {
      const nickname = req.user!.nickname
      const response = await this.returnUserService.handle(nickname)
      res.status(StatusCodes.OK).send(response)
    } catch (e: any) {
      res
        .status(e.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .send(e.message || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
    }
  }
}