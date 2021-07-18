import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Home from './pages/Home';
import Starred from './pages/Starred';
import Show from './pages/Show';

const theme = {
  mainColors: {
    blue: '#2400ff',
    gray: '#c6c6c6',
    dark: '#353535',
  },
};

// styled-components has full theming support by exporting a <ThemeProvider> wrapper component. This component provides a theme to all React components underneath itself via the context API. In the render tree all styled-components will have access to the provided theme, even when they are multiple levels deep.

function App() {
  return (
    <ThemeProvider theme={theme}>
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
          {/* Will redirect to show.jsx which will show all contents when Read More is clicked */}
        </Route>

        <Route exact path="/starred">
          <Starred />
        </Route>

        <Route>Error 404 Not Found</Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
