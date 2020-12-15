import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {createGlobalStyle} from 'styled-components';
import 'fontsource-dm-sans';
import 'fontsource-work-sans';
import Registration from './pages/registration';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }

  html {
    font-size: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  body {
    --white: #F5F9FF;
    --black: #000000;
    --snow: #C1DAFF;
    --ikeaBlue: #315A96;
    --spaceGrey: #21273F;
    --spaceDark: #040816;
    --wine: #89072E;
    --vanilla: #FECD7D;
    --parksCanada: #3A5154;
    --wineDark: #CA4353;

    --max-width: 1200px;
    --reading-width: 80ch;
    --mobile-width: 90vw;

    --primary-font: 'DM-Sans', sans-serif;
    --secondary-font: 'Work Sans', sans-serif;

    --shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
    --hover: 0px 0px 16px rgba(49, 90, 150, 0.5);

    font-family: 'Work Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    background-color: var(--wine);
    color: var(--white);

    margin: 0;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  h1, h2, h3 {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  h3 {
    font-weight: 300;
  }

  a {
  text-decoration: none;
  }

  a:link,
  a:visited,
  a:hover,
  a:active {
    color: inherit;
  }
`;

const App = () => (
  <>
    <GlobalStyle />
    <Router>
      <Switch>
        <Route path='/' exact component={Registration} />
      </Switch>
    </Router>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
