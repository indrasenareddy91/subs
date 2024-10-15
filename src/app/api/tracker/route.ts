// src/app/api/tracker/route.ts
import { sql } from "@vercel/postgres";
import axios from 'axios';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { moviename , year} = body;

        if (!moviename) {
            return NextResponse.json(
                { error: 'Movie named is required.' },
                { status: 400 }
            );
        }

        // Get the IP address from headers
        const headersList = headers();
        const forwardedFor = headersList.get('x-forwarded-for');
        const ip = forwardedFor ? forwardedFor.split(',')[0] : '127.0.0.1';
    console.log('hekld');
        // Get country from IP
        const geoResponse = await axios.get(`https://ipapi.co/${ip}/json/`);
        const country = geoResponse.data.country_name || 'Unknown';
          
        const movie  =  moviename + ", " + year
        // Insert into database
     const {rows} =    await sql`
            INSERT INTO movies (movie_name, country) 
            VALUES (${movie}, ${country})
        `;
      console.log(rows)
        console.log('Movie added successfully!');

        return NextResponse.json(
            { message: 'Movie added successfully!'  },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error getting user location or inserting data:', error);
        return NextResponse.json(
            { error: 'An error occurred while saving the movie data.' },
            { status: 500 }
        );
    }
}