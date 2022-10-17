import React from "react";
import { Pokemon } from "../interfaces";

type PokemonCardProps = {
  pokemon: Pokemon;
};

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const pokemonTypes = pokemon.types.map((object) => object.type.name);

  return (
    <div>
      <h5>{pokemon.name}</h5>

      <img
        src={pokemon.sprites.front_default}
        alt="Pokemon sprit"
        width={100}
        height={100}
      />
      <div>
        {pokemonTypes.map((type, index) => (
          <div key={index}>{type}</div>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
