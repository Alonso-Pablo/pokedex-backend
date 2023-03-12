interface Type {
  slot: number;
  type: { 
    name: string;
    ulr: string;
  }
}

interface Sprites {
  back_default: string;
  front_default: string;
}

export interface ExternalPokemonDetailsResponse {
  abilities: unknown[];
  base_experience: number;
  forms: unknown[];
  game_indices: unknown[];
  height: number;
  held_items: unknown[];
  id: number;
  is_default: boolean;
  localtion_area_encounters: string;
  moves: unknown[];
  name: string;
  order: number;
  past_types: unknown[];
  species: unknown;
  sprites: Sprites;
  stats: unknown[];
  types: Type[];
  weight: number;
}