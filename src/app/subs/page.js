// pages/posts.js
"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IoArrowDown } from "react-icons/io5";
import jszip from "jszip";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import Image from "next/image";

import "../index.css";
import "./page.css";
function Posts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const [subs, setSubs] = useState("");
  const q = searchParams.get("q");

  useEffect(() => {
    if (q) {
      fetchPostData(q);
    }
  }, [q]);
  const TMDB_API_KEY = process.env.NEXT_PUBLIC_TM; // Replace with your TMDb API key

  const api_key = process.env.NEXT_PUBLIC_api_key;
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

    await fetchMovies(query); // Fetch movies on search submission
  };
  // Construct the search URL

  async function fetchPostData(q) {
    try {
      const [movieResponse, subtitlesResponse] = await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/movie/${q}?api_key=${TMDB_API_KEY}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        ),
        fetch(
          `https://api.subdl.com/api/v1/subtitles?api_key=${api_key}&type=movie&tmdb_id=${q}&subs_per_page=30&languages=en`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        ),
      ]);

      const { backdrop_path, poster_path, release_date } =
        await movieResponse.json();
      const data = await subtitlesResponse.json();
      const realdata = {
        data,
        backdrop_path,
        poster_path,
        release_date,
      };
      setSubs(realdata);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function downloadSrtFromZip(url) {
    toast("Downloading", {
      duration: 1000,
      style: {
        backgroundColor: "#f1c40f",
        color: "black",
      },
    });

    fetch(url)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        return jszip.loadAsync(blob);
      })
      .then((zip) => {
        const srtFile = zip.file(/\.srt$/i); // Look for files with .srt extension (case-insensitive)
        if (srtFile) {
          const srtContent = srtFile[0].async("text");
          srtContent.then((content) => {
            const filename = srtFile[0].name; // Get the filename

            // Create a Blob object with the SRT content
            const srtBlob = new Blob([content], {
              type: "text/plain;charset=utf-8",
            });

            // Create a download link
            const downloadLink = document.createElement("a");
            downloadLink.href = URL.createObjectURL(srtBlob);
            downloadLink.download = filename;
            downloadLink.style.display = "none"; // Hide the link
            document.body.appendChild(downloadLink);
            downloadLink.click();

            document.body.removeChild(downloadLink);
            toast.success("Downloaded!", {
              style: {
                backgroundColor: "#f1c40f",
                color: "black",
              },
            });
          });
        } else {
          console.error("No SRT file found in the zip");
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      {" "}
      <div>
        <Toaster />
      </div>
      <div
        style={{
          backgroundColor: "rgb(20,24,28)",
        }}
      >
        {subs && subs.data?.subtitles?.length > 0 && (
          <>
            <div
              className="logo"
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
                }}
              >
                SUBS
              </span>
            </div>
            <div
              className="inputcontainer"
              style={{
                position: "absolute",
                top: "5%",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                flexDirection: "column",
                boxSizing: "border-box",
              }}
            >
              <form onSubmit={handleSearch} style={{}}>
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
                    width: "500px", // Adjust width as needed
                  }}
                  value={searchQuery}
                  onChange={handleSearch}
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      e.preventDefault();
                      handleSearch(e);
                    }
                  }}
                  placeholder="Search for a  movie..."
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
                  onClick={async (e) => {
                    e.preventDefault();
                    await fetchMovies(searchQuery);
                  }}
                >
                  Search
                </button>
              </form>
              {isLoading && <p>Loading...</p>}
              {error && <p>Error: {error.message}</p>}
              {searchResults.length > 0 && (
                <>
                  {searchResults.map((movie, index) => (
                    <>
                      <Link
                        className="sublinks"
                        style={{
                          width: "100%",
                          padding: "10px",
                          background: "white",
                          color: "black",
                          marginBottom: "5px",
                        }}
                        key={index}
                        target="_blank"
                        href={`/subs?q=${movie.id}`}
                      >
                        {" "}
                        {movie.title}{" "}
                      </Link>
                    </>
                  ))}
                </>
              )}
            </div>

            <div
              style={{
                height: "56vh",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  background: `linear-gradient(to bottom, transparent, transparent,rgb(20,24,28))`,
                  top: "0",
                  left: "0",
                  right: "0",
                  bottom: "0",
                  height: "100%",
                }}
              ></div>
              <div
                className="backdrop"
                style={{
                  backgroundImage: `linear-gradient(to bottom, transparent, transparent,rgb(20,24,28)), url(https://image.tmdb.org/t/p/original${subs.backdrop_path})`,
                  backgroundSize: "cover",
                  height: "55vh",
                }}
              ></div>
            </div>
            <div
              className="infoContainer"
              style={{
                display: "flex",
                gap: "30px",
                boxSizing: "border-box",
                marginTop: "-120px",
                marginLeft: "19%",
              }}
            >
              {" "}
              <img
                className="poster"
                src={`https://image.tmdb.org/t/p/w500${subs.poster_path}`}
                alt="Poster"
                style={{
                  height: "210px",
                  width: "150px",
                }}
              />
              <span
                className="moviename"
                style={{
                  fontWeight: "bold",
                  fontSize: "2.6rem",
                }}
              >
                {subs.data.results[0].name}
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.6rem",
                  }}
                  className="year"
                >
                  {subs.release_date.split("-")[0]}
                </div>
                <div
                  className="dontShowIthereInMobile"
                  style={{
                    marginTop: "10px",
                  }}
                >
                  <span
                    style={{
                      background: "#f1c40f",
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "15px",
                      padding: "3px 12px 3px 12px",
                      marginLeft: "5px",
                    }}
                  >
                    English
                  </span>
                  {subs.data.subtitles.map((sub, index) => (
                    <>
                      {" "}
                      <button
                        onClick={() =>
                          downloadSrtFromZip(`https://dl.subdl.com${sub.url}`)
                        }
                        className="subs"
                        key={index}
                      >
                        <IoArrowDown
                          style={{
                            marginBottom: "-2.2px",
                            marginRight: "4px",
                          }}
                        />

                        {sub.release_name}
                      </button>
                    </>
                  ))}
                </div>
              </span>
            </div>
            <div
              className="ShowIthereInMobile"
              style={{
                display: "none",
              }}
            >
              <span
                style={{
                  background: "#f1c40f",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "15px",
                  padding: "3px 12px 3px 12px",
                }}
              >
                English
              </span>
              <div
                style={{
                  marginTop: "10px",
                }}
              >
                {" "}
                {subs.data.subtitles.map((sub, index) => (
                  <button
                    onClick={() =>
                      downloadSrtFromZip(`https://dl.subdl.com${sub.url}`)
                    }
                    className="subsinpage"
                    key={index}
                  >
                    <span
                      style={{
                        display: "none",
                      }}
                    >
                      {" "}
                      <IoArrowDown
                        style={{
                          marginBottom: "-2.2px",
                          marginRight: "4px",
                        }}
                      />
                    </span>
                    <span> {sub.release_name} </span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
        {subs && !subs.data?.subtitles?.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100vh",
              gap: "30px",
              background: "rgb(235,179,39)",
            }}
          >
            <Image
              src="/notfound.png"
              alt="notfound"
              width={330}
              className="not found"
              height={330}
              style={{
                marginTop: "-100px",
                transform: "rotate(30deg)",
              }}
            />
            <h2
              style={{
                color: "black",
                textAlign: "center",
              }}
            >
              Sorry there are no subtitles available for this film yet!
            </h2>
          </div>
        )}
      </div>
    </>
  );
}

export default Posts;
