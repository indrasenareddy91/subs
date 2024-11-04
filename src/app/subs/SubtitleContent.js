// SubtitleContent.js
import { findSubs } from "../../actions/actions";
import Subswap from "./subshit";
import SwapLoader from "./SwapLoader";
import NotAvailable from "./NotAvailable";
import SearchContainer from "./SearchContainer";

async function getMovieSubtitles(movieId, lang) {
  try {
    const subtitlesData = await findSubs(movieId, lang);
    return subtitlesData;
  } catch (error) {
    console.error("Error fetching subtitles:", error);
    return null;
  }
}

export async function SubtitleContent({ movieId }) {
  const initialLang = { code: "EN", language: "English" };
  const subtitlesData = await getMovieSubtitles(movieId, initialLang);

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
    <>
      {subtitlesData && subtitlesData?.data?.status && (
        <div
          className="hide-scrollbar"
          style={{
            backgroundColor: "rgb(20,24,28)",
          }}
        >
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
                fontSize: "22px",
              }}
            >
              SUBS
            </span>
          </div>
          <SearchContainer />
          <div
            style={{
              height: "56vh",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                background:
                  "linear-gradient(to bottom, transparent, transparent, rgb(20,24,28))",
                top: "0",
                left: "0",
                right: "0",
                bottom: "0",
                height: "100%",
              }}
            />
            <div
              className="backdrop"
              style={{
                backgroundImage: `linear-gradient(to bottom, transparent, transparent, rgb(20,24,28)), url(/api/placeholder/1920/1080)`,
                backgroundSize: "cover",
                height: "55vh",
              }}
            />
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
              src="/api/placeholder/500/750"
              alt="Movie Poster"
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
              {subtitlesData.results[0]?.name}
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                  color: "lightgray",
                }}
                className="year"
              >
                {year}
              </div>
              <div
                className="dontShowIthereInMobile hide-scrollbar"
                style={{
                  marginTop: "10px",
                }}
              >
                {languages && (
                  <LanguageSelector
                    languages={languages}
                    currentLang={initialLang}
                    movieId={movieId}
                    subsdata={subtitlesData}
                  />
                )}
              </div>
            </span>
          </div>

          <div
            className="ShowIthereInMobile hide-scrollbar"
            style={{
              display: "none",
            }}
          >
            {languages && (
              <LanguageSelector
                languages={languages}
                currentLang={initialLang}
                movieId={movieId}
              />
            )}
          </div>
        </div>
      )}
      {subtitlesData && !subtitlesData?.data?.status && (
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
    </>
  );
}

// These would be client components:
