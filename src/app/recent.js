import "./recent.css";

export default function RecentDownloads({ downloads }) {
  return (
    <div className="recent-downloads">
      <div className="card">
        <div className="card-header">
          <span>Recent Downloads</span>
        </div>
        <div className="card-content">
          <div className="downloads-list">
            {downloads.map((download) => {
              const [title, year] = download.movie_name.split(",");
              return (
                <div key={download.id} className="download-item">
                  <span>
                    {title}({year})
                  </span>
                  <span> - {download.country}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
