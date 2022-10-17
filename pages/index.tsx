import { useCallback, useEffect, useMemo, useState } from "react";
import { GetServerSideProps } from "next";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { Pokemon, PokemonData } from "../interfaces";
import pokeball from "../assets/images/pokeball.png";
import styles from "../styles/Home.module.css";
import PokemonList from "../components/PokemonList";
import Layout from "../components/Layout";
import Image from "next/image";
import Loader from "../components/Loader";

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
  const router = useRouter();

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
    router.push({
      pathname: "/",
      query: `page=` + (page + 20).toString(),
    });
  }, [page]);

  const prevPageHandler = useCallback(() => {
    if (page === 0) {
      return;
    }
    setPage((prevState) => prevState - 20);
    router.push({
      pathname: "/",
      query: `page=` + (page - 20).toString(),
    });
  }, [page]);

  useEffect(() => {
    if (router.query?.page) {
      setPage(Number(router.query.page));
    }
  }, [router.query]);
  return (
    <Layout title="Pokemons">
      <div className="flex justify-center flex-row my-2">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-blue-200 rounded-l-md border border-r-0 border-gray-300 ml-2">
          <Image src={pokeball} alt="pokeball" width={30} height={30} />
        </span>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 mr-2"
          placeholder="Type here to search"
        />

        <select
          className="bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 mr-3"
          name="generations"
          id="generations"
          onChange={(e) => {
            router.push({
              pathname: "/",
              query:
                `
              page=` + e.target.value,
            });
            setPage(Number(e.target.value));
          }}
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
          <Loader />
        ) : (
          <PokemonList pokemons={cashedFilteredPokemons} />
        )}
      </main>
      <section className="flex justify-center my-4">
        {page > 0 && (
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-4 w-24"
            onClick={prevPageHandler}
          >
            Previous
          </button>
        )}
        {pokemons?.count && page < pokemons?.count - 20 && (
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-24"
            onClick={nextPageHandler}
          >
            Next
          </button>
        )}
      </section>
    </Layout>
  );
};

export default Home;
