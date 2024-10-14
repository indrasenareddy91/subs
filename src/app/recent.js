import "./recent.css";

export default function RecentDownloads({ downloads }) {
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
