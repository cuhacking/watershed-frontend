import {faDiscord} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Button, LoadingSymbol} from '../../components';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {buttonStyle} from './login';
import {useHistory} from 'react-router-dom';
import {useDashboardInfo} from '../../hooks/useDashboardInfo';
import {useAuth} from '../../hooks';
import {clearInterval} from 'timers';
import {ExitIcon} from '../../assets/img/icons';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: var(--wineDark);
  display: flex;
  padding: 1rem;
`;

const CheckInContainer = styled.div`
  margin: auto;
  max-width: 1440px;
  min-width: 600px;

  & h1 {
    font-family: var(--primary-font);
    font-size: 64px;
    font-weight: 400;
  }

  & h2 {
    font-family: var(--secondary-font);
    font-size: 28px;
    font-weight: 300;
  }
`;

const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  margin-bottom: 25px;
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
`;

const StepLabel = styled.div`
  display: flex;
  align-items: center;

  & label {
    margin-left: 1rem;
    font-size: 1rem;
    font-family: var(--font-secondary);
  }
`;

const Marker = styled.div`
  height: 2rem;
  width: 2rem;
  display: flex;
  padding: 4px;
  background-color: var(--white);
  color: var(--wineDark);
  border-radius: 100%;

  & label {
    font-family: var(--primary-font);
    font-size: 1rem;
    margin: auto;
  }
`;

const DiscordButton = styled.a`
  ${buttonStyle}
  background-color: #738adb;
  cursor: pointer;
`;

const SignOutButton = styled.a`
  border: none;
  background: none;
  padding: 0;
  font-family: var(--secondary-font);
  font-size: 1rem;

  display: flex;
  align-items: center;

  color: var(--white);

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  svg {
    margin-right: 0.25rem;
  }
`;

const SmallText = styled.p`
  margin: 0;
  margin-left: 20px;
  font-size: 0.8rem;
  font-style: italic;
`;

const CheckIn = () => {
  const [discordConnected, setDiscordConnected] = useState(false);
  const [discordServer, setDiscordServer] = useState(false);
  const {dashboard, refresh} = useDashboardInfo();
  const history = useHistory();
  const {request, signOut} = useAuth();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const asyncFunc = async () => {
      if (dashboard?.user.discordId == null) {
        return;
      }

      setDiscordConnected(true);

      const response = await request('/api/user/checkUserDiscord');

      if (!response.ok) {
        return;
      }

      setDiscordServer(true);
    };

    if (dashboard?.user.checkedIn) {
      history.push('/dashboard');
      return;
    } else {
      setLoading(false);
    }

    asyncFunc();
  }, [dashboard]);

  const checkIn = () => {
    setLoading(true);
    request('/api/user/checkIn').then((res) => {
      if (res.ok) {
        refresh()
          .then(() => {
            setLoading(false);
            history.push('/dashboard');
          })
          .catch(() => {
            setLoading(false);
          });
      }
    });
  };

  const linkDiscord = () => {
    request('/api/auth/discord/link').then((response) => {
      if (response.redirected) {
        window.open(response.url);
      }
    });
  };

  if (isLoading) {
    return (
      <Container>
        <CheckInContainer>
          <LoadingSymbol color='var(--white)' />
        </CheckInContainer>
      </Container>
    );
  }

  return (
    <Container>
      <CheckInContainer>
        <h1>Check In</h1>
        <h2>Complete the steps below to get started!</h2>
        <p>
          Refresh the page to see updates <span aria-label=':)'>🙂</span>
        </p>
        <StepsContainer>
          <Step
            style={{
              opacity: !discordConnected ? 1 : 0.5,
              pointerEvents: !discordConnected ? 'all' : 'none',
            }}
          >
            <StepLabel>
              <Marker>
                <label>{discordConnected ? '✓' : '1'}</label>
              </Marker>
              <div>
                <label>Connect your Discord account</label>
                {discordConnected && dashboard?.user.discordUsername && (
                  <SmallText>
                    Connected user: {dashboard?.user.discordUsername}
                  </SmallText>
                )}
              </div>
            </StepLabel>
            <DiscordButton onClick={() => linkDiscord()}>
              <FontAwesomeIcon icon={faDiscord} />
              Link your Discord
            </DiscordButton>
          </Step>
          <Step
            style={{
              opacity: discordConnected && !discordServer ? 1 : 0.5,
              pointerEvents:
                discordConnected && !discordServer ? 'all' : 'none',
            }}
          >
            <StepLabel>
              <Marker>
                <label>{discordServer ? '✓' : '2'}</label>
              </Marker>
              <label>Join our Discord Server</label>
            </StepLabel>
            <DiscordButton href='https://discord.gg/TGvYPnD'>
              <FontAwesomeIcon icon={faDiscord} />
              Join our Server
            </DiscordButton>
          </Step>
          <Step
            style={{
              opacity: discordConnected && discordServer ? 1 : 0.5,
              pointerEvents: discordConnected && discordServer ? 'all' : 'none',
            }}
          >
            <StepLabel>
              <Marker>
                <label>3</label>
              </Marker>
              <label>Check in!</label>
            </StepLabel>
            <Button
              kind='button'
              color='var(--wineLight)'
              action={() => checkIn()}
            >
              Start Hacking!
            </Button>
          </Step>
        </StepsContainer>
        <SignOutButton onClick={signOut}>
          <ExitIcon /> Sign Out
        </SignOutButton>
      </CheckInContainer>
    </Container>
  );
};

export default CheckIn;
