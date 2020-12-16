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
import {ReactComponent as Logo} from 'assets/img/word-and-year-logo-white.svg';
import {
  BannerLayer,
  ParallaxBanner,
  ParallaxProvider,
} from 'react-scroll-parallax';

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100vh;
  min-height: 600px;
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

  let layers: BannerLayer[] = layerImages.map((image, index) => ({
    image,
    amount: (layerImages.length - 1 - index) * 0.1,
    props: {
      style: {backgroundSize: 'auto 100vh', backgroundPosition: 'center', backgroundRepeatY: "no-repeat"},
    },
  }));

  const textLayer = 5;
  const front = layers.slice(0, textLayer);
  const back = layers.slice(textLayer);
  const text = {
    amount: (layerImages.length - 1 - textLayer) * 0.1,
    children: (
      <HeroText>
        <StyledLogo />
        <Title>Snowed In</Title>
        <Date>January 29–31, 2021</Date>
        <Location>Virtual, Worldwide</Location>
      </HeroText>
    ),
    props: {
      style: {
        display: 'flex',
        justifyContent: 'center',
      },
    },
  };

  layers = [...front, text, ...back];

  return <ParallaxBanner layers={layers} style={{height: '100%'}} />;
};

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: var(--mobile-width);
  text-align: right;
  color: var(--wineDark);
  position: absolute;
  justify-content: center;
  height: 100%;
  width: 100%;
  &:before {
    content: '';
    flex-grow: 8;
  }
  &:after {
    content: '';
    flex-grow: 11;
  }

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
  <ParallaxProvider>
    <MainLayout>
      <HeroSection>
        <HeroBanner />
      </HeroSection>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
      <h1>Text</h1>
    </MainLayout>
  </ParallaxProvider>
);
