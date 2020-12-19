import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {createGlobalStyle} from 'styled-components';
import 'fontsource-dm-sans';
import 'fontsource-work-sans';
import 'fontsource-work-sans/600.css';
import 'fontsource-montserrat-alternates/600.css';
import {Home} from './pages';

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
    scroll-padding-top: 16px;
    scroll-behavior: smooth;
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
    --outdoor: #030a16;
    --indoor: #130101;

    --max-width: 1200px;
    --reading-width: 80ch;
    --mobile-width: 90vw;

    --primary-font: 'DM Sans', sans-serif;
    --secondary-font: 'Work Sans', sans-serif;

    --shadow: 0px 0px 16px rgba(0, 0, 0, 0.5);
    --hover: 0px 0px 16px rgba(49, 90, 150, 0.5);

    font-family: var(--secondary-font);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    background-color: var(--indoor);

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

  .ReactCollapse--collapse {
    transition: height 500ms cubic-bezier(0.33, 1, 0.68, 1);
=======
import './index.css';
import Registration from './pages/registration';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 
import styled from 'styled-components';
import { colors } from './shared/constants';
import { themeElement } from './shared/theme';

const Container = styled.div`
  box-sizing: border-box;
  min-width: 100%;
  min-height: 100vh;
  padding: 2rem;
  max-width: 1200px;
  background-color: ${themeElement(colors.spaceDark, colors.white)};
  display: flex;

  @media (max-width: 768px) {
    padding: 1rem;
>>>>>>> squashing
  }
`;

const App = () => (
  <>
    <GlobalStyle />
    <Router>
      <Switch>
        <Route path='/' exact component={Home} />
      </Switch>
    </Router>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
