import { Request, Response } from 'express';
import { Service } from 'typedi';
import { Controller } from '../../Shared/domain/Controller';
import { GetPokemonsService } from '../application/GetPokemonsService';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

@Service()
export class GetPokemonsController implements Controller {
  constructor(
    private readonly getPokemonsService: GetPokemonsService,
  ) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const limit = req.query['limit'] || '';
      const offset = req.query['offset'] || '';
      
      const response = await this.getPokemonsService.handle(limit, offset)
      res.status(200).send(response);
    } catch(e: any) {
      res
        .status(e.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .send(e.message || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
    }
  }
}