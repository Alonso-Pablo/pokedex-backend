import fetch from 'node-fetch';
import { Service } from 'typedi';
import { Pokemon } from '../domain/Pokemon';
import { ExternalPokemonDetailsResponse } from '../infraestructure/ExternalPokemonDetailsResponse';

@Service()
export class GetPokemonDetailsService {
  async handle(pokemonName: string) {
    const PokemonApiUrl = process.env.POKEMON_API_URL as string;

    const fetchOptions = {
      method: 'GET',
    }
    const externalResponse = await fetch(
      `${PokemonApiUrl}/pokemon/${pokemonName}`, fetchOptions
    );
    const { id, name, types, height, weight, sprites }: ExternalPokemonDetailsResponse =
       await externalResponse.json();
    return new Pokemon({
      id,
      name,
      types,
      height,
      weight,
      sprites: [ sprites.front_default, sprites.back_default ],
    })
  }
}