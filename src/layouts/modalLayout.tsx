import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {ReactComponent as Logo} from 'assets/img/word-and-year-logo-white.svg';

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
  min-width: 100%;
  min-height: 100vh;

  background-color: var(--spaceDark);
`;

const Modal = styled.main`
  width: var(--mobile-width);
  min-width: 330px;
  padding: 32px 16px;
  margin-bottom: 32px;
  background-color: var(--spaceGrey);
  border-radius: 20px;

  box-shadow: var(--hover);
  text-align: center;

  @media only screen and (min-width: 700px) {
    width: unset;
    padding: 48px 32px;
  }
`;

export default (props: {children: React.ReactNode}) => (
  <Content>
    <LogoLink to='/'>
      <StyledLogo />
    </LogoLink>
    <Modal>{props.children}</Modal>
  </Content>
);
