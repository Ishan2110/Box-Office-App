import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Starred from './pages/Starred';
import Show from './pages/Show';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      {/* <Route
          path="/privacy-policy"     // to go to an external link if you go to a specific URL
          component={() => {
            window.location.href = 'https://www.youtube.com/';
            return null;
          }}
        /> */}

      <Route exact path="/show/:id">
        <Show />
      </Route>

      <Route exact path="/starred">
        <Starred />
      </Route>

      <Route>Error 404 Not Found</Route>
    </Switch>
  );
}

export default App;
