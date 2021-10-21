import { useState } from 'react'
import SQParser from 'search-query-parser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import Header from './Header'
import Logo from "./Logo"
import SearchBox from "./SearchBox"
import SearchButtons from "./SearchButtons"

import "../styles/searchpage.css"

export default function SearchPage(props) {
  const [searchQuery, setSearchQuery] = useState("")

  const options = { keywords: ['category', 'site'] }


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
    let parsed_search_query = SQParser.parse(searchQuery.toLowerCase(), options)
    let payload = _create_search_payload(parsed_search_query)

    // we must have a search term at minimum
    if (!payload.search_term.replace(/\s/g, '').length) {
      console.error("No search term given")
    }

    // exluded and included should not have any common items
    let categories_intersection = payload.included_categories.filter(value => 
      payload.excluded_categories.includes(value)
    )
    let sites_intersection = payload.included_sites.filter(value => 
      payload.excluded_sites.includes(value)
    )

    if (categories_intersection.length !== 0) {
      console.error(
        "Cannot have "
        + categories_intersection.join(',')
        + " in both excluded and included categories."
      )
    }

    if (sites_intersection.length !== 0) {
      console.error(
        "Cannot have "
        + sites_intersection.join(',')
        + " in both excluded and included sites."
      )
    }

    console.log(payload)
  }

  const _create_search_payload = (parsed_search_query) => {
    let payload = {
      excluded_categories: [],
      included_categories: [],
      excluded_sites: [],
      included_sites: [],
      search_term: ""
    }

    // no search syntax
    if (typeof parsed_search_query === 'string') {
      payload.search_term = parsed_search_query
      return payload  
    }

    // search term
    if (parsed_search_query.text !== "") {
      payload.search_term = parsed_search_query.text
    }

    // included categories
    if (parsed_search_query.category) {
      if (typeof parsed_search_query.category === 'string') {
        payload.included_categories = [parsed_search_query.category]
      } else {
        payload.included_categories = parsed_search_query.category
      }
    }

    // excluded categories
    if (parsed_search_query.exclude.category) {
      if (typeof parsed_search_query.exclude.category === 'string') {
        payload.excluded_categories = [parsed_search_query.exclude.category]
      } else {
        payload.excluded_categories = parsed_search_query.exclude.category
      }
    }

    // included sites
    if (parsed_search_query.site) {
      if (typeof parsed_search_query.site === 'string') {
        payload.included_sites = [parsed_search_query.site]
      } else {
        payload.included_sites = parsed_search_query.site
      }
    }

    // excluded sites
    if (parsed_search_query.exclude.site) {
      if (typeof parsed_search_query.exclude.site === 'string') {
        payload.excluded_sites = [parsed_search_query.exclude.site]
      } else {
        payload.excluded_sites = parsed_search_query.exclude.site
      }
    }

    return payload
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

          <div className="container mt-1 is-size-6">
            <a href="https://www.buymeacoffee.com/cleanbay">
              <FontAwesomeIcon icon={faHeart} /> Donate  
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}
