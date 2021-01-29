import React from 'react';
import styled from 'styled-components';
import {SidebarLayout} from '../../layouts';
import {Helmet} from 'react-helmet';
import ross from 'assets/img/sponsors/rossVideo.svg';
import ciena from 'assets/img/sponsors/ciena-full.svg';
import echo from 'assets/img/sponsors/echo-full.png';

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

const ChallengeSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 4rem;
`;

const ChallengesHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & * {
    text-align: center;
  }
`;

const SponsoredChallenges = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  margin-top: 2rem;
`;

const SponsoredChallenge = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(30%);

  & h3 {
    margin: 0;
  }

  & label {
    font-size: 12px;
  }

  & a {
    font-size: 12px;
    color: var(--wine) !important;
  }
`;

const LargeLogoContainer = styled.div`
  height: 64px;
  width: 100%;
  margin-bottom: 1rem;
`;

const LargeLogo = styled.img`
  height: 80%;
`;

const Challenges = () => {
  return (
    <SidebarLayout>
      <Helmet
        titleTemplate={`%s — cuHacking 2021 Dashboard`}
        title='Schedule'
      />
      <Spacer />
      <Container>
        <Header>
          <h1>Hackathon challenges</h1>
          <label>
            Below are the challenges you can opt into when submitting your
            project.
          </label>
        </Header>
        <ChallengeSection>
          <ChallengesHeader>
            <h2>Sponsored Challenges</h2>
            <label>Challenges supported by our sponsors.</label>
            <SponsoredChallenges>
              <SponsoredChallenge>
                <LargeLogoContainer>
                  <LargeLogo src={ross} />
                </LargeLogoContainer>
                <h3>Fan Engage-o-meter</h3>
                <p>Nintendo Switch Lite</p>
                <label>
                  Build a fan engagement app that large-scale events would use
                  to increase the engagement of the viewership by creating
                  trivia games to use throughout their events. See more details{' '}
                  <a href='#'>here</a>!
                </label>
              </SponsoredChallenge>
              <SponsoredChallenge>
                <LargeLogoContainer>
                  <LargeLogo src={ciena} />
                </LargeLogoContainer>
                <h3>Diversity & Inclusion Award</h3>
                <p>TBA</p>
                <label>
                  A hack that leverages today’s technologies to help improve our
                  own communities. What tools would help create a more diverse
                  and inclusive society?
                </label>
              </SponsoredChallenge>
              <SponsoredChallenge>
                <LargeLogoContainer>
                  <LargeLogo src={echo} />
                </LargeLogoContainer>
                <h3>Best Hack Using echoAR</h3>
                <p>
                  $50 Amazon Gift card (for whole team) and Business Tier access
                  to echoAR (per member)
                </p>
                <label>
                  echoAR is a cloud platform that helps manage & deliver AR/VR
                  content to apps & devices everywhere. Build a hack using their
                  platform to enter!
                </label>
              </SponsoredChallenge>
            </SponsoredChallenges>
          </ChallengesHeader>
        </ChallengeSection>
      </Container>
    </SidebarLayout>
  );
};

export default Challenges;
