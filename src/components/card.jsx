export default function Card({ pokemon, shuffle, selectedCards, setSelectedCards }) {

  const selectCard = () => {
    if (selectedCards.includes(pokemon.id)) {
      setSelectedCards([]);
      return;
    }
    const selectedCardsCopy = [...selectedCards];
    selectedCardsCopy.push(pokemon.id);
    setSelectedCards(selectedCardsCopy);
    shuffle();
  }

  return (
    <>
      <div onClick={selectCard} className="text-center rounded-lg hover:bg-stone-700 cursor-pointer">
        <img src={pokemon.image} alt="" />
        <div>{pokemon.name}</div>
      </div>
    </>
  )
}
