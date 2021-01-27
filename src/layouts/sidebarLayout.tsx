import React from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {useAuth} from '../hooks';
import {Button, Sidebar} from '../components';

const Container = styled.div`
  position: relative;
  display: flex;

  min-width: 100%;
  min-height: 100vh;

  background-color: var(--warmWhite);
  color: var(--indoor);
`;

const DesktopSidebar = styled(Sidebar)`
  display: none;

  @media only screen and (min-width: 700px) {
    display: unset;
  }
`;

const Main = styled.main`
  display: none;

  @media only screen and (min-width: 700px) {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 0 20px;
    padding-left: calc(var(--sidebar-width) + 20px);
  }
`;

const MobileView = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 5vw;

  background-color: var(--wineDark);
  color: var(--white);

  text-align: center;

  @media only screen and (min-width: 700px) {
    display: none;
  }
`;

const StyledButton = styled(Button)`
  margin-top: 16px;
`;

interface LayoutProps {
  children: React.ReactNode;
}

export default ({children}: LayoutProps) => {
  const history = useHistory();
  const {signOut} = useAuth();

  const handleSignOut = async () => {
    await signOut();
    history.push('/');
  };

  return (
    <Container>
      <DesktopSidebar />
      <Main>{children}</Main>
      <MobileView>
        <h1>Screen Too Narrow</h1>
        <p>
          Our dashboard doesn't support mobile devices. Please sign in on a
          device with a wider screen, such as a laptop or desktop.
        </p>
        <StyledButton
          kind='button'
          color='var(--wineLight)'
          action={handleSignOut}
        >
          Sign Out
        </StyledButton>
      </MobileView>
    </Container>
  );
};
