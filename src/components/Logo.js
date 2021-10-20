import React from 'react'

export default function BigLogo(props) {
  const type = props.type === "big" ? "is-size-1" : "is-size-5"
  
  return (
    <div className="has-text-centered">
      <span className={`has-text-danger ${type}`}>Clean</span>
      <span className={`has-text-info ${type}`}>Bay</span>
    </div>
  )
}
