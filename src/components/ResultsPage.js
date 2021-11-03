import { Link } from "react-router-dom";

import Logo from "./Logo";
import SearchBox from "./SearchBox";
import SortOptions from "./SortOptions";
import PaginatedResults from "./PaginatedResults";

import "../styles/resultspage.css";

export default function ResultsPage({
  searchQuery,
  setSearchQuery,
  handleSearch,
  sortTorrents,
  torrents,
  setTorrents,
  elapsed,
  error,
  page,
  setPage,
}) {
  return (
    <div className="main">
      <div className="searchbar">
        <Link to="/" style={{ decoration: "none" }}>
          <Logo type="compact" />
        </Link>

        <SearchBox
          search={handleSearch}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
      </div>

      <SortOptions
        relevance={() => sortTorrents("relevance")}
        inc_size={() => sortTorrents("increasing_size")}
        dec_size={() => sortTorrents("decreasing_size")}
        seeders={() => sortTorrents("seeders")}
        default_sort={"relevance"}
      />

      <div className="found">
        Found {torrents.length} results ({elapsed} s)
      </div>

      {torrents.length ? (
        <PaginatedResults torrents={torrents} page={page} setPage={setPage} />
      ) : error.length ? (
        <article className="message is-danger">
          <div className="message-body">{error}</div>
        </article>
      ) : (
        <div className="spinning-loader"></div>
      )}
    </div>
  );
}
