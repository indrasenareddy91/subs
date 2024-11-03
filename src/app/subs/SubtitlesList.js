"use client";
import React from "react";
import Subswap from "./Subswap";
import NotAvailable from "./NotAvailable";
export default function SubtitlesList({ subtitles, movieName, year }) {
  if (!subtitles || subtitles.length === 0) {
    return <NotAvailable />;
  }

  return (
    <div className="subsholder hide-scrollbar">
      {subtitles.map((sub, index) => (
        <Subswap
          key={index}
          sub={sub}
          title={movieName}
          year={year}
          index={index}
        />
      ))}
    </div>
  );
}
