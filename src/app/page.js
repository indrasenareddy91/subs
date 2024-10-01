import SearchBar from "../app/Searchbar";
import { fetchRandomMovie } from "../actions/actions";
export const dynamic = "force-dynamic";
export default async function Home() {
  const initialRandomMovie = await fetchRandomMovie();
  console.log(initialRandomMovie);
  return (
    <main style={{height:"100vh"}}>
      <SearchBar initialRandomMovie={initialRandomMovie} />
    </main>
  );
}
