import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout";
import { Pokemon } from "../../interfaces";
import styles from "../../styles/PokemonCard.module.css";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
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

  const pokemonTypes = pokemon.types.map((object) => object.type.name);
  const pokemonAbilities = pokemon.abilities.map(
    (object) => object.ability.name
  );

  return (
    <Layout title={pokemon.name}>
      <div className=" w-full lg:max-w-full lg:flex justify-center">
        <div className=" bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className=" sm:flex-row  flex flex-col items-center">
            <div className="flex flex-col items-center ">
              <img
                src={pokemon.sprites.front_default}
                alt="pokemon sprit"
                width={300}
                height={300}
              />
            </div>
            <div className="sm:items-start flex flex-col  justify-center items-center">
              <div className="text-sm px-6 pt-4 pb-2 flex  flex-col justify-center items-center mb-2">
                <p className="text-gray-900 leading-none text-xl capitalize">
                  {pokemon.name}
                </p>
                <p className="text-gray-600 text-sm"># {pokemon.id}</p>
              </div>

              <div className="sm:flex-row  px-6 pt-4 pb-2 flex flex-col justify-center items-center mb-2">
                <h2 className="mr-4"> Types :</h2>
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
              <div className="sm:flex-row px-6 pt-4 pb-2 flex flex-col justify-center items-center mb-2">
                <h2 className="mr-4"> Abilities :</h2>
                {pokemonAbilities.map((type, index) => (
                  <div
                    className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-blue-500 mr-2 capitalize"
                    key={index}
                  >
                    {type}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4 ">
        <button
          className=" bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-30 "
          onClick={() => {
            router.back();
          }}
        >
          Go back
        </button>
      </div>
    </Layout>
  );
};

export default PokemonPage;
