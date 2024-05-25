import { useState, useEffect } from 'react'
import './App.css'
import PokemonService from './services/pokemonService'
import Card from './components/card'

function App() {
  const [count, setCount] = useState(0)
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const pokemonService = new PokemonService();

  useEffect(() => {
    async function fetchData() {
      const list = await pokemonService.getPokemonsList();
      setPokemons(list);
      setLoading(false);
    }
    fetchData();
  }, [setPokemons]);

  return (
    <>
      {loading && <div className="animate-spin">|</div>}
      {pokemons && pokemons.map(pokemon => <Card pokemon={pokemon} />)}
    </>
  )
}

export default App
