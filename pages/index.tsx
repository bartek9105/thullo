import type { NextPage } from "next";
import Head from "next/head";
import AllBoards from "../modules/AllBoards/containers";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <AllBoards />
    </div>
  );
};

export default Home;
