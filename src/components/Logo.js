import React from "react";

export default function BigLogo({ type }) {
  return (
    <span className="logo">
      <span
        className={`has-text-danger ${
          type === "big" ? "is-size-1" : "is-size-3"
        }`}
      >
        {type === "big" ? "Clean" : "C"}
      </span>
      <span
        className={`has-text-info ${
          type === "big" ? "is-size-1" : "is-size-3"
        }`}
      >
        {type === "big" ? "bay" : "b"}
      </span>
    </span>
  );
}
