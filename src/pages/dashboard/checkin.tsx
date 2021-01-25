import {faDiscord} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Button} from '../../components';
import React, {useState} from 'react';
import styled from 'styled-components';
import {buttonStyle} from './login';

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
  height: 2.5rem;
  width: 2.5rem;
  display: flex;
  padding: 0.25rem;
  background-color: var(--white);
  color: var(--wineDark);
  border-radius: 100%;

  & label {
    font-family: var(--primary-font);
    font-size: 1.5rem;
    margin: auto;
  }
`;

const DiscordButton = styled.a`
  ${buttonStyle}
  background-color: #738adb;
`;

const CheckIn = () => {
  const [discordServer, setDiscordServer] = useState(false);

  return (
    <Container>
      <CheckInContainer>
        <h1>Check In</h1>
        <h2>Three simple steps to access the hackathon!</h2>
        <StepsContainer>
          <Step>
            <StepLabel>
              <Marker>
                <label>1</label>
              </Marker>
              <label>Connect your Discord</label>
            </StepLabel>
            <DiscordButton>
              <FontAwesomeIcon icon={faDiscord} />
              Sign in with Discord
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
                <label>2</label>
              </Marker>
              <label>Join out Discord Server</label>
            </StepLabel>
            <DiscordButton>
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
              // action={console.log()}
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
