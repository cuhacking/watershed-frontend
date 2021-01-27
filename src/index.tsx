import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';
import {createGlobalStyle} from 'styled-components';
import 'fontsource-dm-sans';
import 'fontsource-dm-sans/700.css';
import '@fontsource/dm-mono';
import 'fontsource-work-sans';
import 'fontsource-work-sans/600.css';
import 'fontsource-montserrat-alternates/600.css';
import {Home, Dashboard, Events} from './pages';
import {ProvideAuth, ProvideEvents, ProvideDashboardInfo} from './hooks';

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
    --white: #FFFFFF;
    --coolWhite: #F5F9FF;
    --warmWhite: #FFFCFD;
    --black: #000000;
    --snow: #C1DAFF;
    --ikeaBlue: #315A96;
    --spaceGrey: #21273F;
    --spaceDark: #040816;
    --wine: #89072E;
    --vanilla: #FECD7D;
    --parksCanada: #3A5154;
    --wineDark: #57061E;
    --wineLight: #CA4353;
    --actionGradient: linear-gradient(135deg, var(--wine) 0%, rgba(176,95,78,1) 100%);
    --outdoor: #030a16;
    --indoor: #130101;

    --max-width: 1200px;
    --event-width: 800px;
    --reading-width: 65ch;
    --mobile-width: 90vw;
    --sidebar-width: 350px;

    --primary-font: 'DM Sans', sans-serif;
    --primary-font-mono: 'DM Mono', monospace;
    --secondary-font: 'Work Sans', sans-serif;

    --shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);
    --hover: 0px 0px 12px rgba(49, 90, 150, 0.25);

    font-family: var(--secondary-font);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    background-color: var(--indoor);

    color: var(--coolWhite);

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

  body, textarea {
    font-family: 'Work Sans', sans-serif;
    color: white;
  }

  input {
    font-family: 'Work Sans', sans-serif;
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
  }

  .youtubeContainer {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
    overflow: hidden;
  }

  .youtubeContainer iframe {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const App = () => (
  <>
    <GlobalStyle />
    <ProvideAuth>
      <ProvideEvents>
        <ProvideDashboardInfo>
          <Router>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/schedule' component={Events} />
              <Redirect to='/' />
            </Switch>
          </Router>
        </ProvideDashboardInfo>
      </ProvideEvents>
    </ProvideAuth>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
