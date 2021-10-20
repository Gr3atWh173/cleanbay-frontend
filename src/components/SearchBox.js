import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

import '../styles/searchbox.css';

export default function SearchBox(props) {

  const handleChange = (e) => props.setSearchQuery(e.target.value)
  const resetSearchQuery = () => props.setSearchQuery("")

  return (
    <div className="searchbox">
      <FontAwesomeIcon icon={faSearch} className="searchicon glass" />
            
      <input
        value={props.searchQuery}
        onChange={handleChange}
        onKeyPress={(e) => e.key === 'Enter' && props.search()}
        className="textbox"
        autoComplete="off"
        autoCorrect="off"
        autoFocus="on" />
      
      {props.searchQuery.length !== 0 &&
        <FontAwesomeIcon
          onClick={resetSearchQuery}
          icon={faTimes}
          className="searchicon cross" />}
      
    </div>
  )
}
