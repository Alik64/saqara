import React from "react";
import { Pokemon } from "../interfaces";

type PokemonCardProps = {
  pokemon: Pokemon;
};

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div>
      <h5>{pokemon.name}</h5>
      <img
        src={pokemon.sprites.front_default}
        alt="Pokemon sprit"
        width={100}
        height={100}
      />
    </div>
  );
};

export default PokemonCard;
