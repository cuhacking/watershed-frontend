import React, {useState} from 'react';
import styled, {keyframes} from 'styled-components';
import {SidebarLayout} from '../../layouts';
import {Helmet} from 'react-helmet';
import ravensBackground from '../../assets/img/ravens-background.png';
import {hi} from 'date-fns/locale';

const fade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Spacer = styled.div`
  height: 5vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 32px;
  position: relative;
`;

const Hidden = styled.div<{revealed: boolean}>`
  width: calc(80% - 64px);
  height: 500px;
  display: flex;
  align-content: center;
  justify-content: center;
  align-self: center;
  position: absolute;
  bottom: 64px;
  align-items: center;
  padding-bottom: 250px;
  opacity: ${({revealed}) => (revealed ? 1 : 0)};
  transition: opacity 10s;
  color: var(--white);
  font-size: 2em;
`;

const RavensQuest = () => {
  const [isRevealed, setRevealed] = useState(false);

  return (
    <SidebarLayout>
      <Helmet
        titleTemplate={`%s — cuHacking 2021 Dashboard`}
        title="Raven's Quest"
      />
      <Spacer />
      <Container>
        <img
          style={{
            height: '100%',
            width: '100%',
            boxShadow: 'var(--shadow)',
          }}
          src={ravensBackground}
        />
        <Hidden
          onClick={() => {
            setRevealed(true);
          }}
          revealed={isRevealed}
        >
          {isRevealed ? 'BROKENCODE' : ''}
        </Hidden>
      </Container>
      <Spacer />
    </SidebarLayout>
  );
};

export default RavensQuest;
