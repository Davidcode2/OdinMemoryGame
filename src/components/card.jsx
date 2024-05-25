export default function Card({ pokemon }) {

  return (
    <>
      <div className="text-center rounded-lg hover:bg-stone-700 cursor-pointer">
        <img src={pokemon.image} alt="" />
        <div>{pokemon.name}</div>
      </div>
    </>
  )
}
