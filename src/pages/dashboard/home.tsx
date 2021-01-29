import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {Button, Countdown, LoadingSymbol} from '../../components';
import {SidebarLayout} from '../../layouts';
import {useApplication, useAuth, useDashboardInfo} from '../../hooks';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {Helmet} from 'react-helmet';
import {UpcomingEvent} from '../../hooks/useDashboardInfo';
import {
  eventTimeString,
  eventTypeName,
  EventTypeMarker,
  EventDetailRow,
  EventDetailText,
  EventIcon,
  EventLoading,
} from '../../shared/events';

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;

  margin-top: 100px;
  text-align: center;

  @media only screen and (min-width: 700px) {
    max-width: var(--max-width);
  }
`;

const MainSection = styled.div`
  flex: 800;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Greeting = styled.h1`
  font-size: 4rem;
`;

const Subtitle = styled.p`
  font-family: var(--secondary-font);
  font-size: 1.75rem;

  margin: 0;

  span {
    color: var(--wineLight);
  }
`;

const Subsection = styled.div`
  margin-top: 50px;
  width: 100%;
  text-align: left;
`;

const SubsectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    margin: 0;
  }
`;

const HeaderLink = styled(Link)`
  color: var(--wineLight) !important;

  &:hover {
    text-decoration: underline;
  }
`;

const CardSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;

  & > p {
    text-align: center;
  }

  @media only screen and (min-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (min-width: 1250px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const SideSection = styled.div`
  flex: 275;
  display: flex;
  flex-direction: column;

  height: 100%;
  padding-left: 20px;

  & > * {
    margin-bottom: 20px;
  }
`;

const EventCardContainer = styled.div`
  padding: 20px;
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  height: 100%;

  transition: 100ms ease-out;

  &:hover {
    cursor: pointer;
    box-shadow: var(--shadow);
  }
`;

const EventCardHeader = styled.div`
  display: flex;
  align-items: center;

  & > div {
    flex-shrink: 0;
    margin-right: 10px;
  }

  h4 {
    margin: 0;
  }
`;

const EventCardTime = styled.p`
  font-weight: 600;
`;

const EventCardDescription = styled.p`
  margin-bottom: 0;
`;

interface UpcomingEventProps {
  event: UpcomingEvent;
}

const EventCard = ({event}: UpcomingEventProps) => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const truncate = (str: string) =>
    str.length > 200 ? `${str.slice(0, 197)}...` : str;

  return (
    <Link to={`/dashboard/schedule/${event.id}`}>
      <EventCardContainer>
        <EventCardHeader>
          <EventTypeMarker type={event.type} />
          <h4>{event.title}</h4>
        </EventCardHeader>
        <EventCardTime>
          {eventTimeString(timezone, event.startTime, event.endTime)}
        </EventCardTime>
        <EventCardDescription>
          {truncate(event.description)}
        </EventCardDescription>
      </EventCardContainer>
    </Link>
  );
};

export default () => {
  const {application} = useApplication();
  const {isLoading, dashboard} = useDashboardInfo();

  if (isLoading) {
    return (
      <SidebarLayout>
        <Content>
          <LoadingSymbol color='var(--wineLight)' />
        </Content>
      </SidebarLayout>
    );
  }

  const user = dashboard!.user;
  const events = dashboard!.upcomingEvents;

  return (
    <SidebarLayout>
      <Helmet title='cuHacking 2021: Snowed In' />
      <Content>
        <MainSection>
          <Greeting>Hey, {application!.firstName}!</Greeting>
          <Subtitle>
            You currently have <span>{user.points}</span>{' '}
            {user.points === 1 ? 'point' : 'points'}.
          </Subtitle>
          <Subsection>
            <h2>Recent Announcements</h2>
            <CardSection>
              <p>(No announcements)</p>
            </CardSection>
          </Subsection>
          <Subsection>
            <SubsectionHeader>
              <h2>Up Next</h2>
              <HeaderLink to='/dashboard/schedule'>
                Go to schedule <FontAwesomeIcon icon={faArrowRight} size='1x' />
              </HeaderLink>
            </SubsectionHeader>
            <CardSection>
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </CardSection>
          </Subsection>
        </MainSection>
        <SideSection>
          <Countdown />
        </SideSection>
      </Content>
    </SidebarLayout>
  );
};
