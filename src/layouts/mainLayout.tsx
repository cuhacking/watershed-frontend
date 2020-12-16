import React from 'react';
import styled from 'styled-components';
import {Header, Footer} from '../components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;
  min-height: 100vh;
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
    <a
      id='mlh-trust-badge'
      style={{
        display: 'block',
        maxWidth: 100,
        minWidth: 60,
        position: 'fixed',
        right: 50,
        top: 0,
        width: '10%',
        zIndex: 10000,
      }}
      href='https://mlh.io/seasons/2021/events?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2021-season&utm_content=white'
      rel="noopener noreferrer"
      target='_blank'
    >
      <img
        src='https://s3.amazonaws.com/logged-assets/trust-badge/2021/mlh-trust-badge-2021-blue.svg'
        alt='Major League Hacking 2021 Hackathon Season'
        style={{width: '100%'}}
      />
    </a>
  </Container>
);
