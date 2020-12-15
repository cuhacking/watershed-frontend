import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {
  faDiscord,
  faFacebookF,
  faLinkedin,
  faInstagram,
  faTwitter,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

import {ReactComponent as WordLogo} from 'assets/img/word-logo-white.svg';

const StyledFooter = styled.footer`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  padding-top: 20px;
  padding-bottom: 20px;
  width: 100vw;

  color: var(--white);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: var(--mobile-width);

  @media only screen and (min-width: 1200px) {
    max-width: var(--max-width);
  }
`;

const BackToTopButton = styled.button`
  align-self: flex-end;
  padding: 0;
  color: var(--white);
  background: none;
  border: none;

  font-family: var(--secondary-font);
  font-size: 1.25rem;
  font-weight: normal;

  margin: 0 0 20px;

  @media only screen and (min-width: 700px) {
    font-size: 1.125rem;
    margin: 0;

    transition: 0.1s ease-in;

    &:hover {
      cursor: pointer;
      color: var(--vanilla);
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: var(--mobile-width);

  @media only screen and (min-width: 700px) {
    flex-direction: row;
    justify-content: space-between;
  }

  @media only screen and (min-width: 1200px) {
    max-width: var(--max-width);
  }
`;

const StyledLogo = styled(WordLogo)`
  width: 200px;
  height: 55px;
`;

const SocialDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 15em;

  margin-top: 10px;
`;

const StyledIcon = styled.a`
  font-size: 1.5rem;
  transition: 0.1s ease-in;

  @media only screen and (min-width: 1200px) {
    transition: 0.1s ease-in;

    &:hover {
      color: var(--vanilla);
    }
  }
`;

const Footer = () => (
  <StyledFooter>
    <Container>
      <BackToTopButton
        type='button'
        onClick={() =>
          window ? window.scrollTo({top: 0, behavior: 'smooth'}) : {}
        }
      >
        <FontAwesomeIcon icon={faArrowUp} size='sm' /> Back to Top
      </BackToTopButton>
      <Content>
        <a
          href='https://cuhacking.com'
          rel='noopener noreferrer external'
          target='_blank'
        >
          <StyledLogo />
        </a>
        <SocialDiv>
          <StyledIcon
            target='_blank'
            rel='noopener noreferrer external'
            href='https://discord.gg/TGvYPnD'
          >
            <FontAwesomeIcon icon={faDiscord} size='1x' />
          </StyledIcon>
          <StyledIcon
            target='_blank'
            rel='noopener noreferrer external'
            href='https://www.facebook.com/cuhacking/'
          >
            <FontAwesomeIcon icon={faFacebookF} size='1x' />
          </StyledIcon>
          <StyledIcon
            target='_blank'
            rel='noopener noreferrer external'
            href='https://www.linkedin.com/company/cuhacking/'
          >
            <FontAwesomeIcon icon={faLinkedin} size='1x' />
          </StyledIcon>
          <StyledIcon
            target='_blank'
            rel='noopener noreferrer external'
            href='https://www.instagram.com/cuHacking/'
          >
            <FontAwesomeIcon icon={faInstagram} size='1x' />
          </StyledIcon>
          <StyledIcon
            target='_blank'
            rel='noopener noreferrer external'
            href='https://twitter.com/cuhacking'
          >
            <FontAwesomeIcon icon={faTwitter} size='1x' />
          </StyledIcon>
          <StyledIcon
            target='_blank'
            rel='noopener noreferrer external'
            href='https://github.com/cuhacking'
          >
            <FontAwesomeIcon icon={faGithub} size='1x' />
          </StyledIcon>
        </SocialDiv>
      </Content>
    </Container>
  </StyledFooter>
);

export default Footer;
