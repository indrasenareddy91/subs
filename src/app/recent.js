import "./recent.css";

export default function RecentDownloads({ downloads }) {
  return (
    <div className="recent-downloads">
      <div
        className="card"
        style={{
          color: "white",
          background: "black",
        }}
      >
        <div className="card-header">
          <h2>Recent Downloads</h2>
        </div>
        <div className="card-content">
          <div
            className="downloads-list"
            style={{
              color: "white",
              background: "black",
            }}
          >
            {downloads.map((download) => {
              const [title, year] = download.movie_name.split(",");
              return (
                <div key={download.id} className="download-item">
                  <span>{title}</span>
                  <span>
                    {year} - {download.country}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
