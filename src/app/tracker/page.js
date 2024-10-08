import React from "react";
import { sql } from "@vercel/postgres";

const tracker = async () => {
  const { rows } = await sql`SELECT * FROM movies`;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100dvh",
        background: "black",
      }}
    >
      {rows.map((row) => (
        <div
          key={row.id}
          style={{
            border: "2px solid white",
            borderRadius: "3px",
            borderBottom: "2px solid black",
            background: "white",
            color: "black",
            padding: "10px",
          }}
        >
          <span>{row.id}</span>
          <span
            style={{
              borderRight: "2px solid black",
            }}
          >
            {row.movie_name}
          </span>
          <span> {row.country}</span>
        </div>
      ))}
    </div>
  );
};

export default tracker;
