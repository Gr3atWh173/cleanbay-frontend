import Logo from './Logo'
import SearchBox from './SearchBox'

export default function ResultsPage() {
  return (
    <div className="columns">
      <div className="column is-one-fifth">
        <Logo type="compact"/>
      </div>

      <div className="column is-pulled-left">
        <SearchBox />
      </div>

    </div>
  )
}
