import React from 'react';
import styled from 'styled-components';
import {Header, Footer} from '../components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;
  min-height: 100vh;
  padding-top: 65px;
`;

const Main = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

interface LayoutProps {
  children: React.ReactNode;
}

export default ({children}: LayoutProps) => (
  <Container>
    <Header fixed={false} />
    <Main>{children}</Main>
    <Footer />
  </Container>
);
