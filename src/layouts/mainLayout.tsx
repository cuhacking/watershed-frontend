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

const Badge = styled.a`
  display: block;
  max-width: 100px;
  min-width: 60px;
  position: absolute;
  right: 68px;
  top: 0px;
  width: 10%;
  z-index: 1;

  @media only screen and (min-width: 1200px) {
    right: calc(50% - 600px + 16px);
  }
`;

interface LayoutProps {
  children: React.ReactNode;
}

export default ({children}: LayoutProps) => (
  <Container>
    <Header fixed={false} banner />
    <Main>{children}</Main>
    <Footer />
    <Badge
      id='mlh-trust-badge'
      href='https://mlh.io/seasons/2021/events?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2021-season&utm_content=white'
      rel='noopener noreferrer'
      target='_blank'
    >
      <img
        src='https://s3.amazonaws.com/logged-assets/trust-badge/2021/mlh-trust-badge-2021-blue.svg'
        alt='Major League Hacking 2021 Hackathon Season'
        style={{width: '100%'}}
      />
    </Badge>
  </Container>
);
