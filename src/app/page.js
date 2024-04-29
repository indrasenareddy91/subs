"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import axios from "axios";
import "./index.css";
import Link from "next/link";
import Image from "next/image";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TM;
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [randomMovie, setRandomMovie] = useState(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const updateQueryParam = (key, value) => {
    router.push({
      pathname: router.pathname, // Preserve current path
      query: {
        ...router.query, // Spread existing query params
        [key]: value, // Update specific query param
      },
    });
  };
  // Get initial search term from URL if present
  useEffect(() => {
    const initialQuery = searchParams?.get("q") || "";
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchRandomMovie = async () => {
      try {
        // Generate a random movie ID between 1 and 5000
        const randomMovieId = Math.floor(Math.random() * 2000) + 1;

        // Fetch details of the random movie
        const movieDetailsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&append_to_response=images&page=2`
        );
        1;
        // Set the random movie state
        const movieData = await movieDetailsResponse.json();
        const rand = Math.floor(Math.random() * 19) + 1;
        const randomMovieData = {
          poster: movieData.results[rand]?.backdrop_path,
          title: movieData.results[rand]?.title,
          year: movieData.results[rand].release_date,
        };

        setRandomMovie(randomMovieData);
      } catch (error) {
        setError(error);
      }
    };

    fetchRandomMovie();
  }, []);
  const fetchMovies = async (query) => {
    setSearchResults("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}&page=1`
      );
      setSearchResults(response.data.results.slice(0, 5));
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const query = event.target.value;
    setSearchQuery(query);
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
    await fetchMovies(query); // Fetch movies on search submission
  };

  const style = {
    height: "100svh",
    width: "100%",
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    objectFit: "cover",
  };
  return (
    <>
      {randomMovie && (
        <img
          src={`https://image.tmdb.org/t/p/original${randomMovie?.poster}`}
          style={style}
        />
      )}
      <div style={style} className="backdrop">
        {randomMovie && (
          <div
            className="random"
            style={{
              position: "absolute",
              top: "8%",
              right: "3%",
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
          >
            {randomMovie.title}
            <div
              style={{
                fontSize: "0.8REM",
                textAlign: "end",
              }}
            >
              {" "}
              {randomMovie.year.split("-")[0]}
            </div>
          </div>
        )}
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "5%",
            width: "75px",
            height: "140px",
            background: "#f1c40f",
          }}
        >
          <span
            style={{
              position: "absolute",
              color: "black",
              bottom: "0",
              fontWeight: "bold",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "22PX",
              zIndex: "20",
            }}
          >
            SUBS
          </span>
        </div>
        <div
          className="inputContaineron"
          style={{
            minHeight: "45vh",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            flexDirection: "column",
            boxSizing: "border-box",
          }}
        >
          <div
            className="description"
            style={{ marginBottom: "20px", fontSize: "26px" }}
          >
            Find perfect subtitles for any movie{" "}
          </div>
          <form className="formContainer" onSubmit={handleSearch}>
            <input
              className="inputbar"
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
                width: "500px", // Adjust width as needed
              }}
              required
              value={searchQuery}
              onChange={handleSearch}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  e.preventDefault();
                  handleSearch(e);
                }
              }}
              placeholder="Search for a movie..."
            />
            <button
              type="submit"
              className="btnf"
              style={{
                padding: "7px",
                border: "none",
                fontSize: "16PX",
                width: "80px",
                background: "#f1c40f",
                color: "black",
                fontWeight: "bold",
              }}
              onClick={async (e) => {
                e.preventDefault();
                await fetchMovies(searchQuery);
              }}
            >
              Search
            </button>
          </form>
        </div>
        {isLoading && <p></p>}
        {error && <p>Error: {error.message}</p>}
        {searchResults.length > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              padding: "10px",
              boxSizing: "border-box",
            }}
          >
            {searchResults.map((movie, index) => (
              <Link
                className="sublinks"
                style={{
                  width: "580px",
                  padding: "10px",
                  boxSizing: "border-box",
                  background: "white",
                  color: "black",
                  margin: "5px",
                }}
                key={index}
                href={`/subs?q=${movie.id}`}
              >
                {movie.title} ({movie?.release_date?.split("-")[0] || ""})
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
