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
        width: "500px",
      }}
    >
      {rows.map((row) => (
        <div
          key={row.id}
          style={{
            border: "2px solid white",
            borderRadius: "3px",
            background: "white",
            color: "black",
          }}
        >
          <span
            style={{
              borderLeft: "2px solid black",
            }}
          >
            movie : {row.movie_name}
          </span>
          <span> user from : {row.country}</span>
        </div>
      ))}
    </div>
  );
};

export default tracker;
