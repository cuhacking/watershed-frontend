import React, {useState} from 'react';
import {Helmet} from 'react-helmet';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {Input} from '../../components';

import {ReactComponent as Logo} from 'assets/img/word-and-year-logo-white.svg';
import bkgSLWebP from 'assets/img/hero/webp-720/base.webp';
import bkgMWebP from 'assets/img/hero/webp-1080/base.webp';
import bkgLWebP from 'assets/img/hero/webp-1440/base.webp';
import bkgXLWebP from 'assets/img/hero/webp-original/base.webp';
import bkgSLPng from 'assets/img/hero/png-720/base.png';
import bkgMPng from 'assets/img/hero/png-1080/base.png';
import bkgLPng from 'assets/img/hero/png-1440/base.png';
import bkgXLPng from 'assets/img/hero/png-original/base.png';

const RelativeContainer = styled.div`
  position: relative;
  background-color: var(--spaceDark);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BackgroundPicture = styled.picture`
  width: 100%;
  height: 100vh;
  position: absolute;
  display: flex;
  justify-content: center;
  pointer-events: none;
  z-index: 0;
`;

const HeroImg = styled.img`
  object-fit: cover;
  object-position: 60% 50%;

  @media only screen and (min-width: 1200px) {
    width: 100%;
    object-position: center;
  }
`;

const Content = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StyledLogo = styled(Logo)`
  width: 300px;
`;

const FloatingWindow = styled.div`
  width: var(--mobile-width);
  padding: 30px;
  background-color: var(--spaceDark);
  border-radius: 20px;
  box-shadow: var(--hover);

  text-align: center;
`;

const LoginForm = styled.form``;

const ErrorMessage = styled.p`
  color: var(--wineDark);
`;

const SubmitButton = styled.button``;

const DiscordButton = styled.button``;

const BackButton = styled.button``;

export default () => {
  const [email, setEmail] = useState('');
  const [passwordA, setPasswordA] = useState('');
  const [passwordB, setPasswordB] = useState('');

  const handleFormChange = (e: any) => {};

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <RelativeContainer>
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
          <source
            type='image/png'
            media='(max-height: 720px)'
            srcSet={bkgSLPng}
          />
          <source
            type='image/png'
            media='(max-height: 1080px)'
            srcSet={bkgMPng}
          />
          <source
            type='image/png'
            media='(max-height: 1440px)'
            srcSet={bkgLPng}
          />
          <source
            type='image/png'
            media='(min-height: 1441px)'
            srcSet={bkgXLPng}
          />
          <HeroImg
            alt={`Background Image`}
            width='100%'
            height='100%'
            src={bkgLPng}
          />
        </BackgroundPicture>
        <Content>
          <StyledLogo />
          <FloatingWindow>
            <p>Create an account below to register for the hackathon! </p>
            <LoginForm>
              <Input
                onChange={handleFormChange}
                type='email'
                name='email'
                value={email}
                placeHolder='Email'
                displayLabel
                padded
                required={true}
              />
              <Input
                onChange={handleFormChange}
                type='password'
                name='password'
                value={passwordA}
                placeHolder='Password'
                displayLabel
                padded
                required={true}
              />
              <Input
                onChange={handleFormChange}
                type='password'
                name='confirmPassword'
                value={passwordB}
                placeHolder='Confirm Password'
                displayLabel
                padded
                required={true}
              />
              <ErrorMessage>This is a test error message.</ErrorMessage>
              <SubmitButton type='submit'>Continue</SubmitButton>
            </LoginForm>
            <BackButton>Choose a different sign up method.</BackButton>
          </FloatingWindow>
        </Content>
      </RelativeContainer>
    </>
  );
};
