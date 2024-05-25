export default class PokemonService {
  pokemonListUrl = 'https://pokeapi.co/api/v2/pokemon?limit=25&offset=0';

  async getPokemonObjects() {
    const list = await this.getPokemonsList();
    const urls = await this.getPokemonUrls(list);
    const pokemons = await this.getPokemons(urls)
    const pokemonsObjects = this.makePokemonObject(pokemons);
    return pokemonsObjects;
  }

  async getPokemonsList() {
    const res = await fetch(this.pokemonListUrl);
    const json = await res.json();
    const pokemonsList = json.results;
    return pokemonsList;
  }

  async getPokemonUrls(pokemonsList) {
    const pokeUrls = pokemonsList.map((entry) => entry.url);
    return pokeUrls;
  }

  async getPokemons(urls) {
    const pokemons = urls.map(async (url) => {
      const pokemon = await this.getPokemon(url);
      return pokemon;
    });
    return Promise.all(pokemons);
  }

  async getFormUrl(pokemon) {
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

  async makePokemonObject(pokemons) {
    const pokemonObjects = pokemons.map(async (pokemon) => { 
      return {
        image: await this.getFormUrl(pokemon),
        name: pokemon.name,
        id: pokemon.id
      }
    });
    return Promise.all(pokemonObjects);
  }
}
