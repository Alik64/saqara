import Link from "next/link";
import React from "react";

const Error = () => {
  return (
    <>
      <div>Error</div>

      <Link href={"/"}>
        <a>Home page</a>
      </Link>
    </>
  );
};

export default Error;
