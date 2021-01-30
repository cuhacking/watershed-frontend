import React, {useEffect, useState} from 'react';
import styled, {keyframes} from 'styled-components';
import {SidebarLayout} from '../../layouts';
import {Helmet} from 'react-helmet';
import ravensBackground from '../../assets/img/ravens-background.png';
import {hi} from 'date-fns/locale';
import arm from '../../assets/img/robot/arm.png';
import baseButtons from '../../assets/img/robot/base-buttons.png';
import base from '../../assets/img/robot/base.png';
import controlPanel from '../../assets/img/robot/control-panel.png';
import eye from '../../assets/img/robot/eye.png';
import face from '../../assets/img/robot/face.png';
import hat from '../../assets/img/robot/hat.png';
import head from '../../assets/img/robot/head.png';
import leftTrack from '../../assets/img/robot/left-track.png';
import rightTrack from '../../assets/img/robot/right-track.png';
import sides from '../../assets/img/robot/sides.png';
import torso from '../../assets/img/robot/torso.png';
import {useAuth} from '../../hooks/useAuth';
import {stat} from 'fs';

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
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 32px;
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

const RobotPart = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const RobotContainer = styled.div`
  position: absolute;
  z-index: 4;
  height: 500px;
  width: 400px;
  bottom: 32px;
  left: 120px;
`;

const emptyRobot = {
  arm: false,
  head: false,
  baseButtons: false,
  base: false,
  controlPanel: false,
  eye: false,
  face: false,
  hat: false,
  leftTrack: false,
  rightTrack: false,
  sides: false,
  torso: false,
};

interface RavensProgress {
  track0: any;
  track1: any;
  track2: any;
}

const RavensQuest = () => {
  const [isRevealed, setRevealed] = useState(false);
  const [robotParts, setRobotParts] = useState(emptyRobot);
  const {request} = useAuth();

  const updateProgress = (progress: RavensProgress) => {
    const newStatus = {...robotParts};

    switch (progress.track0) {
      case 0:
        newStatus.head = true;
      case 1:
        newStatus.face = true;
      case 2:
        newStatus.eye = true;
      case 'Completed':
        newStatus.hat = true;
    }

    switch (progress.track1) {
      case 0:
        newStatus.torso = true;
      case 1:
        newStatus.sides = true;
      case 2:
        newStatus.controlPanel = true;
      case 'Completed':
        newStatus.arm = true;
    }

    switch (progress.track2) {
      case 0:
        newStatus.base = true;
      case 1:
        newStatus.baseButtons = true;
      case 2:
        newStatus.leftTrack = true;
      case 'Completed':
        newStatus.rightTrack = true;
    }

    setRobotParts(newStatus);
  };

  useEffect(() => {
    request('/api/ravensQuest/progress').then((res: any) => {
      if (res) {
        updateProgress(res as RavensProgress);
      }
    });
  }, []);

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
        <RobotContainer>
          {robotParts.arm && <RobotPart src={arm} />}
          {robotParts.head && <RobotPart src={head} />}
          {robotParts.baseButtons && <RobotPart src={baseButtons} />}
          {robotParts.base && <RobotPart src={base} />}
          {robotParts.controlPanel && <RobotPart src={controlPanel} />}
          {robotParts.eye && <RobotPart src={eye} />}
          {robotParts.face && <RobotPart src={face} />}
          {robotParts.hat && <RobotPart src={hat} />}
          {robotParts.leftTrack && <RobotPart src={leftTrack} />}
          {robotParts.rightTrack && <RobotPart src={rightTrack} />}
          {robotParts.sides && <RobotPart src={sides} />}
          {robotParts.torso && <RobotPart src={torso} />}
        </RobotContainer>
      </Container>
      <Spacer />
    </SidebarLayout>
  );
};

export default RavensQuest;
