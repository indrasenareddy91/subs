import SearchBar from "../app/Searchbar";
import { fetchRandomMovie, trendingtoday } from "../actions/actions";
import { connection } from "next/server";

import { sql } from "@vercel/postgres";
import random from "random";

export default async function Home() {
  await connection();
  const initialRandomMovie = await fetchRandomMovie();
  const randomMovie = random.choice([...initialRandomMovie]);

  return (
    <main style={{ height: "100%" }}>
      <SearchBar
  
        randomMovie={randomMovie}
      />
    </main>
  );
}
