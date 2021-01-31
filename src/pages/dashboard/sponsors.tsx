import React from 'react';
import styled from 'styled-components';
import {SidebarLayout} from '../../layouts';
import {Helmet} from 'react-helmet';
import ross from 'assets/img/sponsors/rossVideo.svg';
import ciena from 'assets/img/sponsors/ciena-full.svg';
import fdm from 'assets/img/sponsors/fdm-full.svg';
import fellow from 'assets/img/sponsors/fellow-full.svg';

const Spacer = styled.div`
  height: 5vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 4rem;
  max-width: var(--max-width);
  animation: var(--page-animation);
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SponsorsHeader = styled.div`
  display: flex;
  flex-direction: column;
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
  padding: 32px 48px;
  margin: 16px;
  width: 400px;

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
    <Helmet
      titleTemplate={`%s — cuHacking 2021 Dashboard`}
      title='Sponsor Rooms'
    />
    <Spacer />
    <Container>
      <Header>
        <h1>Sponsor Rooms</h1>
        <label>Chat with our amazing sponsors</label>
      </Header>
      <SponsorsHeader>
        <p>Click on a logo to join</p>
      </SponsorsHeader>
      <SponsorsContainer>
        <SponsorCard
          href='https://meet.google.com/sev-sckc-hoq'
          target='_blank'
          rel='noopener noreferrer'
        >
          <SponsorLogo src={ciena} />
        </SponsorCard>
        <SponsorCard
          href='https://meet.google.com/dfq-rzpj-owc'
          target='_blank'
          rel='noopener noreferrer'
        >
          <SponsorLogo src={ross} />
        </SponsorCard>
        <SponsorCard
          href='https://meet.google.com/rqt-kmos-ggf'
          target='_blank'
          rel='noopener noreferrer'
        >
          <SponsorLogo src={fellow} />
        </SponsorCard>
        <SponsorCard
          href='https://meet.google.com/asc-tgtb-epu'
          target='_blank'
          rel='noopener noreferrer'
        >
          <SponsorLogo src={fdm} />
        </SponsorCard>
      </SponsorsContainer>
    </Container>
    <Spacer />
  </SidebarLayout>
);

export default Sponsors;
