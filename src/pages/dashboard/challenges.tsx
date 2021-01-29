import React from 'react';
import styled from 'styled-components';
import {SidebarLayout} from '../../layouts';
import {Helmet} from 'react-helmet';
import ross from 'assets/img/sponsors/rossVideo.svg';
import ciena from 'assets/img/sponsors/ciena-full.svg';
import echo from 'assets/img/sponsors/echo-full.png';
import green from 'assets/img/sponsors/green-hack.svg';
import best from 'assets/img/sponsors/best-hack.svg';
import health from 'assets/img/sponsors/health-hack.svg';
import education from 'assets/img/sponsors/education-hack.svg';
import ravens from 'assets/img/sponsors/ravens-hack.svg';
import game from 'assets/img/sponsors/health-hack.svg';

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
  
  & * {
    text-align: center;
  }
`;

const ChallengesHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  margin: 2rem 0;

  & h3 {
    margin: 0;
  }

  & label {
    font-size: 12px;
  }

  & a {
    font-size: inherit;
    color: var(--wine) !important;
  }
`;

const LargeLogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 84px;
  width: 100%;
  margin-bottom: 1rem;
`;

const LargeLogo = styled.img`
  height: 90%;
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
          </ChallengesHeader>
          <SponsoredChallenges>
            <SponsoredChallenge>
              <LargeLogoContainer>
                <LargeLogo src={ross} />
              </LargeLogoContainer>
              <h3>Fan Engage-o-meter</h3>
              <p>Nintendo Switch Lite</p>
              <label>
                Build a fan engagement app that large-scale events would use to
                increase the engagement of the viewership by creating trivia
                games to use throughout their events. See more details{' '}
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
                own communities. What tools would help create a more diverse and
                inclusive society?
              </label>
            </SponsoredChallenge>
            <SponsoredChallenge>
              <LargeLogoContainer>
                <LargeLogo
                  style={{
                    width: '80%',
                    height: 'auto',
                  }}
                  src={echo}
                />
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
        </ChallengeSection>
        <ChallengeSection>
          <ChallengesHeader>
            <h2>cuHacking Challenges</h2>
            <label>Challenges created by the cuHacking team.</label>
          </ChallengesHeader>
          <SponsoredChallenges>
            <SponsoredChallenge>
              <LargeLogoContainer>
                <LargeLogo src={green} />
              </LargeLogoContainer>
              <h3>Best “Green” Hack</h3>
              <p>Blue Snowball Microphone</p>
              <label>
                A hack that aims to enhance or improve sustainability efforts,
                brings solutions to environmental issues, or is ecologically
                oriented.
              </label>
            </SponsoredChallenge>
            <SponsoredChallenge>
              <LargeLogoContainer>
                <LargeLogo src={best} />
              </LargeLogoContainer>
              <h3>Best Hack</h3>
              <p>
                Keychron K6 Wireless Mechanical Keyboard & Admission to Pinnacle
              </p>
              <label>
                The most remarkable, dazzling, impressive, technical, and
                extravagent hack. Need we say more?
              </label>
            </SponsoredChallenge>
            <SponsoredChallenge>
              <LargeLogoContainer>
                <LargeLogo src={health} />
              </LargeLogoContainer>
              <h3>Best Health Hack</h3>
              <p>$100 IKEA Gift Card</p>
              <label>
                An application or tool related fitness, mental health, COVID-19,
                personal health, health data, or healthcare systems.
              </label>
            </SponsoredChallenge>
            <SponsoredChallenge>
              <LargeLogoContainer>
                <LargeLogo src={game} />
              </LargeLogoContainer>
              <h3>Best Game</h3>
              <p>Controller of choice (PS5, Switch Pro, etc.)</p>
              <label>
                A video game that is naturally fun, rewarding, and engaging!
                Creative, innovative, or new ideas are favoured here.
              </label>
            </SponsoredChallenge>
            <SponsoredChallenge>
              <LargeLogoContainer>
                <LargeLogo src={ravens} />
              </LargeLogoContainer>
              <h3>Raven’s Quest</h3>
              <p>
                A series of puzzles and challenges to complete alongside your
                hack, if you wish. Find out more in the raven-announcements
                channel on <a href='https://discord.gg/feT4jYCAUJ'>Discord</a>.
              </p>
            </SponsoredChallenge>
            <SponsoredChallenge>
              <LargeLogoContainer>
                <LargeLogo src={education} />
              </LargeLogoContainer>
              <h3>Best Educational Hack</h3>
              <p>TECKIN Smart Lightbulb and Smart Plug x4 (per member)</p>
              <label>
                A hack aimed at reinforcing the learning process, enhancing
                education systems, or making learning more approachable.
              </label>
            </SponsoredChallenge>
          </SponsoredChallenges>
          <label style={{
            fontSize: '8px'
          }}>
            Illustrations sourced from the Noun Project. Credits to (in reading
            order) ProSymbols, Flatart, Nhor, Eucalyp, Komkrit Noenpoempisut,
            ArmOkay, and Eucalyp.
          </label>
        </ChallengeSection>
        <Spacer />
      </Container>
    </SidebarLayout>
  );
};

export default Challenges;
