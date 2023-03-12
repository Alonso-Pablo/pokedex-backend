export interface PokemonResume {
  name: string;
  url: string;
}

export interface ExternalPokemonListResponse {
  count: number,
  next: string | null,
  previous: string | null,
  results: PokemonResume[];
}
