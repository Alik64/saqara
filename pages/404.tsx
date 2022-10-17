import Image from "next/image";
import Link from "next/link";
import React from "react";
import pokeball from "../assets/images/Pokeballpokeball.svg";
import Layout from "../components/Layout";
const Error = () => {
  return (
    <Layout title="Ooops">
      <div className="flex items-center justify-center mt-28 w-screen flex-col">
        <h1 className="text-5xl mb-5">Sorry</h1>
        <div className="flex items-center mb-5 ">
          <span className="text-9xl">4</span>
          <Image src={pokeball} alt="" width={300} height={300} />
          <span className="text-9xl">4</span>
        </div>
        <h1 className="text-5xl mb-7">Page not found</h1>

        <Link href={"/"}>
          <button className=" bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-100 ">
            Back to home page
          </button>
        </Link>
      </div>
    </Layout>
  );
};

export default Error;
