import {BrowserRouter as Router, Route} from 'react-router-dom'

import SearchPage from './components/SearchPage';
import ResultsPage from './components/ResultsPage';

import './App.css';
import '../node_modules/bulma/css/bulma.css';

function App() {
  return (
      <div className="App">
        <Router>
          <Route exact path="/" component={SearchPage} />
          <Route path="/search" component={ResultsPage} />
        </Router>  
      </div>
  );
}

export default App;
