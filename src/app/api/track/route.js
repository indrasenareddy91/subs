import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

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
    console.log("hekld");
    // Get country from IP
    const response = await fetch(
      `https://api.ipapi.is?q=${ip}&key=${process.env.IP_API_KEY}`
    );
    const res = await response.json();
    const country = res.location?.country || "Unknown";
    const adress =
      (res.location?.country || "Unknown") +
      ", " +
      (res.location?.city || "Unknown");

    const movie = moviename + ", " + year;
    // Insert into database

    let data = await sql`
            INSERT INTO movies (movie_name, country , adress , reference , ip) 
            VALUES (${movie}, ${
      country || null
    } , ${adress} , ${userAgent} , ${ip}) returning *
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
