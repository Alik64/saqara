import { useEffect, useMemo, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Pokemon, PokemonData } from "../interfaces";

import styles from "../styles/Home.module.css";

type HomeProps = {
  pokemon: PokemonData;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
  return {
    props: { pokemon: await data.json() },
  };
};

const Home: React.FC<HomeProps> = ({ pokemon }) => {
  const [pokemons, setPokemons] = useState<Pokemon[] | []>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  console.log(pokemon);

  const filteredPokemons = useMemo(() => {
    return pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, pokemons]);

  function createPokemonObject(results: Pokemon[]) {
    results.forEach(async (pokemon) => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      const data = await res.json();
      setPokemons((currentList) => [...currentList, data]);
    });
  }

  useEffect(() => {
    createPokemonObject(pokemon.results);
  }, []);

  console.log("pokemons", pokemons);

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemons</title>
        <meta name="description" content="Pokemon codex app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.search}
        />
      </div>
      <main className={styles.main}>
        {filteredPokemons?.map((pokemon, index) => (
          <div key={index}>
            <h1>{pokemon.name}</h1>
            <img
              src={pokemon.sprites.front_default}
              alt="Pokemon sprit"
              width={100}
              height={100}
            />
          </div>
        ))}
      </main>
    </div>
  );
};

export default Home;
