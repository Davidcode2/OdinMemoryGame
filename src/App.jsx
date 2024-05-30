import { useState, useEffect } from 'react'
import './App.css'
import squirtleImage from './assets/squirtle.png'
import PokemonService from './services/pokemonService'
import Card from './components/card'

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCards, setSelectedCards] = useState([]);
  const [highScore, setHighScore] = useState(0);
  const [page, setPage] = useState(0);
  const pokemonService = new PokemonService();

  if (highScore < selectedCards.length) {
    setHighScore(selectedCards.length);
  }

  useEffect(() => {
    async function fetchData() {
      const list = await pokemonService.getPokemonObjects(page * pokemonService.pageSize);
      setPokemons(list);
      setLoading(false);
    }
    setLoading(true);
    fetchData();
  }, [setPokemons, page]);

  const changeOffset = () => {
    setSelectedCards([]);
    setPage(page + 1);
  }

  const shuffleCards = () => {
    const pokemonsCopy = [...pokemons]
    pokemonsCopy.sort((a,b) => makeRandom(a.id) < makeRandom(b.id));
    setPokemons(pokemonsCopy);
    if (selectedCards.length == pokemonService.pageSize - 1) {
      setPage(page + 1);
    }
  }

  const makeRandom = (x) => {
    const randomNumber = x * Math.random() * 10;
    return randomNumber;
  }

  return (
    <>
      <div className="xl:absolute m-10">
        <div className="flex gap-x-4 items-center">Score <p className="text-xl text-fuchsia-500">{selectedCards.length}</p></div>
        <div className="flex gap-x-4 items-center">High Score <p className="text-2xl text-green-500">{highScore}</p></div>
        <button onClick={changeOffset} className="border border-slate-600 p-4 rounded-lg mt-5">Neue Pokemon laden</button>
      </div>
      <div className="h-screen flex justify-center">
        {loading ? <div className="animate-spin self-center"><img src={squirtleImage} alt=""/></div> :
        <div className="grid md:grid-cols-5 sm:grid-cols-4 grid-cols-3 justify-items-center gap-x-10 xl:my-20 mx-10 xl:mx-0">
          {pokemons && pokemons.map(pokemon => <Card key={pokemon.id} pokemon={pokemon} shuffle={shuffleCards} {...{selectedCards, setSelectedCards}} />)}
        </div>
        }
      </div>
    </>
  )
}

export default App
