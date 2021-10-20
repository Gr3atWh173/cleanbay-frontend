import { useState } from "react";

import Logo from './Logo'
import SearchBox from "./SearchBox";

export default function Header(props) {
  const [isActive, setIsActive] = useState(false);

  return (
    <nav className="navbar" role="navigation">
      <div className="navbar-brand">
        {props.searchbox && 
          <a
            className="navbar-item"
            href="https://www.buymeacoffee.com/cleanbay"
            target="_blank"
            rel="noreferrer">
             <Logo type="compact" />
          </a>}

        <button
          onClick={() => setIsActive(!isActive)}
          className={`navbar-burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <div id="navbar" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        <div className="navbar-start">
          {props.searchbox && 
            <SearchBox />}
        </div>
        <div className="navbar-end">
          <a className="navbar-item" href="/about">
            About
          </a>

          <a
            className="navbar-item"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/Gr3atWh173/cleanbay#contributing">
            Contribute
          </a>

        </div>
      </div>
    </nav>
  )
}
