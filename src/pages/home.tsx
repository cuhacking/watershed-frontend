import React from 'react';
import styled from 'styled-components';
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
import {Button} from '../components';

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
  background-position-x: 28%;
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
      </HeroText>
    </HeroLayerWrapper>
  );

  layers = [...front, text, ...back];

  return <HeroBannerWrapper>{layers}</HeroBannerWrapper>;
};

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
    flex-grow: 5;
  }
  &:after {
    content: '';
    flex-grow: 11;
  }
  pointer-events: all;

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

const StyledSection = styled.section<{
  halves?: boolean;
  center?: boolean;
  color: 'indoor' | 'outdoor';
}>`
  display: flex;
  flex-direction: row;
  padding: 0 calc((100% - var(--mobile-width)) / 2);
  flex-direction: column;
  padding-bottom: 72px;
  text-align: ${(props) => (props.center ? 'center' : 'left')};
  background-color: ${(props) =>
    props.color === 'indoor' ? 'var(--indoor)' : 'var(--outdoor)'};

  @media only screen and (min-width: 1200px) {
    padding: 0 calc((100% - var(--max-width)) / 2);
    flex-direction: ${(props) => (props.halves ? 'row-reverse' : 'column')};
    &:nth-child(even) {
      flex-direction: ${(props) => (props.halves ? 'row' : 'column')};
    }
  }
`;

const SectionHeader = styled.h1`
  color: var(--white);
  font-size: 2.1em;
  font-weight: 600;
  font-family: var(--secondary-font);
`;

const SectionText = styled.p`
  color: var(--white);
  margin: 0 0 0.5em 0;
  font-weight: 400;
  line-height: 1.8em;
  margin-bottom: 1.3em;
  font-family: var(--primary-font);
`;

const SectionHalf = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  @media only screen and (min-width: 1200px) {
    width: 50%;
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
  margin: 24px 0 48px;
`;

export default () => (
  <MainLayout>
    <HeroSection>
      <HeroBanner />
    </HeroSection>
    <StyledSection color='outdoor' center>
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
    </StyledSection>
    <ColourTransition />
    <StyledSection color='indoor' halves id='about'>
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
    <StyledSection color='indoor' halves>
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
        <Button external link='https://discord.gg/TGvYPnD'>
          Join our Discord Server
        </Button>
      </SectionHalf>
      <SectionHalf>
        <IndoorImage
          aria-label='Cozy image of a laptop and mug in front of a chair'
          src={indoor}
        />
      </SectionHalf>
    </StyledSection>
    <StyledSection color='indoor' id='schedule'>
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
    <StyledSection color='indoor' id='sponsors'>
      <SectionHeader>Sponsors</SectionHeader>
    </StyledSection>
  </MainLayout>
);
