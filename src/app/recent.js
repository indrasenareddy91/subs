import "./recent.css";

export default function RecentDownloads({ downloads }) {
  return (
    <div className="recent-downloads">
      <div className="card">
        <div
          className="card-header"
          style={{
            padding: "0rem 1rem 0rem 1rem",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              color: "black",
              borderRadius: "2px",
              padding: "6px",
              fontSize: "bold",
              textAlign: "center",
            }}
          >
            Recent Downloads
          </div>
        </div>
        <div className="card-content">
          <div className="downloads-list">
            {downloads.map((download) => {
              const [title, year] = download.movie_name.split(",");

              return (
                <div key={download.id} className="download-item">
                  <span>
                    {title}({year.trim()})
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
