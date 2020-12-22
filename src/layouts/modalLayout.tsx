import React from 'react';
import styled from 'styled-components';

import {ReactComponent as Logo} from 'assets/img/word-and-year-logo-white.svg';
import bkgSLWebP from 'assets/img/hero/webp-720/base.webp';
import bkgMWebP from 'assets/img/hero/webp-1080/base.webp';
import bkgLWebP from 'assets/img/hero/webp-1440/base.webp';
import bkgXLWebP from 'assets/img/hero/webp-original/base.webp';
import bkgSLPng from 'assets/img/hero/png-720/base.png';
import bkgMPng from 'assets/img/hero/png-1080/base.png';
import bkgLPng from 'assets/img/hero/png-1440/base.png';
import bkgXLPng from 'assets/img/hero/png-original/base.png';

const BackgroundPicture = styled.picture`
  width: 100%;
  height: 100vh;
  position: absolute;
  display: flex;
  justify-content: center;
  pointer-events: none;
  z-index: -1;
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
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Modal = styled.main`
  width: var(--mobile-width);
  padding: 30px;
  background-color: var(--spaceDark);
  border-radius: 20px;
  box-shadow: var(--hover);

  text-align: center;
`;

export default (props: {children: React.ReactNode}) => (
  <>
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
    <Container>
      <StyledLogo />
      <Modal>{props.children}</Modal>
    </Container>
  </>
);
