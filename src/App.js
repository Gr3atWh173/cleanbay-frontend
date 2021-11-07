import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import SQParser from "search-query-parser";
import axios from "axios";

import SearchPage from "./components/SearchPage";
import ResultsPage from "./components/ResultsPage";
import Docs from "./components/Docs";

import "./App.css";
import "../node_modules/bulma/css/bulma.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [torrents, setTorrents] = useState([]);
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [noResults, setNoResults] = useState(false);

  const levDist = (s, t) => {
    s = s.toLowerCase();
    t = t.toLowerCase();

    let d = []; //2d matrix

    // Step 1
    let n = s.length;
    let m = t.length;

    if (n === 0) return m;
    if (m === 0) return n;

    //Create an array of arrays in javascript (a descending loop is quicker)
    for (let i = n; i >= 0; i--) d[i] = [];

    // Step 2
    for (let i = n; i >= 0; i--) d[i][0] = i;
    for (let j = m; j >= 0; j--) d[0][j] = j;

    // Step 3
    for (let i = 1; i <= n; i++) {
      let s_i = s.charAt(i - 1);

      // Step 4
      for (let j = 1; j <= m; j++) {
        //Check the jagged ld total so far
        if (i === j && d[i][j] > 4) return n;

        let t_j = t.charAt(j - 1);
        let cost = s_i === t_j ? 0 : 1; // Step 5

        //Calculate the minimum
        let mi = d[i - 1][j] + 1;
        let b = d[i][j - 1] + 1;
        let c = d[i - 1][j - 1] + cost;

        if (b < mi) mi = b;
        if (c < mi) mi = c;

        d[i][j] = mi; // Step 6

        //Damerau transposition
        if (
          i > 1 &&
          j > 1 &&
          s_i === t.charAt(j - 2) &&
          s.charAt(i - 2) === t_j
        ) {
          d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
        }
      }
    }

    // Step 7
    return d[n][m];
  };

  function size_cast(size) {
    let size_res = size.split(" ");
    let amount = size_res[0];
    let unit_from = size_res[1];
    let unit_to = "B";

    let sizes = ["B", "kB", "MB", "GB", "TB"];
    let i = sizes.indexOf(unit_from);
    let j = sizes.indexOf(unit_to);
    let r;
    if (i < j) {
      r = j - i;
    } else {
      r = j - i;
    }

    i = 0;
    if (r < 0) {
      r *= -1;
      while (i < r) {
        amount *= 1024;
        i++;
      }
    } else {
      while (i < r) {
        amount /= 1024;
        i++;
      }
    }

    return amount;
  }

  const _sortTorrents = (torrents, key) => {
    let sorted = [...torrents];
    switch (key) {
      case "seeders":
        sorted.sort((a, b) => b.seeders - a.seeders);
        break;
      case "decreasing_size":
        sorted.sort((a, b) => size_cast(b.size) - size_cast(a.size));
        break;
      case "increasing_size":
        sorted.sort((a, b) => size_cast(a.size) - size_cast(b.size));
        break;
      case "relevance":
      default:
        sorted.sort(
          (a, b) => levDist(a.name, searchQuery) - levDist(b.name, searchQuery)
        );
        break;
    }
    return sorted;
  };

  const sortTorrents = (key) => {
    let sorted = _sortTorrents(torrents, key);
    setPage(0);
    setTorrents(sorted);
  };

  useEffect(() => {
    const options = { keywords: ["category", "site"] };
    const baseURL = "https://testbay.herokuapp.com";
    
    // Using this because useParams() doesn't work outside the Routes tree
    const url_params = new URLSearchParams(window.location.search);
    const q = url_params.get("q");
    const l = url_params.get("l");

    if (q === null || q === "") {
      return;
    }

    setSearchQuery(q);

    // actually sends requests to the backend
    const search = async (is_lucky) => {
      let res = await _search();

      if (res.status !== undefined && res.status === "error") {
        setError(res.msg);
        return;
      } else if (error.length) {
        return;
      } else if (res.length === 0) {
        setNoResults(true);
        return;
      } else {
        setNoResults(false);
      }

      res.data = _sortTorrents(res.data, "relevance");

      if (is_lucky) {
        // automatically reroute to the link with the most relevance
        window.location = res.data[0].magnet;
      }

      setElapsed(res.elapsed);
      setTorrents(res.data);
    };

    const _search = async () => {
      let parsed_search_query = SQParser.parse(q.toLowerCase(), options);
      let payload = _create_search_payload(parsed_search_query);

      // we must have a search term at minimum
      if (!payload.search_term.replace(/\s/g, "").length) {
        setError("No search term given");
        return;
      }

      // should not use both exclude and include variations of the
      // same filter
      if (
        payload.include_categories.length &&
        payload.exclude_categories.length
      ) {
        setError(
          "Cannot use both include and exclude variants of category filter."
        );
        return;
      }
      if (payload.include_sites.length && payload.exclude_sites.length) {
        setError(
          "Cannot use both include and exclude variants of site filter."
        );
        return;
      }

      let res = await axios
        .post(`${baseURL}/api/v1/search`, payload)
        .catch((err) => {
          if (err.response) {
            return err.response;
          }
        });

      return res.data;
    };

    const _create_search_payload = (parsed_search_query) => {
      let payload = {
        exclude_categories: [],
        include_categories: [],
        exclude_sites: [],
        include_sites: [],
        search_term: "",
      };

      // no search syntax
      if (typeof parsed_search_query === "string") {
        payload.search_term = parsed_search_query;
        return payload;
      }

      // search term
      if (parsed_search_query.text !== "") {
        payload.search_term = parsed_search_query.text;
      }

      // included categories
      if (parsed_search_query.category) {
        if (typeof parsed_search_query.category === "string") {
          payload.include_categories = [parsed_search_query.category];
        } else {
          payload.include_categories = parsed_search_query.category;
        }
      }

      // excluded categories
      if (parsed_search_query.exclude.category) {
        if (typeof parsed_search_query.exclude.category === "string") {
          payload.exclude_categories = [parsed_search_query.exclude.category];
        } else {
          payload.exclude_categories = parsed_search_query.exclude.category;
        }
      }

      // included sites
      if (parsed_search_query.site) {
        if (typeof parsed_search_query.site === "string") {
          payload.include_sites = [parsed_search_query.site];
        } else {
          payload.include_sites = parsed_search_query.site;
        }
      }

      // excluded sites
      if (parsed_search_query.exclude.site) {
        if (typeof parsed_search_query.exclude.site === "string") {
          payload.exclude_sites = [parsed_search_query.exclude.site];
        } else {
          payload.exclude_sites = parsed_search_query.exclude.site;
        }
      }

      return payload;
    };

    if (q !== "" && l == 1) {
      search(true);
    } else if (q !== "") {
      search(false);
    } else {
      // TODO: handle empty param
    }
  }, []);

  const handleSearch = () => {
    if (searchQuery === "") {
      return;
    }
    window.location = "/search?q=" + encodeURIComponent(searchQuery);
  };

  const handleLucky = () => {
    if (searchQuery === "") {
      return;
    }
    window.location = "/search?q=" + encodeURIComponent(searchQuery) + "&l=1";
  };

  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <SearchPage
            error={error}
            handleSearch={handleSearch}
            handleLucky={handleLucky}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </Route>
        <Route path="/search">
          <ResultsPage
            setPage={setPage}
            page={page}
            error={error}
            elapsed={elapsed}
            torrents={torrents}
            setTorrents={setTorrents}
            sortTorrents={sortTorrents}
            handleSearch={handleSearch}
            handleLucky={handleLucky}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            noResults={noResults}
          />
        </Route>
        <Route path="/docs">
          <Docs />
        </Route>
      </Router>
    </div>
  );
}

export default App;
