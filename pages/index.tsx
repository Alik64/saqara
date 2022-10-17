import { useCallback, useMemo, useState } from "react";
import { GetServerSideProps } from "next";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

import { Pokemon, PokemonData } from "../interfaces";

import styles from "../styles/Home.module.css";
import PokemonList from "../components/PokemonList";
import Layout from "../components/Layout";

type InitialPokemonData = {
  count: number;
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
  const { count } = pokemonData;
  let fetchedPokemons: Pokemon[] = [];

  for (const pokemon of pokemonData.results) {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
    );
    const data = await res.json();
    fetchedPokemons.push(data);
  }
  return { fetchedPokemons, count };
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: { initialPokemonData: await getPokemons(0) },
  };
};

const Home: React.FC<HomeProps> = ({ initialPokemonData }) => {
  const [page, setPage] = useState<number>(0);

  console.log("router", page);

  const { data: pokemons, isLoading } = useQuery(["pokemons", page], () =>
    getPokemons(page)
  );

  const [searchQuery, setSearchQuery] = useState<string>("");

  const cashedFilteredPokemons = useMemo(
    () =>
      pokemons?.fetchedPokemons?.filter((pokemon: any) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery, pokemons]
  );

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
        <select
          name="generations"
          id="generations"
          onChange={(e) => setPage(Number(e.target.value))}
        >
          <option value="">Generations</option>
          <option value={0}>1</option>
          <option value={151}>2</option>
          <option value={251}>3</option>
          <option value={386}>4</option>
          <option value={493}>5</option>
          <option value={649}>6</option>
          <option value={721}>7</option>
          <option value={809}>8</option>
        </select>
      </div>
      <main className={styles.main}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <PokemonList pokemons={cashedFilteredPokemons} />
        )}
      </main>
      <section>
        {page > 0 && <button onClick={prevPageHandler}>Previous page</button>}
        {pokemons?.count && page < pokemons?.count - 20 && (
          <button onClick={nextPageHandler}>Next page</button>
        )}
      </section>
    </Layout>
  );
};

export default Home;
