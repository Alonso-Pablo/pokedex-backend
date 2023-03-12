import { Express } from 'express';
import Container from 'typedi';
import { PrivateRouteMiddleware } from '../../Auth/infraestructure/PrivateRouteMiddleware';
import { GetPokemonDetailsController } from './GetPokemonDetailsController';
import { GetPokemonsController } from './GetPokemonsController';

export const register = (app: Express) => {
  const getPokemonsController = Container.get(GetPokemonsController);
  const getPokemonDetailsController = Container.get(GetPokemonDetailsController);

  app.get(
    '/pokemons',
    PrivateRouteMiddleware.authenticateToken,
    getPokemonsController.run.bind(getPokemonsController)
  )
  app.get(
    '/pokemons/:name',
    PrivateRouteMiddleware.authenticateToken,
    getPokemonDetailsController.run.bind(getPokemonDetailsController)
  )
};
