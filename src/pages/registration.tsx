import React from 'react';
import styled from 'styled-components';
import Button from '../components/button'
import { colors } from '../shared/colors';

const theme = 'dark';

const Container = styled.div`
  min-width: 100%;
  min-height: 100%;
  max-width: 1200px;
  background-color: ${theme === 'dark' 
    ? colors.spaceDark : colors.white };
`;

function Registration() {
  return (
    <Container>
      <h1> Registration </h1>
      <Button disabled></Button>
    </Container>
  );
}

export default Registration;