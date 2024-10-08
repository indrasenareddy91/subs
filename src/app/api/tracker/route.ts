import { sql } from "@vercel/postgres";
import axios from 'axios';
import { NextApiRequest, NextApiResponse    } from 'next';

// Create a connection pool to your PostgreSQL database


export default async function handler(req : NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST') {
    const { movieName } = req.body; // Extract movieName from the request body

    if (!movieName) {
      return res.status(400).json({ error: 'Movie name is required.' });
    }

    // Get the user's IP address from the request headers
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    try {
      // Use a geolocation API to get the country from the IP address
      const geoResponse = await axios.get(`https://ipapi.co/${ip}/json/`);
      const country = geoResponse.data.country_name || 'Unknown';

      // SQL query to insert movie data and the user's country into the database


      await sql`INSERT INTO movies (movie_name, country) VALUES (${movieName}, ${country})`;
      console.log('Movie added successfully!');

      res.status(201).json({ message: 'Movie added successfully!'});
    } catch (error) {
      console.error('Error getting user location or inserting data:', error);
      res.status(500).json({ error: 'An error occurred while saving the movie data.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
