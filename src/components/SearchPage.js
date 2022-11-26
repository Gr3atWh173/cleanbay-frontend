//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faHeart } from '@fortawesome/free-solid-svg-icons';

import Header from "./Header";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import SearchButtons from "./SearchButtons";

import "../styles/searchpage.css";

export default function SearchPage({
  searchQuery,
  setSearchQuery,
  handleSearch,
  handleLucky,
}) {
  document.title = "Cleanbay";

  return (
    <div>
      <Header />
      <div className="container">
        <div className="has-text-centered">
          <div className="spacer" />

          <div className="has-text-centered">
            <Logo type="big" />
          </div>

          <div className="mt-3 mb-3">
            <SearchBox
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
              search={handleSearch}
            />
          </div>

          <SearchButtons search={handleSearch} lucky={handleLucky} />

          <div className="content container mt-6 is-size-6">
            Need advanced search?&nbsp;
            <a href="/docs#search-syntax">Read the search syntax guide.</a>
          </div>

          <div className="content container is-size-6">
            Wondering how to get started?&nbsp;
            <a href="/docs#getting-started">Its pretty easy.</a>
          </div>

          {/*
          <div className="container mt-1 is-size-6">
            <a href="https://www.buymeacoffee.com/cleanbay">
              <FontAwesomeIcon icon={faHeart} /> Donate  
            </a>
          </div>
          */}
        </div>
      </div>
    </div>
  );
}
