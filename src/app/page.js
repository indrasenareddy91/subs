import SearchBar from "../app/Searchbar";
import { fetchRandomMovie, trending } from "../actions/actions";

import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import random from "random";
export const revalidate = 43200; // 12 hours

export default async function Home() {
  const initialRandomMovie = await fetchRandomMovie();
  const trendingMovies = await trending();
  console.log(trendingMovies);
  unstable_noStore();
  const trendingnow = random.choice([...trendingMovies]);
  console.log("teting", trendingnow);
  const randomMovie = random.choice([...initialRandomMovie.data]);
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
      <SearchBar
        trending={trendingnow}
        randomMovie={randomMovie}
        recentdownloads={recentdownloads}
      />
    </main>
  );
}
