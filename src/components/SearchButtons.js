import '../styles/searchbutton.css'

export default function SearchButtons(props) {
  return (
    <div className="has-text-centered">
        <button className="searchbutton" onClick={props.search}>
            Search
        </button>
      
        <button className="searchbutton" onClick={props.lucky}>
            I'm feeling lucky
        </button>
    </div>
  )
}
