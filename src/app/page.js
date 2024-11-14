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
 SELECT  
    movie_name::text AS movie_name,  -- PostgreSQL specific cast
    MIN(country) AS country,
    MIN(movie_id) AS movie_id,
    ip
FROM movies
WHERE ip IS NOT NULL
  AND movie_name ~ '[A-Za-z]'  -- Ensure movie name contains at least one letter
GROUP BY movie_name, ip
ORDER BY movie_id DESC
LIMIT 4;`;
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
