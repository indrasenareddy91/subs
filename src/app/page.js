import SearchBar from "../app/Searchbar";
import { fetchRandomMovie } from "../actions/actions";
export default async function Home() {
  const initialRandomMovie = await fetchRandomMovie();
  console.log(initialRandomMovie);
  return (
    <main>
      <SearchBar initialRandomMovie={initialRandomMovie} />
    </main>
  );
}
