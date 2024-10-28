import SearchBar from "../app/Searchbar";
import { fetchRandomMovie } from "../actions/actions";

import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import random from "random";

export default async function Home() {
  const initialRandomMovie = await fetchRandomMovie();
  unstable_noStore();
  const randomMovie = random.choice([...initialRandomMovie.data]);
  console.log(randomMovie);
  const { rows: recentdownloads } = await sql`
  SELECT movie_id, movie_name, country
FROM movies
ORDER BY movie_id DESC
LIMIT 5;
`;
  return (
    <main style={{ height: "100%" }}>
      <SearchBar
        initialRandomMovie={randomMovie}
        recentdownloads={recentdownloads}
      />
    </main>
  );
}
