import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Pokemon } from "../interfaces";
import PokemonCard from "./PokemonCard";

interface PokemonListProps {
  pokemons: Pokemon[] | undefined;
}
const PokemonList: React.FC<PokemonListProps> = ({ pokemons }) => {
  return (
    <div>
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
