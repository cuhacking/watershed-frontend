import React from 'react';
import styled, {css} from 'styled-components';
import {MainLayout} from '../layouts';
import layer0 from 'assets/img/hero/hero_0.png';
import layer1 from 'assets/img/hero/hero_1.png';
import layer2 from 'assets/img/hero/hero_2.png';
import layer3 from 'assets/img/hero/hero_3.png';
import layer4 from 'assets/img/hero/hero_4.png';
import layer5 from 'assets/img/hero/hero_5.png';
import layer6 from 'assets/img/hero/hero_6.png';
import layer7 from 'assets/img/hero/hero_7.png';
import layer8 from 'assets/img/hero/hero_8.png';
import layer9 from 'assets/img/hero/hero_9.png';
import layer10 from 'assets/img/hero/hero_10.png';
import indoor from 'assets/img/indoor.png';
import stats from 'assets/img/stats.svg';
import schedule from 'assets/img/schedule-graphic.svg';
import {ReactComponent as Logo} from 'assets/img/word-and-year-logo-white.svg';
import {RellaxWrapper} from 'react-rellax-wrapper';
import {Button, FAQEntry, FaqPanel} from '../components';

const faqs: FAQEntry[] = [
  {
    question: 'What is cuHacking 2021: Snowed In?',
    answer:
      "cuHacking is Ottawa's largest annual student run hackathon. Think of it as a marathon of learning and building new things. Over the span of our 3 day weekend, students from around the country, from various backgrounds and skill levels will participate in events, workshops, network with engaging companies, and work on personal projects!",
  },
  {
    question: 'Is this an online event?',
    answer:
      "Yes, it is. cuHacking has historically been held in person in Richcraft Hall at Carleton University. This year, we are keeping all of our hackers safe, and hosting our event online on our Discord server. We can't wait to see you again in person when we can guarantee your safety!",
  },
  {
    question: "What if I've never participated in a hackathon?",
    answer:
      'Every year we are excited to welcome students of all skill levels to our event. In previous years, half of our attendees have had their first hackathon experiences at cuHacking. There will be a lot of opportunities to learn new skills, participate in activities, and make new connections, regardless of your skill or experience set.',
  },
  {
    question: 'Who can attend cuHacking 2021?',
    answer:
      "If you're a student, you can attend. When we say student, we mean any student. Middle schoolers, high schoolers, university students, and college students of all skill levels are welcome at our event. You don't need to be in any specific program or focus to attend. If you're interested in tech, this event is for you!",
  },
  {
    question: 'How do I sign up?',
    answer: `Pay attention to our social media and join our Discord server to be kept in the loop! Once applications are open, you won't be able to miss the big button at the top of this site.`,
  },
  {
    question: 'Where will cuHacking be hosted?',
    answer: `The entire event will be run through our Discord server. Once you're there and signed up through our site, you're ready to go.`,
  },
  {
    question: 'How big are teams?',
    answer:
      'Teams can be anywhere from 1-4 people. You will have a bunch of opportunities to find teammates before hacking!',
  },
  {
    question: 'Can I work on an existing project?',
    answer: `To be eligible to win prizes and challenges, your project must not be started until the hacking begins on Saturday. You're more than welcome to come up with ideas beforehand!`,
  },
];

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--outdoor);

  height: 100vh;
  min-height: 600px;
`;

const HeroLayer = styled.div<{src: string}>`
  width: 100%;
  height: 100%;
  background: bottom / cover no-repeat url(${(props) => props.src});
  background-size: auto 100vh;
  background-position-x: 60%;
  pointer-events: none;

  @media only screen and (min-width: 1200px) {
    background-position-x: center;
  }
`;

const HeroLayerWrapper = styled(RellaxWrapper)`
  width: 100%;
  height: 100vh;
  position: absolute;
  display: flex;
  justify-content: center;
  pointer-events: none;
`;

const HeroBannerWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const HeroBanner = () => {
  const layerImages = [
    layer0,
    layer1,
    layer2,
    layer3,
    layer4,
    layer5,
    layer6,
    layer7,
    layer8,
    layer9,
    layer10,
  ];

  let layers = layerImages.map((image, index) => (
    <HeroLayerWrapper
      key={`image-${index}`}
      speed={-1.5 * (layerImages.length - 1 - index)}
    >
      <HeroLayer src={image} />
    </HeroLayerWrapper>
  ));

  const textLayer = 5;
  const front = layers.slice(0, textLayer);
  const back = layers.slice(textLayer);
  const text = (
    <HeroLayerWrapper
      key='text-0'
      speed={-1.5 * (layerImages.length - 1 - textLayer)}
    >
      <HeroText>
        <StyledLogo />
        <Title>Snowed In</Title>
        <Date>January 29–31, 2021</Date>
        <Location>Virtual, Worldwide</Location>
        <HeroActions>
          <RegistrationLink>Registration Opening Soon</RegistrationLink>
          <SponsorshipLink href='mailto:sponsorship@cuhacking.com'>
            Sponsor cuHacking
          </SponsorshipLink>
        </HeroActions>
      </HeroText>
    </HeroLayerWrapper>
  );

  layers = [...front, text, ...back];

  return <HeroBannerWrapper>{layers}</HeroBannerWrapper>;
};

const HeroActions = styled.div`
  font-size: 1.2rem;
  color: var(--white);
  display: flex;
  flex-direction: row;
  align-self: flex-end;
  margin-top: 16px;
  text-align: center;
`;

const RegistrationLink = styled.a`
  border-right: 1px solid var(--white);
  padding: 0 16px;
  width: 50%;
  box-sizing: border-box;
  @media only screen and (min-width: 1200px) {
    width: unset;
    margin-left: 16px;
  }
`;

const SponsorshipLink = styled.a`
  margin: 0;
  padding: 0 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0);

  width: 50%;
  box-sizing: border-box;
  @media only screen and (min-width: 1200px) {
    width: unset;
    padding: 0;
    margin: 0 0 0 16px;
  }

  transition: 0.1s;

  &:hover {
    border-bottom: 1px solid var(--white);
  }
`;

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: var(--mobile-width);
  text-align: right;
  color: var(--white);
  position: absolute;
  justify-content: center;
  height: 100%;
  width: 100%;
  &:before {
    content: '';
    flex-grow: 4;
  }
  &:after {
    content: '';
    flex-grow: 11;
  }
  pointer-events: all;

  @media only screen and (min-width: 1200px) {
    width: 1200px;
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
  text-align: right;
  white-space: nowrap;

  color: var(--outdoor);
  text-shadow: 0px 0px 30px #08dab7;

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

const ColourTransition = styled.div`
  width: 100%;
  height: 256px;
  background-image: linear-gradient(var(--outdoor), var(--indoor));
`;

const sectionStyles = css`
  display: flex;
  flex-direction: column;
  padding: 0 calc((100% - var(--mobile-width)) / 2);
  @media only screen and (min-width: 1200px) {
    padding: 0 calc((100% - var(--max-width)) / 2);
  }
`;

const OutdoorSection = styled.section`
  ${sectionStyles}
  background-color: var(--outdoor);
  text-align: center;
`;

const StyledSection = styled.section<{
  halves?: boolean;
  center?: boolean;
}>`
  ${sectionStyles}
  text-align: ${(props) => (props.center ? 'center' : 'left')};
  background-color: var(--indoor);
  margin-bottom: 32px;

  @media only screen and (min-width: 1200px) {
    flex-direction: ${(props) => (props.halves ? 'row-reverse' : 'column')};
    &:nth-child(even) {
      flex-direction: ${(props) => (props.halves ? 'row' : 'column')};
    }

    margin-bottom: 96px;
  }
`;

const SectionHeader = styled.h1`
  color: var(--white);
  font-size: 2.1em;
  font-weight: 600;
  font-family: var(--secondary-font);
  align-self: center;

  @media only screen and (min-width: 1200px) {
    align-self: flex-start;
  }
`;

const SectionText = styled.p`
  color: var(--white);
  margin: 0 0 0.5em 0;
  font-weight: 400;
  line-height: 1.8em;
  margin-bottom: 1.3em;
  font-family: var(--primary-font);
`;

const DiscordButton = styled(Button)`
  align-self: center;
  @media only screen and (min-width: 1200px) {
    align-self: flex-start;
  }
`;

const SectionHalf = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: center;

  margin-bottom: 32px;

  @media only screen and (min-width: 1200px) {
    width: 50%;
    text-align: left;
    margin-bottom: 0;
  }
`;

const IndoorImage = styled.img`
  width: 80%;
  align-self: center;
`;

const StatsImage = styled.img`
  width: 60%;
  align-self: center;
`;

const FirstSectionSpacer = styled.div`
  height: 156px;
`;

const ScheduleGraphic = styled.img`
  width: 100%;
  margin: 48px 0;
  object-fit: cover;
  height: 34vw;
  pointer-events: none;
  user-select: none;

  @media only screen and (min-width: 1200px) {
    height: auto;
  }
`;

const SponsorshipContainer = styled.div`
  width: 100%;
  align-self: center;

  @media only screen and (min-width: 1200px) {
    width: 50%;
  }
`;

const SponsorshipTitle = styled.h2`
  color: var(--white);
`;

export default () => (
  <MainLayout>
    <HeroSection>
      <HeroBanner />
    </HeroSection>
    <OutdoorSection>
      <FirstSectionSpacer />
      <SectionHeader>Ottawa's largest hackathon is getting cozy!</SectionHeader>
      <SectionText>
        Get the hot cocoa ready!{' '}
        <span role='img' aria-label='Coffee Emoji'>
          ☕
        </span>{' '}
        To cap off this crazy year, cuHacking is bundling up and getting warm at
        home for its first ever virtual hackathon!
      </SectionText>
    </OutdoorSection>
    <ColourTransition />
    <StyledSection halves id='about'>
      <SectionHalf>
        <SectionHeader>First, a look back</SectionHeader>
        <SectionText>
          For the last four years, cuHacking has continued to bring increasingly
          more hackers together, culminating in an annual event which{' '}
          <u>
            <strong>over 600 hackers</strong>
          </u>{' '}
          enjoyed last year.
        </SectionText>
        <SectionText>
          Although we can't all gather in Richcraft Hall like we normally do, we
          still want to provide a space for hackers to build new things, learn
          new skills, and meet new people.
        </SectionText>
      </SectionHalf>
      <SectionHalf>
        <StatsImage
          aria-label='cuHacking 2020: 602 hackers, 1234 applicants, 120 projects.'
          src={stats}
        />
      </SectionHalf>
    </StyledSection>
    <StyledSection halves>
      <SectionHalf>
        <SectionHeader>How we've adapted</SectionHeader>
        <SectionText>
          This year, cuHacking's themed virtual hackathon "Snowed In" will be
          taking place on our Discord and our website. The coolest part is we're
          already holding events on our server right now! We've been running
          events year-round, and will continue to do so leading up to cuHacking
          2021: Snowed In. Discord will be the primary platform for
          communication, and is where we'll be hosting many of our workshops.
        </SectionText>
        <DiscordButton external link='https://discord.gg/TGvYPnD'>
          Join our Discord Server
        </DiscordButton>
      </SectionHalf>
      <SectionHalf>
        <IndoorImage
          aria-label='Cozy image of a laptop and mug in front of a chair'
          src={indoor}
        />
      </SectionHalf>
    </StyledSection>
    <StyledSection id='schedule'>
      <SectionHeader>Schedule</SectionHeader>
      <SectionText>
        We've also adapted our schedule this year to encourage a{' '}
        <span role='img' aria-label='Sparkles Emoji'>
          ✨
        </span>
        healthier
        <span role='img' aria-label='Sparkles Emoji'>
          ✨
        </span>
        at-home hackathon experience. Conventionally we would host our hackathon
        over 24 hours for non-stop creative programming time. This year, we've
        split our event into three main chunks to allow for proper rest and
        conscious coding while at home.
      </SectionText>
      <ScheduleGraphic
        aria-label='January 29: Network and Socialize. January 30: Hack and Learn. January 31: Demo and Flex.'
        src={schedule}
      />
    </StyledSection>
    <StyledSection center>
      <SponsorshipContainer>
        <SponsorshipTitle>Interested in becoming a sponsor?</SponsorshipTitle>
        <SectionText>
          Our sponsors are a big reason why our event is such a hit every year.
          Join us this year digitally to network with innovative students and
          make connections with our amazing tech community!
        </SectionText>
        <Button external link='mailto:sponsorship@cuhacking.com'>
          Become a Sponsor
        </Button>
      </SponsorshipContainer>
    </StyledSection>
    <StyledSection id='sponsors' center>
      <SectionHeader>Sponsors</SectionHeader>
    </StyledSection>

    <StyledSection id='FAQ'>
      <SectionHeader>FAQ</SectionHeader>
      <FaqPanel entries={faqs} />
    </StyledSection>
  </MainLayout>
);
