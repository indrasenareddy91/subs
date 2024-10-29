import SearchBar from "../app/Searchbar";
import { fetchRandomMovie } from "../actions/actions";

import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import random from "random";

export default async function Home() {
  const initialRandomMovie = await fetchRandomMovie();
  unstable_noStore();
  const randomMovie = random.choice([...initialRandomMovie.data]);
  console.log("hello", randomMovie);
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
LIMIT 5;
`;
  return (
    <main style={{ height: "100%" }}>
      <SearchBar randomMovie={randomMovie} recentdownloads={recentdownloads} />
    </main>
  );
}
