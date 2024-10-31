import SearchBar from "../app/Searchbar";
import { fetchRandomMovie, trendingtoday } from "../actions/actions";
import { connection } from "next/server";

import { sql } from "@vercel/postgres";
import random from "random";

export default async function Home() {
  await connection();
  const initialRandomMovie = await fetchRandomMovie();
  console.log(initialRandomMovie);
  const trendingmovies = await trendingtoday();
  const trending = random.choice([...trendingmovies]);
  const randomMovie = random.choice([...initialRandomMovie]);
  const { rows: recentdownloads } = await sql`
 SELECT 
    movie_name, 
    MIN(country) AS country,  -- Choose the first country for each (movie_name, ip) pair
    MIN(movie_id) AS movie_id,  -- Choose the first movie_id for each (movie_name, ip) pair
    ip
FROM movies
WHERE ip IS NOT NULL
GROUP BY movie_name, ip
ORDER BY movie_id DESC
LIMIT 4;
`;
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
