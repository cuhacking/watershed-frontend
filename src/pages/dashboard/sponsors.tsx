import React from 'react';
import styled from 'styled-components';
import {SidebarLayout} from '../../layouts';
import {Helmet} from 'react-helmet';
import ross from 'assets/img/sponsors/rossVideo.svg';
import ciena from 'assets/img/sponsors/ciena-full.svg';
import fdm from 'assets/img/sponsors/fdm-full.svg';
import fellow from 'assets/img/sponsors/fellow-full.svg';

const Spacer = styled.div`
  height: 10vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 4rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

const SponsorsHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  text-align: center;

  & h2 {
    margin-bottom: 0;
  }
`;

const SponsorsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 2rem;
  justify-content: center;
`;

const SponsorCard = styled.a`
  display: flex;
  border-radius: 0.8rem;
  transition: box-shadow 300ms;
  padding: 2rem 3rem;
  margin: 1.5rem;
  width: 40%;

  &:hover {
    box-shadow: var(--shadow);
  }

  &:visited {
    outline: none;
  }
`;

const SponsorLogo = styled.img`
  width: 100%;
`;

const Sponsors = () => (
  <SidebarLayout>
    <Helmet titleTemplate={`%s — cuHacking 2021 Dashboard`} title='Schedule' />
    <Spacer />
    <Container>
      <Header>
        <h1>Sponsor Rooms</h1>
        <label>Chat with our amazing sponsors</label>
      </Header>
      <SponsorsHeader>
        <h2>Meeting Rooms</h2>
        <p>click on a logo to join</p>
      </SponsorsHeader>
      <SponsorsContainer>
        <SponsorCard href='https://cuhacking.com' target='_blank'>
          <SponsorLogo src={ciena} />
        </SponsorCard>
        <SponsorCard href='https://cuhacking.com' target='_blank'>
          <SponsorLogo src={ross} />
        </SponsorCard>
        <SponsorCard href='https://cuhacking.com' target='_blank'>
          <SponsorLogo src={fellow} />
        </SponsorCard>
        <SponsorCard href='https://cuhacking.com' target='_blank'>
          <SponsorLogo src={fdm} />
        </SponsorCard>
      </SponsorsContainer>
    </Container>
    <Spacer />
  </SidebarLayout>
);

export default Sponsors;
