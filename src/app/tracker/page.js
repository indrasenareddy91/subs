import React from "react";
import { sql } from "@vercel/postgres";

const tracker = async () => {
  const { rows } = await sql`SELECT * FROM movies`;
  return (
    <div>
      <h1>Movie Tracker</h1>
      {rows.map((row) => (
        <div key={row.id}>
          <p>{row.movie_name}</p>
          <p>{row.country}</p>
        </div>
      ))}
    </div>
  );
};

export default tracker;
