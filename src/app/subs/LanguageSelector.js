"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { findSubs } from "../../actions/actions";
import Subswap from "./Subswap";
import NotAvailable from "./NotAvailable";
import SwapLoader from "./SwapLoader";
export default function LanguageSelector({
  languages,
  currentLang,
  subtitlesData,
  movieId,
  text,
}) {
  const [lang, setLang] = useState(currentLang);
  const [subtitlesLoading, setSubsLoading] = useState(false);
  const [realdata, setSubsData] = useState(subtitlesData);

  useEffect(() => {
    if (movieId) fetchdata();
    const fetchdata = async () => {
      try {
        const subtitlesData = await findSubs(movieId, lang);
        setSubsData({
          data: subtitlesData,
        });
        setSubsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
  }, [lang]);

  return (
    <>
      <div className="lang-keys hide-scrollbar">
        {Object.entries(languages).map(([code, langu]) => (
          <span
            key={code}
            className="language-details"
            style={{
              backgroundColor: langu === lang.language ? "white" : "#f1c40f",
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
    </>
  );
}
