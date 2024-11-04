"use server";

import random from "random";

const TMBD_API_KEY = process.env.TMBD_API_KEY;
const API_KEY = random.choice([process.env.API_KEY1, process.env.API_KEY2]);

const urll = `https://proxy.reddyindra53.workers.dev/?url=`;
export async function fetchRandomMovie() {
  const url = `${urll}https://api.themoviedb.org/3/movie/popular?api_key=${TMBD_API_KEY}&append_to_response=images&page=1`;

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 12 * 60 * 60,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const movieData = await response.json();
    const data = movieData.results;

    return data;
  } catch (error) {
    console.error("Error fetching random movie:", error);
    return null;
  }
}

export async function searchMovies(query) {
  // The way it should be formatted
  const baseUrl = "https://proxy.reddyindra53.workers.dev/?url=";
  const tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${TMBD_API_KEY}&query=${encodeURIComponent(
    query
  )}&page=1`;
  const finalUrl = baseUrl + encodeURIComponent(tmdbUrl);

  try {
    const response = await fetch(finalUrl);
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw new Error("Failed to search movies");
  }
}

const findSubs = async (movieId, lang) => {
  const url = `https://api.subdl.com/api/v1/subtitles?api_key=${API_KEY}&type=movie&tmdb_id=${movieId}&subs_per_page=30&languages=${lang.code}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw new Error("Failed to search movies");
  }
};
export async function trendingtoday() {
  const trending = await fetch(
    "https://trakt-trending-movies.reddyindra53.workers.dev/api/trending",
    {
      next: {
        revalidate: 10 * 60 * 60,
      },
    }
  );
  const tr = await trending.json();
  return tr;
}
export { findSubs };
