import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout";
import { Pokemon } from "../../interfaces";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  console.log(params);
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params?.name}`);
  const pokemon = await res.json();
  return {
    props: { pokemon },
  };
};

type PokemonProps = {
  pokemon: Pokemon;
};

const PokemonPage: React.FC<PokemonProps> = ({ pokemon }) => {
  const router = useRouter();
  console.log(router);

  return (
    <Layout title={pokemon.name}>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt="pokemon sprit" />

      <hr />
      <button onClick={() => router.back()}>Go back</button>
    </Layout>
  );
};

export default PokemonPage;
