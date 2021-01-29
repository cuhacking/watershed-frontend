import React from 'react';
import styled, {keyframes} from 'styled-components';
import {SidebarLayout} from '../../layouts';
import {
  EventLoading,
} from '../../shared/events';
import {useAuth, useLeaderboard} from '../../hooks/';
import {Helmet} from 'react-helmet';
import {LeaderboardPosition} from '../../hooks/useLeaderboard';

const Spacer = styled.div`
  height: 10vh;
`;

const fade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const LeaderboardContainer = styled.div`
  animation: ${fade} 0.2s cubic-bezier(0.33, 1, 0.68, 1) 1;
  display: flex;
  flex-direction: column;
  width: 600px;
`;

const LeaderboardRowContainer = styled.div<{isUser: boolean}>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 16px;
  background: ${({isUser}) =>
    isUser ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0)'};
  position: relative;

  &:nth-child(11) {
    margin-top: 64px;

    &:after {
      content: '...';
      color: var(--wine);
      position: absolute;
      width: 100px;
      text-align: center;
      pointer-events: none;
      height: 0px;
      left: calc(50% - 50px);
      font-size: 1.5em;
      top: -16px;
    }
  }
`;

const LeaderName = styled.h2`
  margin: 0;
`;

const LeaderUsername = styled.div`
  color: var(--wine);
  font-size: 0.9em;
`;

const LeaderNameContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

const medalColor = (place: number) => {
  if (place === 1) {
    return '#C9B037';
  } else if (place === 2) {
    return '#909090';
  } else if (place === 3) {
    return '#AD8A56';
  } else {
    return 'rgba(0, 0, 0, 0)';
  }
};

const LeaderPlace = styled.div<{place: number}>`
  width: 36px;
  height: 36px;
  border-radius: 100%;
  font-size: 1.1em;
  display: flex;
  text-align: center;
  align-content: center;
  justify-content: center;
  align-items: center;
  background: ${({place}) => medalColor(place)};
  margin-right: 24px;
  align-self: center;
  color: ${({place}) => (place > 3 ? 'var(--black)' : 'var(--white)')};
`;

const LeaderPoints = styled.div`
  align-items: center;
  display: flex;
`;

const Title = styled.h1`
  width: 100%;
  text-align: center;
`;

const Subtitle = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.2em;
  margin-bottom: 24px;
`;

const LeaderboardRow = ({
  place,
  isUser,
}: {
  place: LeaderboardPosition;
  isUser: boolean;
}) => {
  return (
    <LeaderboardRowContainer isUser={isUser}>
      <LeaderPlace place={place.index + 1}>{place.index + 1}</LeaderPlace>
      <LeaderNameContainer>
        <LeaderName>{place.name}</LeaderName>
        <LeaderUsername>@{place.discordUsername}</LeaderUsername>
      </LeaderNameContainer>
      <LeaderPoints>{place.points} points</LeaderPoints>
    </LeaderboardRowContainer>
  );
};

export default () => {
  const {user} = useAuth();
  const {leaderboard} = useLeaderboard();

  if (leaderboard != null) {
    return (
      <SidebarLayout>
        <Helmet
          titleTemplate={`%s — cuHacking 2021 Dashboard`}
          title='Leaderboard'
        />
        <Spacer />
        <Title>Leaderboard</Title>
        <Subtitle>See how you stack against the competition</Subtitle>
        <LeaderboardContainer>
          {leaderboard.map((place) => (
            <LeaderboardRow
              isUser={user?.uuid === place.uuid}
              key={place.uuid}
              place={place}
            />
          ))}
        </LeaderboardContainer>
      </SidebarLayout>
    );
  } else {
    return (
      <SidebarLayout>
        <Helmet
          titleTemplate={`%s — cuHacking 2021 Dashboard`}
          title='Leaderboard'
        />
        <EventLoading />
      </SidebarLayout>
    );
  }
};
