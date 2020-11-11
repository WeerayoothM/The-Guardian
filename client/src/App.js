import './App.css';
import { Switch, Link, Route } from 'react-router-dom';
import { useState } from 'react';

import Header from './components/Header';
import SearchArticles from './components/SearchArticles';
import Details from './components/Details';
import Sections from './components/Sections';

function App() {
  const [page, setPage] = useState(1);
  const [term, setTerm] = useState('');
  const [orderBy, setOrderBy] = useState('newest');

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <SearchArticles
              page={page}
              setPage={setPage}
              term={term}
              setTerm={setTerm}
              orderBy={orderBy}
              setOrderBy={setOrderBy}
            />
          )}
        />
        <Route path="/details" component={Details} />
        <Route path="/sections" component={Sections} />
      </Switch>
    </div>
  );
}

export default App;
