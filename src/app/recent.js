import { sql } from "@vercel/postgres";

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
      <style jsx>{`
        .recent-downloads {
          position: fixed;
          bottom: 1rem;
          right: 1rem;
          width: 16rem;
        }
        @media (max-width: 1024px) {
          .recent-downloads {
            display: none;
          }
        }
        .card {
          background-color: white;
          border: 1px solid #e5e5e5;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
            0 1px 2px 0 rgba(0, 0, 0, 0.06);
        }
        .card-header {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #e5e5e5;
        }
        .card-header h2 {
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0;
        }
        .card-content {
          padding: 1rem;
        }
        .downloads-list {
          height: 200px;
          overflow-y: auto;
        }
        .download-item {
          margin-bottom: 1rem;
        }
        .download-item h3 {
          font-weight: 600;
          margin: 0 0 0.25rem 0;
        }
        .download-item p {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
