import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Layout from './Components/Layout';
import DecksList from './Components/Pages/DecksList';
import Error404 from './Components/Pages/Error404';
import DeckDetail from './Components/Pages/DeckDetail';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Layout>
        <Switch>
          <Route exact path="/">
            <DecksList />
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
