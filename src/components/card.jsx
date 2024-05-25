import { useState, useEffect } from "react";
import PokemonService from "../services/pokemonService";

export default function Card({ pokemon }) {
  const [imageUrl, setImageUrl] = useState();
  const pokemonService = new PokemonService();

  useEffect(() => {
    async function fetchData() {
      const frontSpriteUrl = await pokemonService.getFormUrls(pokemon);
      setImageUrl(frontSpriteUrl);
    }
    fetchData();

  }, [setImageUrl]);

  return (
    <>
      <img src={imageUrl} alt="" />
      <div>{pokemon.name}</div>
    </>
  )
}
