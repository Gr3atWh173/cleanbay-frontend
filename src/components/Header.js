import { useState } from "react";

export default function Header() {
  const [isActive, setIsActive] = useState(false);

  return (
    <nav className="navbar" role="navigation">
      <div className="navbar-brand">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`navbar-burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <div id="navbar" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        <div className="navbar-end">
          <a className="navbar-item" href="/docs">
            About
          </a>

          <a
            className="navbar-item"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/Gr3atWh173/cleanbay#contributing"
          >
            Contribute
          </a>
        </div>
      </div>
    </nav>
  );
}
