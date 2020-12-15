import React from 'react';
import styled from 'styled-components';
import {MainLayout} from '../layouts';
import bkgImg from 'assets/img/landing-bkg.png';
import {ReactComponent as Logo} from 'assets/img/word-and-year-logo-white.svg';

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100vh;
  min-height: 600px;

  background: bottom / cover no-repeat url(${bkgImg});

  margin-top: -65px;
  padding-top: 65px;
`;

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: var(--mobile-width);
  margin-top: 5vh;
  text-align: right;
  color: var(--wineDark);

  @media only screen and (min-width: 700px) {
    width: unset;
  }
`;

const StyledLogo = styled(Logo)`
  width: 65%;
  height: 3rem;
`;

const Title = styled.h1`
  font-family: 'Montserrat Alternates';
  font-weight: bold;
  font-size: 3.5em;
  text-align: center;
  white-space: nowrap;

  color: var(--wine);

  @media only screen and (min-width: 700px) {
    font-size: 12vw;
  }

  @media only screen and (min-width: 1200px) {
    font-size: 9em;
  }
`;

const Date = styled.p`
  margin: 0;
  font-size: 1.75em;

  @media only screen and (min-width: 700px) {
    width: 100%;
  }
`;

const Location = styled.p`
  margin: 5px;

  @media only screen and (min-width: 700px) {
    width: 100%;
  }
`;

export default () => (
  <MainLayout>
    <HeroSection>
      <HeroText>
        <StyledLogo />
        <Title>Snowed In</Title>
        <Date>January 29–31, 2021</Date>
        <Location>Virtual, Worldwide</Location>
      </HeroText>
    </HeroSection>
  </MainLayout>
);
