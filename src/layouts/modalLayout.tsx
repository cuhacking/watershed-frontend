import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {ReactComponent as Logo} from 'assets/img/word-and-year-logo-white.svg';
import bkgSLWebP from 'assets/img/hero/webp-720/base.webp';
import bkgMWebP from 'assets/img/hero/webp-1080/base.webp';
import bkgLWebP from 'assets/img/hero/webp-1440/base.webp';
import bkgXLWebP from 'assets/img/hero/webp-original/base.webp';
import bkgSLPng from 'assets/img/hero/png-720/base.png';
import bkgMPng from 'assets/img/hero/png-1080/base.png';
import bkgLPng from 'assets/img/hero/png-1440/base.png';
import bkgXLPng from 'assets/img/hero/png-original/base.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;
  min-height: 100vh;

  position: relative;
  background-color: var(--spaceDark);
`;

const BackgroundPicture = styled.picture`
  width: 100%;
  height: 100vh;
  position: absolute;
  display: flex;
  justify-content: center;
  pointer-events: none;
`;

const HeroImg = styled.img`
  object-fit: cover;
  object-position: 60% 50%;

  @media only screen and (min-width: 1200px) {
    width: 100%;
    object-position: center;
  }
`;

const StyledLogo = styled(Logo)`
  width: 300px;
  height: 50px;
`;

const LogoLink = styled(Link)`
  margin: 75px 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  z-index: 1;
`;

const Modal = styled.main`
  width: var(--mobile-width);
  min-width: 330px;
  padding: 32px;
  margin-bottom: 32px;
  background-color: var(--spaceDark);
  border-radius: 20px;

  box-shadow: var(--hover);
  text-align: center;

  @media only screen and (min-width: 700px) {
    width: unset;
    padding: 48px 32px;
  }
`;

export default (props: {children: React.ReactNode}) => (
  <Container>
    <BackgroundPicture>
      <source
        type='image/webp'
        media='(max-height: 720px)'
        srcSet={bkgSLWebP}
      />
      <source
        type='image/webp'
        media='(max-height: 1080px)'
        srcSet={bkgMWebP}
      />
      <source
        type='image/webp'
        media='(max-height: 1440px)'
        srcSet={bkgLWebP}
      />
      <source
        type='image/webp'
        media='(min-height: 1441px)'
        srcSet={bkgXLWebP}
      />
      <source type='image/png' media='(max-height: 720px)' srcSet={bkgSLPng} />
      <source type='image/png' media='(max-height: 1080px)' srcSet={bkgMPng} />
      <source type='image/png' media='(max-height: 1440px)' srcSet={bkgLPng} />
      <source type='image/png' media='(min-height: 1441px)' srcSet={bkgXLPng} />
      <HeroImg
        alt={`Background Image`}
        width='100%'
        height='100%'
        src={bkgLPng}
      />
    </BackgroundPicture>
    <Content>
      <LogoLink to='/'>
        <StyledLogo />
      </LogoLink>
      <Modal>{props.children}</Modal>
    </Content>
  </Container>
);
