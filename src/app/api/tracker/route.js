// src/app/api/tracker/route.ts
import { sql } from "@vercel/postgres";
import axios from "axios";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { lookup } from "ip-location-api/pack";

export async function POST(request) {
  try {
    const body = await request.json();
    const { moviename, year } = body;

    if (!moviename) {
      return NextResponse.json(
        { error: "Movie named is required." },
        { status: 400 }
      );
    }
    const userAgent = request.headers.get("user-agent") || "";

    // Get the IP address from headers
    const headersList = headers();

    const forwardedFor = headersList.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0] : "127.0.0.1";
    // Get countr
    console.log(geoResponse);
    var location = await fetch(`https://ipapi.co/${ip}/json/`).then((res) =>
      res.json()
    );

    const adress =
      ip +
      " ," +
      (location.city || "Unknown") +
      (location.country_name || "Unknown");

    const movie = moviename + ", " + year;
    // Insert into database

    let data = await sql`
            INSERT INTO movies (movie_name, country , adress , reference) 
            VALUES (${movie}, ${country} , ${adress} , ${userAgent}) returning *
        `;
    return NextResponse.json(
      { message: "Movie added successfully!", id: data.rows[0].movie_id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error getting user location or inserting data:", error);
    return NextResponse.json(
      {
        error: "An error occurred while saving the movie data.",
      },
      { status: 500 }
    );
  }
}
