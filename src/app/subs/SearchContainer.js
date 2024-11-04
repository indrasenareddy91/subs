"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import { searchMovies } from "../../actions/actions";
export default function SearchContainer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = useCallback(
    debounce(async (query) => {
      if (query) {
        setIsLoading(true);

        if (window.abortControllerRef?.current) {
          window.abortControllerRef.current.abort();
        }
        window.abortControllerRef = { current: new AbortController() };

        try {
          const results = await searchMovies(query);
          setSearchResults(results.slice(0, 5));
        } catch (error) {
          if (error.name === "AbortError") {
            console.log("Request was aborted");
          } else {
            console.error(error);
            setError(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300),
    []
  );

  return (
    <div className="inputcontainer absolute top-[5%] left-1/2 -translate-x-1/2 flex justify-end items-center flex-col box-border">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className="subsinputbar"
          type="text"
          style={{
            padding: "7px",
            fontSize: "16px",
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
            outline: "nine",
            background: "white",
            color: "black",
            border: "0px solid white",
            marginBottom: "10px",
            width: "500px",
          }}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleSearch(e.target.value);
          }}
          placeholder="Search for a movie..."
        />
        <button
          type="submit"
          className="searchbtn"
          style={{
            padding: "7px",
            border: "none",
            fontSize: "16PX",
            width: "80px",
            background: "#f1c40f",
            color: "black",
            fontWeight: "bold",
          }}
          onClick={() => handleSearch(searchQuery)}
        >
          Search
        </button>
      </form>

      {error && <p>Error: {error}</p>}
      {searchResults.length > 0 && (
        <>
          {searchResults.map((movie, index) => (
            <Link
              key={index}
              className="sublinks"
              style={{
                width: "100%",
                padding: "10px",
                background: "white",
                color: "black",
                marginBottom: "5px",
              }}
              href={`/subs?q=${movie.id}&bg=${
                movie.backdrop_path?.split("/")[1]?.split(".jpg")[0] || ""
              }&y=${movie?.release_date?.split("-")[0] || ""}&p=${
                movie.poster_path?.split("/")[1]?.split(".jpg")[0] || ""
              }`}
            >
              {movie?.title} ({movie?.release_date?.split("-")[0]})
            </Link>
          ))}
        </>
      )}
    </div>
  );
}
