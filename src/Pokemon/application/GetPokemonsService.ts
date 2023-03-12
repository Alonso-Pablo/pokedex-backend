import { Service } from 'typedi';
import fetch from 'node-fetch';
import { ExternalPokemonListResponse, PokemonResume } from '../infraestructure/ExternalPokemonListResponse';
import { ExternalPokemonDetailsResponse } from '../infraestructure/ExternalPokemonDetailsResponse';
import { Pokemon } from '../domain/Pokemon';

@Service()
export class GetPokemonsService {
  constructor() {}

  async handle(limit: any, offset: any) {
    const PokemonApiUrl = process.env.POKEMON_API_URL as string;

    const fetchOptions = {
      method: 'GET',
    }

    const externalResponse = await fetch(
      `${PokemonApiUrl}/pokemon?limit=${limit}&offset=${offset}`,
      fetchOptions
    );
    const externalPokemonList: ExternalPokemonListResponse = await externalResponse.json();

    const pokemons = externalPokemonList.results.map(async ({ url }: PokemonResume) => {
      const response = await fetch(url, {method: 'GET'})
      if (!response.ok) return null;
      return response
        .json()
        .then(({ id, name, types, height, weight, sprites }: ExternalPokemonDetailsResponse) =>
          new Pokemon({
            id,
            name,
            types,
            height,
            weight,
            sprites: [ sprites.front_default, sprites.back_default ],
          })
        )
        .catch(e => null);
    });

    return ({
      count: externalPokemonList.count,
      next: externalPokemonList.next,
      previous: externalPokemonList.previous,
      pokemons: (await Promise.all(pokemons)).filter(pokemon => pokemon !== null)
    });
  }
}