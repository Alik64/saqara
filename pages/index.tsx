import { useCallback, useMemo, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Pokemon, PokemonData, PokemonSelectedData } from "../interfaces";

import styles from "../styles/Home.module.css";

type HomeProps = {
  fetchedPokemons: Pokemon[];
  data: PokemonSelectedData;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
  const pokemonData: PokemonData = await res.json();
  const { count, next, previous } = pokemonData;
  let fetchedPokemons: Pokemon[] = [];

  for (const pokemon of pokemonData.results) {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
    );
    const data = await res.json();
    fetchedPokemons.push(data);
  }

  return {
    props: { fetchedPokemons, data: { count, next, previous } },
  };
};

const Home: React.FC<HomeProps> = ({ fetchedPokemons, data }) => {
  console.log(data);
  const [pokemons, setPokemons] = useState<Pokemon[] | []>(fetchedPokemons);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loadMore, setLoadMore] = useState(data.next);

  const filteredPokemons = useMemo(
    () =>
      pokemons?.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery, pokemons]
  );

  const getMorePokemons = useCallback(async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);

    data.results.forEach(async (pokemon: Pokemon) => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      const data = await res.json();
      setPokemons((prevState) => [...prevState, data]);
    });
  }, [loadMore]);

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
      <button onClick={() => getMorePokemons()}>Load more</button>
    </div>
  );
};

export default Home;
