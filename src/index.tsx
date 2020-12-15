import React from 'react';
import ReactDOM from 'react-dom';
import 'fontsource-dm-sans'
import 'fontsource-work-sans'
import './index.css';
import Registration from './pages/registration';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 
import styled from 'styled-components';
import { colors } from './shared/constants';

const theme = 'dark';

const Container = styled.div`
  box-sizing: border-box;
  min-width: 100%;
  min-height: 100vh;
  padding: 2rem;
  max-width: 1200px;
  background-color: ${theme === 'dark' 
    ? colors.spaceDark : colors.white };
  display: flex;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const App = () => (
  <Container>
    <Router>
      <Switch>
        <Route path="/" exact component={Registration}/> 
      </Switch>
    </Router>
  </Container>
); 

ReactDOM.render(<App/>, document.getElementById('root')); 
