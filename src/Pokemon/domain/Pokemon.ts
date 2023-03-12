interface Type {
  slot: number;
  type: { 
    name: string;
    ulr: string;
  }
}

export class Pokemon {
  id: number;
  name: string;
  types: Type[];
  height: number;
  weight: number;
  sprites: string[];

  constructor(pokemon: Pokemon) {
    this.id = pokemon.id,
    this.name = pokemon.name,
    this.types = pokemon.types,
    this.height = pokemon.height,
    this.weight = pokemon.weight,
    this.sprites = pokemon.sprites
  }
}
