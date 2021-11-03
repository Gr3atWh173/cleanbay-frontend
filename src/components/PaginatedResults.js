import Torrent from "./Torrent";

import "../styles/paginatedresults.css";

export default function PaginatedResults({ torrents, page, setPage }) {
  const page_len = Math.floor(torrents.length / 10) - 2;
  const res_per_page = 25;
  return (
    <div className="main">
      {torrents
        .slice(page * res_per_page, page * res_per_page + res_per_page)
        .map((result, index) => (
          <Torrent key={index} torrent={result}></Torrent>
        ))}

      <div className="pagination_actions">
        {page !== 0 && <a onClick={() => setPage(page - 1)}>&lt; Previous</a>}

        {page !== 0 && <a onClick={() => setPage(0)}>Reset</a>}

        {page < page_len && <a onClick={() => setPage(page + 1)}>Next &gt;</a>}
      </div>
    </div>
  );
}
