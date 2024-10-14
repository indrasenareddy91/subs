import SearchBar from "../app/Searchbar";
import { fetchRandomMovie } from "../actions/actions";
import RecentDownloads from "./recent.js";
import { sql } from "@vercel/postgres";
export const dynamic = "force-dynamic";
export default async function Home() {
  const initialRandomMovie = await fetchRandomMovie();
  const { recentdownloads } = await sql`
  SELECT DISTINCT ON (movie_name) movie_id, movie_name, country
  FROM movies
  ORDER BY movie_name, movie_id DESC
  LIMIT 5
`;
  console.log(initialRandomMovie);
  return (
    <main style={{ height: "100%" }}>
      <SearchBar
        initialRandomMovie={initialRandomMovie}
        recentdownloads={recentdownloads}
      />
    </main>
  );
}
