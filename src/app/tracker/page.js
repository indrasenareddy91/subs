import React from "react";
import { sql } from "@vercel/postgres";
export const dynamic = "force-dynamic";
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
const MovieTable = async () => {
  const { rows } = await sql`SELECT * , created_at FROM movies`;
  console.log(rows);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
        background: "black",
        padding: "10px",
      }}
    >
      <table
        style={{
          background: "white",
          borderRadius: "3px",
          width: "auto",
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
              id
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
              key={row.movie_id}
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
                {row.movie_id}
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
                {row.country} , {row.reference} ,{row.ip}, {row.adress} ,
                {formatDate(row.created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieTable;
