import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Layout from './Components/Layout';
import DeckOverview from './Components/Pages/DeckOverview';
import Error404 from './Components/Pages/Error404';
import DeckDetail from './Components/Pages/DeckDetail';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <DeckOverview />
          </Route>
          <Route exact path="/decks">
            <Redirect to="/" />
          </Route>
          <Route exact path="/decks/:deck">
            <DeckDetail />
          </Route>
          <Route>
            <Error404 />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
