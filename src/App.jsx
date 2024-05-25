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
      <div className="h-screen flex justify-center">
        {loading && <div className="animate-spin">|</div>}
        <div className="grid grid-cols-5 justify-items-center gap-x-10 my-20">
          {pokemons && pokemons.map(pokemon => <Card pokemon={pokemon} />)}
        </div>
    </div>
    </>
  )
}

export default App
