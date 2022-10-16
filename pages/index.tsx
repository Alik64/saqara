import { useCallback, useMemo, useState } from "react";
import { GetServerSideProps } from "next";
import { useQuery } from "react-query";
import Head from "next/head";
import { Pokemon, PokemonData } from "../interfaces";

import styles from "../styles/Home.module.css";
import PokemonList from "../components/PokemonList";
import Layout from "../components/Layout";

type InitialPokemonData = {
  count: number;
  next: string;
  fetchedPokemons: Pokemon[];
};
type HomeProps = {
  initialPokemonData: InitialPokemonData;
};

const getPokemons = async (offset: number) => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
  );
  const pokemonData: PokemonData = await res.json();
  const { count, next } = pokemonData;
  let fetchedPokemons: Pokemon[] = [];

  for (const pokemon of pokemonData.results) {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
    );
    const data = await res.json();
    fetchedPokemons.push(data);
  }
  return { fetchedPokemons, count, next };
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: { initialPokemonData: await getPokemons(0) },
  };
};

const Home: React.FC<HomeProps> = ({ initialPokemonData }) => {
  const [page, setPage] = useState<number>(0);

  const { data: pokemons } = useQuery(
    ["pokemons", page],
    () => getPokemons(page),
    {
      initialData: initialPokemonData,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPokemons = useMemo(
    () =>
      pokemons?.fetchedPokemons?.filter((pokemon: any) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery, pokemons]
  );
  console.log(filteredPokemons);

  const nextPageHandler = useCallback(() => {
    setPage((prevState) => prevState + 20);
  }, [page]);

  const prevPageHandler = useCallback(() => {
    if (page === 0) {
      return;
    }
    setPage((prevState) => prevState - 20);
  }, [page]);
  return (
    <Layout title="Pokemons">
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.search}
          placeholder="Type here to search"
        />
      </div>
      <main className={styles.main}>
        <PokemonList pokemons={filteredPokemons} />
      </main>
      <section>
        {page > 0 && <button onClick={prevPageHandler}>Previous page</button>}
        <button onClick={nextPageHandler}>Next page</button>
      </section>
    </Layout>
  );
};

export default Home;
