import {faDiscord} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Button} from '../../components';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {buttonStyle} from './login';
import {useHistory} from 'react-router-dom';
import {useDashboardInfo} from '../../hooks/useDashboardInfo';
import {useAuth} from '../../hooks';
import {clearInterval} from 'timers';

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

const CheckIn = () => {
  const [discordConnected, setDiscordConnected] = useState(false);
  const [discordServer, setDiscordServer] = useState(false);
  const {dashboard, refresh} = useDashboardInfo();
  const history = useHistory();
  const {request} = useAuth();

  const checkDiscordServerStatus = () => {
    setInterval((timer) => {
      request('/api/user/checkUserDiscord').then((res) => {
        if (res) {
          setDiscordServer(true);
          clearInterval(timer);
        }
      });
    }, 5000);
  };

  const checkDiscordConnectionStatus = () => {
    setInterval((timer) => {
      refresh();
      if (dashboard?.user.discordId) {
        clearInterval(timer);
      }
    }, 5000);
  };

  const checkIn = () => {
    request('/api/user/checkIn').then((res) => {
      if (res) {
        history.push('/dashboard');
      }
    });
  };

  useEffect(() => {
    const connected = dashboard?.user.checkedIn;
    if (!connected) {
      checkDiscordConnectionStatus();
    }

    setDiscordConnected(dashboard?.user.discordId != null);
  }, [dashboard]);

  useEffect(() => {
    checkDiscordServerStatus();
  }, []);

  const linkDiscord = () => {
    request('/api/auth/discord/link').then((response) => {
      if (response.redirected) {
        window.open(response.url);
      }
    });
  };

  return (
    <Container>
      <CheckInContainer>
        <h1>Check In</h1>
        <h2>Complete the steps below to get started!</h2>
        <StepsContainer>
          <Step>
            <StepLabel>
              <Marker>
                <label>1</label>
              </Marker>
              <label>Connect your Discord</label>
            </StepLabel>
            <DiscordButton onClick={() => linkDiscord()}>
              <FontAwesomeIcon icon={faDiscord} />
              Sign in with Discord
            </DiscordButton>
          </Step>
          <Step
            style={{
              opacity: discordConnected ? 1 : 0.5,
              pointerEvents: discordConnected ? 'all' : 'none',
            }}
          >
            <StepLabel>
              <Marker>
                <label>2</label>
              </Marker>
              <label>Join out Discord Server</label>
            </StepLabel>
            <DiscordButton href='https://discord.gg/TGvYPnD'>
              <FontAwesomeIcon icon={faDiscord} />
              Join our Server
            </DiscordButton>
          </Step>
          <Step
            style={{
              opacity: discordServer ? 1 : 0.5,
              pointerEvents: discordServer ? 'all' : 'none',
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
      </CheckInContainer>
    </Container>
  );
};

export default CheckIn;
