import Head from "next/head";
import Image from "next/image";
import React from "react";
import pokeball from "../assets/images/Pokeballpokeball.svg";
type LayoutProps = {
  content?: string;
  title: string;
  children: JSX.Element | JSX.Element[];
};
const Layout: React.FC<LayoutProps> = ({ children, content, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={"saqara pokemon app" + content} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex justify-center py-4 bg-blue-500">
        <Image src={pokeball} height={50} width={50} />
      </div>
      <div>{children}</div>
    </>
  );
};

export default Layout;
