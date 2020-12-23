import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {useAuth, useApplication} from '../../hooks';
import {Button, LoadingSymbol} from '../../components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-width: 100vw;
  min-height: 100vh;
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
        <h1>Register now!</h1>
        <p>Don't wait! Start registration by pressing the button below.</p>
        <StyledButton
          kind='link'
          color='var(--wine)'
          link='/dashboard/registration'
        >
          Start Registration
        </StyledButton>
        <StyledButton
          kind='button'
          color='var(--wineDark)'
          action={handleSignOut}
        >
          Sign Out
        </StyledButton>
      </Container>
    );
  }

  return (
    <Container>
      <h1>All set!</h1>
      <p>You're good to go. Join our Discord Server for further updates.</p>
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
        color='var(--wineDark)'
        action={handleSignOut}
      >
        Sign Out
      </StyledButton>
    </Container>
  );
};
