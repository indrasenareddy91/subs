import React from "react";
import { sql } from "@vercel/postgres";

const tracker = async () => {
  const { rows } = await sql`SELECT * FROM movies`;
  return (
    <div
      style={{
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
            borderRadius: "5px",
            background: "white",
            color: "black",
          }}
        >
          <span
            style={{
              borderLeft: "2px solid white",
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
