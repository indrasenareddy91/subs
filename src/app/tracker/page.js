import React from "react";
import { sql } from "@vercel/postgres";

const MovieTable = async () => {
  const { rows } = await sql`SELECT * FROM movies`;
  console.log(rows);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100dvh",
        background: "black",
        padding: "10px",
      }}
    >
      <table
        style={{
          background: "white",
          borderRadius: "3px",
          width: "80%",
          borderCollapse: "collapse",
          border: "2px solid white",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#f4f4f4",
              color: "black",
            }}
          >
            <th
              style={{
                padding: "15px",
                textAlign: "left",
                border: "1px solid #ddd",
                borderBottom: "2px solid #ddd",
              }}
            >
              Movie No
            </th>
            <th
              style={{
                padding: "15px",
                textAlign: "left",
                border: "1px solid #ddd",
                borderBottom: "2px solid #ddd",
              }}
            >
              Movie
            </th>
            <th
              style={{
                padding: "15px",
                textAlign: "left",
                border: "1px solid #ddd",
                borderBottom: "2px solid #ddd",
              }}
            >
              Country
            </th>
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
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                }}
              >
                {row.id}
              </td>
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                }}
              >
                {row.movie_name}
              </td>
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                }}
              >
                {row.country}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieTable;