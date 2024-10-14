import { sql } from "@vercel/postgres";
import "./recent.css";
async function getRecentDownloads() {
  const { rows } = await sql`
    SELECT DISTINCT ON (movie_name) id, movie_name, country
    FROM movies
    ORDER BY movie_name, id DESC
    LIMIT 5
  `;
  return rows;
}

export default async function RecentDownloads() {
  const downloads = await getRecentDownloads();

  return (
    <div className="recent-downloads">
      <div className="card">
        <div className="card-header">
          <h2>Recent Downloads</h2>
        </div>
        <div className="card-content">
          <div className="downloads-list">
            {downloads.map((download) => {
              const [title, year] = download.movie_name.split(",");
              return (
                <div key={download.id} className="download-item">
                  <h3>{title}</h3>
                  <p>
                    {year} - {download.country}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
