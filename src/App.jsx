import { useState, useEffect } from 'react'
import './App.css'
import PokemonService from './services/pokemonService'
import Card from './components/card'

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const pokemonService = new PokemonService();

  useEffect(() => {
    async function fetchData() {
      const list = await pokemonService.getPokemonObjects();
      setPokemons(list);
      setLoading(false);
    }
    fetchData();
  }, [setPokemons]);

  const shuffleCards = () => {
  }

  return (
    <>
      <div className="absolute m-10">
        <div className="flex gap-x-4 items-center">Score <p className="text-xl text-fuchsia-500">{score}</p></div>
        <div className="flex gap-x-4 items-center">High Score <p className="text-2xl text-green-500">{score}</p></div>
      </div>
      <div className="h-screen flex justify-center">
        {loading && <div className="animate-spin">|</div>}
        <div className="grid grid-cols-5 justify-items-center gap-x-10 my-20">
          {pokemons && pokemons.map(pokemon => <Card key={pokemon.id} pokemon={pokemon} />)}
        </div>
      </div>
    </>
  )
}

export default App
