import React from 'react';
import styled from 'styled-components';
import {Sidebar} from '../components';

const Container = styled.div`
  position: relative;
  display: flex;

  min-width: 100%;
  min-height: 100vh;

  background-color: var(--warmWhite);
  color: var(--indoor);
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0 20px;
  padding-left: calc(var(--sidebar-width) + 20px);
`;

interface LayoutProps {
  children: React.ReactNode;
}

export default ({children}: LayoutProps) => (
  <Container>
    <Sidebar />
    <Main>{children}</Main>
  </Container>
);
