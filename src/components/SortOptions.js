import { useState } from "react";

import "../styles/sortoptions.css";

export default function SortOptions({
  relevance,
  inc_size,
  dec_size,
  seeders,
  default_sort,
}) {
  const [sortType, setSortType] = useState(default_sort);

  return (
    <div className="sortoptions">
      <div className="sortbuttons">
        <button
          onClick={() => {
            setSortType("relevance");
            relevance();
          }}
          className={`sortbutton ${sortType === "relevance" && "active"}`}
        >
          Relevance
        </button>

        <button
          onClick={() => {
            setSortType("seeders");
            seeders();
          }}
          className={`sortbutton ${sortType === "seeders" && "active"}`}
        >
          Seeders
        </button>

        <button
          onClick={() => {
            setSortType("increasing_size");
            inc_size();
          }}
          className={`sortbutton ${sortType === "increasing_size" && "active"}`}
        >
          Size (inc)
        </button>

        <button
          onClick={() => {
            setSortType("decreasing_size");
            dec_size();
          }}
          className={`sortbutton ${sortType === "decreasing_size" && "active"}`}
        >
          Size (dec)
        </button>
      </div>
    </div>
  );
}
