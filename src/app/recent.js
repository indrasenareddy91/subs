import "./recent.css";

export default function RecentDownloads({ downloads }) {
  return (
    <div className="recent-downloads">
      <div
        className="card"
        style={{
          color: "white",
          background: "black",
          fontSize: "12px",
        }}
      >
        <div className="card-header">
          <span fontSize="14px">Recent Downloads</span>
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
