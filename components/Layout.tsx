import Head from "next/head";
import React from "react";

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

      <div className="header">Header</div>
      <div>{children}</div>
    </>
  );
};

export default Layout;
