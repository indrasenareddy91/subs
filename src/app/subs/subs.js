"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import "../index.css";
import "./page.css";
import SwapLoader from "./SwapLoader";
import NotAvailable from "./NotAvailable";
import Subswap from "./subshit";
import { searchMovies, findSubs } from "../../actions/actions";
function SubtitlesContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const [lang, setLang] = useState({
    code: "EN",
    language: "English",
  });
  const [subtitlesLoading, setSubsLoading] = useState(false);
  const [realdata, setSubsData] = useState(null);
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const poster = searchParams.get("p");
  const backdrop = searchParams.get("bg");
  const year = searchParams.get("y");

  useEffect(() => {
    function dailogg() {
      const randquote = Math.floor(Math.random() * 39) + 1;
      const data = dailog.quotes[randquote];
      setText(data);
    }
    dailogg();
  }, []);

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
            console.log(error);
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

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.length === 0) {
      setSearchResults([]);
    } else {
      handleSearch(query);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subtitlesData = await findSubs(q, lang);
        setSubsData({
          data: subtitlesData,
          poster_path: poster,
          backdrop_path: backdrop,
          year,
          lang,
        });
        setSubsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (q) fetchData();
  }, [q, lang, poster, backdrop, year]);

  const languages = {
    EN: "English",
    ID: "Indonesian",
    FR: "French",
    IT: "Italian",
    ES: "Spanish",
    ZH: "Chinese",
    DE: "German",
    JA: "Japanese",
    KO: "Korean",
    RU: "Russian",
  };

  return (
    <div className="hide-scrollbar">
      {!realdata && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90svh",
          }}
        >
          <div
            className="quote-container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div className="spinner"></div>
            <p className="quote">"{text.quote}"</p>
            <p className="movie-name">{text.movie}.</p>
          </div>
        </div>
      )}

      <div>
        <Toaster />
      </div>

      {realdata && realdata?.data?.status && (
        <div
          className="hide-scrollbar"
          style={{
            backgroundColor: "rgb(20,24,28)",
          }}
        >
          {realdata && (
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
                <form onSubmit={handleSearch}>
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
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSearch(e);
                      }
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
                    onClick={async (e) => {
                      e.preventDefault();
                      await handleSearch(searchQuery);
                    }}
                  >
                    Search
                  </button>
                </form>

                {error && <p>Error: {error.message}</p>}
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
                        target="_blank"
                        href={`/subs?q=${movie.id}&bg=${
                          movie.backdrop_path
                            ?.split("/")[1]
                            ?.split(".jpg")[0] || ""
                        }&y=${movie?.release_date?.split("-")[0] || ""}&p=${
                          movie.poster_path?.split("/")[1]?.split(".jpg")[0] ||
                          ""
                        }`}
                      >
                        {movie?.title} ({movie?.release_date?.split("-")[0]})
                      </Link>
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
                    backgroundImage: `linear-gradient(to bottom, transparent, transparent,rgb(20,24,28)), url(https://image.tmdb.org/t/p/original/${realdata.backdrop_path}.jpg)`,
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
                  marginTop: "-100px",
                  marginLeft: "19%",
                }}
              >
                <img
                  className="poster"
                  src={`https://image.tmdb.org/t/p/w500/${realdata.poster_path}.jpg`}
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
                  {realdata.data.results[0].name}
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.4rem",
                      color: "lightgray",
                    }}
                    className="year"
                  >
                    {realdata.year}
                  </div>
                  <div
                    className="dontShowIthereInMobile hide-scrollbar"
                    style={{
                      marginTop: "10px",
                    }}
                  >
                    <div className="lang-keys hide-scrollbar">
                      {Object.entries(languages).map(([code, langu]) => (
                        <span
                          key={code}
                          className="language-details"
                          style={{
                            backgroundColor:
                              langu === lang.language ? "white" : "#f1c40f",
                            color: langu === lang.language ? "black" : "black",
                          }}
                          onClick={() => {
                            setSubsLoading(true);
                            setLang({ code: code, language: langu });
                          }}
                        >
                          {langu}
                        </span>
                      ))}
                    </div>
                    <div className="subsholder hide-scrollbar">
                      {subtitlesLoading ? (
                        <SwapLoader {...text} />
                      ) : (
                        <>
                          {realdata.data.subtitles.map((sub, index) => (
                            <Subswap
                              key={index}
                              sub={sub}
                              title={realdata.data.results[0].name}
                              year={realdata.year}
                              index={index}
                              text={text}
                            />
                          ))}
                          {!realdata?.data?.subtitles.length > 0 && (
                            <NotAvailable {...lang} />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </span>
              </div>

              <div
                className="ShowIthereInMobile hide-scrollbar"
                style={{
                  display: "none",
                }}
              >
                <div className="lang-keys hide-scrollbar">
                  {Object.entries(languages).map(([code, langu]) => (
                    <span
                      key={code}
                      className="language-details"
                      style={{
                        backgroundColor:
                          langu === lang.language ? "white" : "#f1c40f",
                        color: langu === lang.language ? "black" : "black",
                      }}
                      onClick={() => {
                        setSubsLoading(true);
                        setLang({ code: code, language: langu });
                      }}
                    >
                      {langu}
                    </span>
                  ))}
                </div>
                <div className="subsholder hide-scrollbar">
                  {subtitlesLoading ? (
                    <SwapLoader {...text} />
                  ) : (
                    <>
                      {realdata.data.subtitles.length > 0 ? (
                        realdata.data.subtitles?.map((sub, index) => (
                          <Subswap
                            key={index}
                            sub={sub}
                            title={realdata.data.results[0].name}
                            index={index}
                            year={realdata.year}
                            text={text}
                          />
                        ))
                      ) : (
                        <NotAvailable {...lang} />
                      )}
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {realdata && !realdata?.data?.status && (
        <div
          className="quote-container hide-scrollbar"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div
            className="quote"
            style={{
              marginTop: "20px",
              fontSize: "1.2rem",
            }}
          >
            Sorry subtitles not available for this movie yet!
          </div>
        </div>
      )}
    </div>
  );
}

export default SubtitlesContent;
