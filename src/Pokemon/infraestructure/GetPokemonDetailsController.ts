import { Request, Response } from 'express';
import { Service } from 'typedi';
import { Controller } from '../../Shared/domain/Controller';
import { GetPokemonDetailsService } from '../application/GetPokemonDetailsService';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

@Service()
export class GetPokemonDetailsController implements Controller {
  constructor(
    private readonly getPokemonDetailsService: GetPokemonDetailsService,
  ) {}

  async run(req: Request, res: Response): Promise<void> {
    try {
      const name = req.params['name'];
      if (!name) {
        res.sendStatus(StatusCodes.NOT_FOUND);
        return;
      }

      const response = await this.getPokemonDetailsService.handle(name)
      res.status(200).send(response);
    } catch(e: any) {
      res
        .status(e.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .send(e.message || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
    }
  }
}