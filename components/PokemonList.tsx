import React from "react";
import Link from "next/link";
import { Pokemon } from "../interfaces";
import PokemonCard from "./PokemonCard";

interface PokemonListProps {
  pokemons: Pokemon[] | undefined;
}
const PokemonList: React.FC<PokemonListProps> = ({ pokemons }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {pokemons &&
        pokemons.map((pokemon: any, index: number) => (
          <Link href={`/pokemons/${pokemon.name}`} key={index}>
            <a>
              <PokemonCard pokemon={pokemon} />
            </a>
          </Link>
        ))}
    </div>
  );
};

export default PokemonList;
