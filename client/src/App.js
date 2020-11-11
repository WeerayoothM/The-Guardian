import './App.css';
import { Switch, Link, Route } from 'react-router-dom';
import Header from './components/Header';
import Articles from './components/Articles';
import Details from './components/Details';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={Articles} />
        <Route path="/details" component={Details} />
      </Switch>
    </div>
  );
}

export default App;
