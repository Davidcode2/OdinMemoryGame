export default class PokemonService {
  pokemonListUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0';

  async getPokemonsList() {
    const res = await fetch(this.pokemonListUrl);
    const json = await res.json();
    const pokemonsList = json.results;
    const pokeUrls = pokemonsList.map((entry) => entry.url);
    const pokemons = pokeUrls.map(async (url) => {
      const pokemon = await this.getPokemon(url);
      return pokemon;
    });
    return Promise.all(pokemons);
  }

  async getFormUrls(pokemon) {
    const res = await fetch(pokemon.forms[0].url);
    const json = await res.json();
    const frontSpriteUrl = json.sprites.front_default;
    return frontSpriteUrl;
  }

  async getPokemon(url) {
    const res = await fetch(url);
    const pokemon = await res.json();
    return pokemon;
  }
}
