import SearchBar from "../app/Searchbar";
import { fetchRandomMovie, trendingtoday } from "../actions/actions";
import { connection } from "next/server";

import { sql } from "@vercel/postgres";
import random from "random";

export default async function Home() {
  await connection();
  const initialRandomMovie = await fetchRandomMovie();
  const trendingmovies = await trendingtoday();
  const trending = random.choice([...trendingmovies]);
  const randomMovie = random.choice([...initialRandomMovie]);
  const { rows: recentdownloads } = await sql`
SELECT movie_name, country, movie_id, ip 
FROM latest_movies 
ORDER BY created_at DESC 
LIMIT 5;`;
  return (
    <main style={{ height: "100%" }}>
      <SearchBar
        trending={trending}
        randomMovie={randomMovie}
        recentdownloads={recentdownloads}
      />
    </main>
  );
}
