import { Link } from "react-router-dom";
import Header from "./Header";
import Logo from "./Logo";

import "../styles/docs.css";

export default function Docs() {
  return (
    <div>
      <Header />

      <div className="container padded">
        <Link to="/" style={{ decoration: "none" }}>
          <Logo type="big" />
        </Link>

        <div className="smallspacer" />

        <div className="container" id="about">
          <h1 className="title">About</h1>
          <h2 className="subtitle">The metasearch engine for torrents.</h2>
          <div className="content">
            <p>
              Cleanbay is an{" "}
              <strong>advertisement, tracker and miner free</strong> search
              engine for torrents. Born out of the frustration with the user experience
              offered by other indexes.
            </p>
            <p>
              <strong>How does this work?</strong>{" "}Cleanbay works by{" "}
              <strong>searching the torrent indexes on-demand.</strong> When you search 
              something, Cleanbay searches other indexes and serves the results to you.
              {" "}<strong>Cleanbay's servers do not store any torrents or associated 
              data.</strong>
            </p>
          </div>
        </div>
        <div className="spacer" />
        <div className="container" id="getting-started">
          <h1 className="title">Getting Started</h1>
          <h2 className="subtitle">How to use Cleanbay</h2>
          <div className="content">
            <p>
              Using Cleanbay is pretty straightforward. <strong>All you need is a 
              torrent client</strong> (software that helps you download torrents). 
              You'll find plenty on the internet -&nbsp; 
              <a href="https://www.qbittorrent.org/download.php" target="_blank">
                qBittorrent
              </a>, a free and open source torrent client is one of them.
            </p>
            <p>
              Once you're setup with a torrent client, go ahead and <strong>use Cleanbay
              to search</strong> for whatever you want. When you click on any of the 
              links returned by the search, the <strong>installed client will prompt you
              to download it.</strong>
            </p>
          </div>
        </div>
        <div className="spacer" />
        <div className="container" id="search-syntax">
          <h1 className="title">Search Syntax</h1>
          <h2 className="subtitle">How Cleanbay does filters.</h2>
          <div className="content">
            <p>
              Cleanbay supports refining your search through the use of{" "}
              <strong>in-query filters</strong>.
            </p>
            <p>
              This basically means that you can use the following syntax to
              apply filters to your searches.
            </p>
            <ul>
              <li>
                <code>star wars category:cinema,tv</code> Search for star wars
                movies and shows
              </li>
              <li>
                <code>star wars -category:cinema</code> Search for everything
                star wars except movies
              </li>
              <li>
                <code>star wars site:yts,piratebay</code> Search for everything
                star wars on yify and piratebay
              </li>
              <li>
                <code>star wars -site:linuxtracker</code> Search for everything
                star wars on all sites except linuxtracker
              </li>
            </ul>
            <p>
              <strong>Do not use both variants of a filter together.</strong>
              &nbsp; What that means is that you shouldn't be using{" "}
              <code>category:...</code>
              and <code>-category:...</code> in the same search.
            </p>
            <p>
              Supported sites are{" "}
              <code>piratebay, yts, eztv, linuxtracker, libgen, nyaa</code>
            </p>
            <p>
              Supported categories are{" "}
              <code>cinema, tv, software, general, books</code>
            </p>
            <p>
              I'm still working on making the filters better so feel free to{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/gr3atwh173/cleanbay/issues"
              >
                report any issues you find!
              </a>
            </p>
          </div>
        </div>
        <div className="spacer" />
        <div className="spacer" />
      </div>
    </div>
  );
}
