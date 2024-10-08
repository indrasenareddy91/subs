import React from "react";
import { sql } from "@vercel/postgres";

const MovieTable = async () => {
  const { rows } = await sql`SELECT * FROM movies`;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100dvh",
        background: "black",
        padding: "20px",
      }}
    >
      <table
        style={{
          background: "white",
          borderRadius: "3px",
          width: "80%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#f4f4f4",
              color: "black",
            }}
          >
            <th style={{ padding: "15px", textAlign: "left" }}>Movie No</th>
            <th style={{ padding: "15px", textAlign: "left" }}>Movie</th>
            <th style={{ padding: "15px", textAlign: "left" }}>Country</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              style={{
                background: "white",
                color: "black",
              }}
            >
              <td style={{ padding: "10px" }}>{row.id}</td>
              <td style={{ padding: "10px" }}>{row.movie_name}</td>
              <td style={{ padding: "10px" }}>{row.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieTable;
