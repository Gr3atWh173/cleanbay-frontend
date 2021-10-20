import { useState } from 'react'

import Header from './Header'
import Logo from "./Logo"
import SearchBox from "./SearchBox"
import SearchButtons from "./SearchButtons"

import "../styles/searchpage.css"

export default function SearchPage(props) {
  const [searchQuery, setSearchQuery] = useState("")

  // triggered by the "Search" button
  const search = () => {
    console.log("search() " + searchQuery)
    _search()
  }

  // triggered by the "I'm feeling lucky" button
  const lucky = () => {
    console.log("lucky() " + searchQuery)
    _search()
  }

  // actually sends requests to the backend
  const _search = () => {
    console.log("_search() " + searchQuery)
    
  }

  return (
    <div>
      <Header searchbox={false} />
      <div className="container">
        <div className="has-text-centered">
          <div className="spacer" />

          <Logo type="big" />
          
          <div className="mt-3 mb-3">
            <SearchBox
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
              search={search}/>
          </div>

          <SearchButtons 
            search={search}
            lucky={lucky}/>

          <div className="container mt-6 is-size-6">
            Want more control?&nbsp;
            <a href="/search_syntax">
              Read the search syntax guide.
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}
