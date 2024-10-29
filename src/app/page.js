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
 SELECT DISTINCT ON (ip, movie_name) 
    ip,
    movie_name,
    movie_id,
    country
FROM movies
ORDER BY ip, movie_name, movie_id DESC
LIMIT 5;
`;
  return (
    <main style={{ height: "100%" }}>
      <SearchBar randomMovie={randomMovie} recentdownloads={recentdownloads} />
    </main>
  );
}
