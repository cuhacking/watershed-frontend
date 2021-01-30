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
import social from 'assets/img/social.svg';
import discord from 'assets/img/discord.svg';
import meme from 'assets/img/meme.svg';
import css from 'assets/img/css.svg';
import startup from 'assets/img/startup.svg';
import points from 'assets/img/points.svg';
import mentor from 'assets/img/mentor.svg';

const Spacer = styled.div`
  height: 10vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 4rem;

  max-width: var(--max-width);
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

const IndividualSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 4rem;
`;

const IndividualHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
`;

const IndividualChallenge = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: calc(50%);
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

const IndividualChallenges = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin-top: 2rem;
`;

const SmallLogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 84px;
  min-width: 84px;
  margin-right: 2rem;
`;

const SmallLogo = styled.img`
  width: 100%;
`;

const Challenges = () => {
  return (
    <SidebarLayout>
      <Helmet
        titleTemplate={`%s — cuHacking 2021 Dashboard`}
        title='Challenges'
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
                <a href='https://s3.us-west-2.amazonaws.com/secure.notion-static.com/da7eaa33-a4d0-44df-a52c-08748dd89501/Hack-a-thon_-_Trivia_Game.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210129%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210129T222814Z&X-Amz-Expires=86400&X-Amz-Signature=ae93aba4197885646256cef1622c5afe9fb810836dc512e6a40002f493a8be1f&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Hack-a-thon_-_Trivia_Game.pdf%22'>
                  on this pdf
                </a>
                !
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
              <p>MX Master 2S</p>
              <label>
                A series of puzzles and challenges to complete alongside your
                hack, if you wish. Find out more in the raven-announcements
                channel on <a href='https://discord.gg/feT4jYCAUJ'>Discord</a>.
              </label>
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
        </ChallengeSection>
        <IndividualSection>
          <IndividualHeader>
            <h2>Challenges for Individuals</h2>
            <label>
              Smaller prizes to be won based on attributes of participation.
            </label>
          </IndividualHeader>
          <IndividualChallenges>
            <IndividualChallenge>
              <SmallLogoContainer>
                <SmallLogo src={social} />
              </SmallLogoContainer>
              <div>
                <h3>Social Media Raffle</h3>
                <p>3 winners</p>
                <p>$15 Gift Card, TBD upon winning.</p>
                <label>
                  Automatically entered by making a post on Instagram, Twitter,
                  or Facebook using the hashtag #cuHacking2021.
                </label>
              </div>
            </IndividualChallenge>
            <IndividualChallenge>
              <SmallLogoContainer>
                <SmallLogo src={meme} />
              </SmallLogoContainer>
              <div>
                <h3>Spiciest Original™ Meme</h3>
                <p>3 winners</p>
                <p>One month of Discord Nitro.</p>
                <label>
                  An unoffenisive meme to be posted in our #memes channel with a
                  hackathon/cuHacking theme.
                </label>
              </div>
            </IndividualChallenge>
            <IndividualChallenge>
              <SmallLogoContainer>
                <SmallLogo src={discord} />
              </SmallLogoContainer>
              <div>
                <h3>Most Helpful Discord User</h3>
                <p>1 winner</p>
                <p>$50 Steam Gift Card.</p>
                <label>
                  A hacker with a knack for answering questions and other
                  helpful contributions in the Discord server.
                </label>
              </div>
            </IndividualChallenge>
            <IndividualChallenge>
              <SmallLogoContainer>
                <SmallLogo src={css} />
              </SmallLogoContainer>
              <div>
                <h3>[Event] CSS Challenge</h3>
                <p>1 winner</p>
                <p>Affinity Designer (on platform of choice)</p>
                <label>
                  Everyone gets the same HTML file. You have one hour to write
                  CSS to style it. May the best design win!
                </label>
              </div>
            </IndividualChallenge>
            <IndividualChallenge>
              <SmallLogoContainer>
                <SmallLogo src={startup} />
              </SmallLogoContainer>
              <div>
                <h3>[Event] Best Startup Pitch</h3>
                <p>1 winner</p>
                <p>AeroPress</p>
                <label>
                  Think you have what it takes? You have five minutes to pitch
                  the most innovate, forward-thinking, or entertaining startup
                  idea!
                </label>
              </div>
            </IndividualChallenge>
            <IndividualChallenge>
              <SmallLogoContainer>
                <SmallLogo src={mentor} />
              </SmallLogoContainer>
              <div>
                <h3>Most Helpful Mentor</h3>
                <p>1 winner</p>
                <p>Tile Slim Bluetooth Tracker</p>
                <label>
                  A mentor that has shown outstanding helpful advice to various
                  hackers throughout the event.
                </label>
              </div>
            </IndividualChallenge>
            <IndividualChallenge>
              <SmallLogoContainer>
                <SmallLogo src={points} />
              </SmallLogoContainer>
              <div>
                <h3>Most points</h3>
                <p>3 winners</p>
                <p>TBA</p>
                <label>
                  Points awarded through participation in workshops and
                  activities. Gather as many points as you can!
                </label>
              </div>
            </IndividualChallenge>
          </IndividualChallenges>
        </IndividualSection>
        {/* <label
          style={{
            fontSize: '8px',
            marginTop: '1rem',
            textAlign: 'center',
          }}
        >
          Illustrations sourced from the Noun Project. Credits to (in reading
          order) ProSymbols, Flatart, Nhor, Eucalyp, Komkrit Noenpoempisut,
          ArmOkay, and Eucalyp.
        </label> */}
        <Spacer />
      </Container>
    </SidebarLayout>
  );
};

export default Challenges;
