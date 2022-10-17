import React from "react";
import { Pokemon } from "../interfaces";
import styles from "../styles/PokemonCard.module.css";
type PokemonCardProps = {
  pokemon: Pokemon;
};

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const pokemonTypes = pokemon.types.map((object) => object.type.name);

  return (
    <div className="rounded overflow-hidden shadow-lg w-80">
      <div className="mt-2 px-6 py-4 flex justify-between">
        <div
          className={
            `font-bold text-xl mb-2 capitalize text-blue-600 ` +
            styles.pokemonName
          }
        >
          {pokemon.name}
        </div>
        <p className="text-gray-700 text-base">#{pokemon.id}</p>
      </div>
      <img
        className="w-full h-80"
        src={pokemon.sprites.front_default}
        alt="pokemon sprit"
        height={200}
      />

      <div className="px-6 pt-4 pb-2 flex justify-center align-center mb-2">
        {pokemonTypes.map((type, index) => (
          <div
            className={
              `inline-block rounded-full px-3 py-1 text-sm font-semibold text-slate-50 mr-2 ` +
              styles[type]
            }
            key={index}
          >
            {type}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
