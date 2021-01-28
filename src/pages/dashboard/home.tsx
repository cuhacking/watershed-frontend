import React from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {useAuth, useApplication} from '../../hooks';
import {Button, LoadingSymbol, Sidebar} from '../../components';
import {Link} from 'react-router-dom';
import {ReactComponent as Logo} from 'assets/img/word-and-year-logo-white.svg';

const StyledLogo = styled(Logo)`
  width: 300px;
  height: 50px;
`;

const LogoLink = styled(Link)`
  margin-bottom: 50px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-width: 100vw;
  min-height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: var(--mobile-width);

  text-align: center;

  @media only screen and (min-width: 700px) {
    max-width: var(--reading-width);
  }
`;

const StyledButton = styled(Button)`
  margin-top: 16px;
`;

export default () => {
  const history = useHistory();
  const {signOut} = useAuth();
  const {isLoading, application} = useApplication();

  const handleSignOut = async () => {
    await signOut();
    history.push('/');
  };

  if (isLoading) {
    return (
      <Container>
        <p>Let's see here...</p>
        <LoadingSymbol />
      </Container>
    );
  }

  if (application === null) {
    return (
      <Container>
        <Content>
          <LogoLink to='/'>
            <StyledLogo />
          </LogoLink>
          <h1>Registrations closed.</h1>
          <p>
            Sorry, registrations closed on January 27, 23:59 EST.
            <br />
            <br />
            Follow us on our socials so you don't miss out on our future events!
          </p>
          <StyledButton
            kind='button'
            color='var(--wineLight)'
            action={handleSignOut}
          >
            Sign Out
          </StyledButton>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <LogoLink to='/'>
          <StyledLogo />
        </LogoLink>
        <h1>Get Ready!</h1>
        <p>
          The event schedule is{' '}
          <Link style={{textDecoration: 'underline'}} to='/schedule'>
            now available
          </Link>
          . Check out the activities and workshops that will be taking place
          during the event!
        </p>
        <p>
          The hackathon will take place on our Discord along with this website.
          You will need to be a member of the Discord server in order to
          participate.
          <br />
          <br />
          Join now so you don't miss out!
        </p>
        <StyledButton
          kind='anchor'
          color='var(--wine)'
          external
          link='https://discord.gg/TGvYPnD'
        >
          Join our Discord Server
        </StyledButton>

        <StyledButton
          kind='button'
          color='var(--wineLight)'
          action={handleSignOut}
        >
          Sign Out
        </StyledButton>
      </Content>
    </Container>
  );
};
