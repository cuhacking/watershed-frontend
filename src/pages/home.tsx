import React from 'react';
import styled, {css} from 'styled-components';
import {MainLayout} from '../layouts';
import stats from 'assets/img/stats.svg';
import schedule from 'assets/img/schedule-graphic.svg';
import {ReactComponent as Logo} from 'assets/img/word-and-year-logo-white.svg';
import {RellaxWrapper} from 'react-rellax-wrapper';
import {Button, FAQEntry, FaqPanel, Sponsor} from '../components';
import {heroStacks, ImageStack} from '../hero';

import indoorPng720 from 'assets/img/indoor/720.png';
import indoorPng1080 from 'assets/img/indoor/1080.png';
import indoorPng1440 from 'assets/img/indoor/1440.png';
import indoorPng from 'assets/img/indoor/original.png';
import indoorWebP720 from 'assets/img/indoor/720.webp';
import indoorWebP1080 from 'assets/img/indoor/1080.webp';
import indoorWebP1440 from 'assets/img/indoor/1440.webp';
import indoorWebP from 'assets/img/indoor/original.webp';

import macadamian from 'assets/img/sponsors/macadamian.svg';
import fdmGroup from 'assets/img/sponsors/fdm-group.svg';

const faqs: FAQEntry[] = [
  {
    question: 'What is cuHacking 2021: Snowed In?',
    answer: `cuHacking is Ottawa's largest annual student-run hackathon. Think of it as a marathon of learning and building new things. "Snowed In" is what we're calling the 2021 edition of cuHacking. Over the weekend of January 29–31, students from around the country, and possibly the world, from various backgrounds and skill levels will participate in events, workshops, network with engaging companies, and work on personal projects!`,
  },
  {
    question: 'Is this an online event?',
    answer: `Yes, it is. cuHacking has historically been held in person in Richcraft Hall at Carleton University. This year, we are keeping all of our hackers safe, and hosting our event online on our Discord server. We can't wait to see you again in person when we can guarantee your safety!`,
  },
  {
    question: 'How much does it cost to attend?',
    answer: `cuHacking, along with all other MLH hackathons are completely free to attend for all students. Even though the event has no cost, you still have the chance to win amazing prizes for participating in our event. Follow the registration information found on this page to sign up for this amazing weekend!`,
  },
  {
    question: `What if I've never participated in a hackathon?`,
    answer: `Every year we are excited to welcome students of all skill levels to our event. In previous years, half of our attendees have had their first hackathon experiences at cuHacking. There will be lots of opportunities to learn new skills, participate in activities, and make new connections, regardless of your skill or experience set.`,
  },
  {
    question: 'Who can attend cuHacking 2021?',
    answer: `If you're a student, you can attend! When we say students, we mean *any student.* Middle schoolers, high schoolers, university students, and college students of all skill levels are welcome at our event. You don't need to be in any specific program or focus to attend either. If you're interested in tech, this event is for you!`,
  },
  {
    question: 'How do I sign up?',
    answer: `Keep tabs on our social media and join our Discord server to stay in the loop! Once applications are open, you won't be able to miss the big button at the top of this site.`,
  },
  {
    question: 'Where will cuHacking be hosted?',
    answer: `The event will be run through our website and our Discord server. Once you've registered here and joined the Discord server, you're all set!`,
  },
  {
    question: 'How big are teams?',
    answer: `Teams can be anywhere from 1–4 people. You'll have plenty of opportunities to find teammates before hacking starts!`,
  },
  {
    question: 'Can I work on an existing project?',
    answer: `To be eligible to participate in challenges and win prizes, your project must not be started until hacking officially begins on Saturday. You're more than welcome to come up with ideas beforehand though!`,
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

const HeroLayerImage = styled.img`
  object-fit: cover;
  object-position: 60% 50%;

  @media only screen and (min-width: 1200px) {
    width: 100%;
    object-position: center;
  }
`;

// Uses a stack of different png and webp images to let the browser choose the optimal size to use
const HeroLayer2 = ({stack}: {stack: ImageStack}) => {
  return (
    <picture>
      <source
        type='image/webp'
        media='(max-height: 720px)'
        srcSet={stack.webp[0]}
      />
      <source
        type='image/webp'
        media='(max-height: 1080px)'
        srcSet={stack.webp[1]}
      />
      <source
        type='image/webp'
        media='(max-height: 1440px)'
        srcSet={stack.webp[2]}
      />
      <source
        media='(min-height: 1441px)'
        type='image/webp'
        srcSet={stack.webp[3]}
      />
      <source
        type='image/png'
        media='(max-height: 720px)'
        srcSet={stack.png[0]}
      />
      <source
        type='image/png'
        media='(max-height: 1080px)'
        srcSet={stack.png[1]}
      />
      <source
        type='image/png'
        media='(max-height: 1440px)'
        srcSet={stack.png[2]}
      />
      <source
        media='(min-height: 1441px)'
        type='image/png'
        srcSet={stack.png[3]}
      />
      <HeroLayerImage
        alt={`Hero Image Layer`}
        width='100%'
        height='100%'
        src={stack.png[2]}
      />
    </picture>
  );
};

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
  let layers = heroStacks.map((image, index) => (
    <HeroLayerWrapper
      key={`image-${index}`}
      speed={-1.5 * (heroStacks.length - 1 - index)}
    >
      <HeroLayer2 stack={image} />
    </HeroLayerWrapper>
  ));

  const textLayer = 5;
  const front = layers.slice(0, textLayer);
  const back = layers.slice(textLayer);
  const text = (
    <HeroLayerWrapper
      key='text-0'
      speed={-1.5 * (heroStacks.length - 1 - textLayer)}
    >
      <HeroText>
        <StyledLogo />
        <Title>Snowed In</Title>
        <Date>January 29–31, 2021</Date>
        <Location>Virtual, Worldwide</Location>
        <HeroActions>
          <RegistrationLink>
            Registration Opens Dec. 22
          </RegistrationLink>
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
  flex-direction: column;
  align-self: center;
  margin-top: 16px;
  text-align: center;
  align-content: center;
`;

const RegistrationLink = styled.div`
  box-sizing: border-box;
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
    flex-grow: 6;
  }
  &:after {
    content: '';
    flex-grow: 11;
  }
  pointer-events: all;

  @media only screen and (min-width: 1200px) {
    width: 1200px;

    &:before {
      content: '';
      flex-grow: 4;
    }
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
`;

const Location = styled.p`
  margin: 5px;
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
  align-items: center;

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

const OutdoorHeader = styled(SectionHeader)`
  align-self: center;
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
  margin-left: 16px;
  @media only screen and (min-width: 1200px) {
    margin-left: 48px;
  }
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

const SponsorTitle = styled(SectionHeader)`
  align-self: center;
`;

const SponsorLogos = styled.div`
  display: flex;
  flex-direction: column;
`;
const LogoRow = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
`;

export default () => (
  <MainLayout>
    <HeroSection>
      <HeroBanner />
    </HeroSection>
    <OutdoorSection>
      <FirstSectionSpacer />
      <OutdoorHeader>Ottawa's largest hackathon is getting cozy!</OutdoorHeader>
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
          For the last four years, cuHacking has continued to bring more and
          more hackers together, culminating in an annual event that{' '}
          <u>
            <strong>over 600 hackers</strong>
          </u>{' '}
          enjoyed last year. We are proud to be considered Ottawa's largest MLH
          hackathon!
        </SectionText>
        <SectionText>
          Although we can't all gather in Richcraft Hall this January like we
          normally do, we still intend to provide a space for hackers to build
          new things, learn new skills, and meet new people.
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
          This year, our main event will be taking place on our Discord and our
          website. The coolest part is we're already holding events on our
          server right now! We've been running events year-round and will
          continue to do so leading up to cuHacking 2021: Snowed In. Discord
          will be the primary platform for communication and is where we'll be
          hosting many of our workshops.
        </SectionText>
        <DiscordButton external link='https://discord.gg/TGvYPnD'>
          Join our Discord Server
        </DiscordButton>
      </SectionHalf>
      <SectionHalf>
        <picture>
          <source
            type='image/webp'
            media='(max-height: 720px)'
            srcSet={indoorWebP720}
          />
          <source
            type='image/webp'
            media='(max-height: 1080px)'
            srcSet={indoorWebP1080}
          />
          <source
            type='image/webp'
            media='(max-height: 1440px)'
            srcSet={indoorWebP1440}
          />
          <source
            media='(min-height: 1441px)'
            type='image/webp'
            srcSet={indoorWebP}
          />
          <source
            type='image/png'
            media='(max-height: 720px)'
            srcSet={indoorPng720}
          />
          <source
            type='image/png'
            media='(max-height: 1080px)'
            srcSet={indoorPng1080}
          />
          <source
            type='image/png'
            media='(max-height: 1440px)'
            srcSet={indoorPng1440}
          />
          <source
            media='(min-height: 1441px)'
            type='image/png'
            srcSet={indoorPng}
          />
          <IndoorImage
            aria-label='Cozy image of a laptop and mug in front of a chair'
            src={indoorPng1080}
          />
        </picture>
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
    <StyledSection id='sponsors' center>
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
    <StyledSection center>
      <SponsorTitle>Sponsors</SponsorTitle>
      <SponsorLogos>
        <LogoRow>
          <Sponsor
            logo={fdmGroup}
            name='FDM Group'
            size={2}
            url='https://www.fdmgroup.com/en-ca/ca-home/'
          />
        </LogoRow>
        <LogoRow>
          <Sponsor
            logo={macadamian}
            name='Macadamian'
            size={1}
            url='https://www.macadamian.com/'
          />
        </LogoRow>
      </SponsorLogos>
    </StyledSection>

    <StyledSection id='FAQ'>
      <SectionHeader>FAQ</SectionHeader>
      <FaqPanel entries={faqs} />
    </StyledSection>
  </MainLayout>
);
