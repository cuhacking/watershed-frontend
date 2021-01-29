import React from 'react';
import styled, {css} from 'styled-components';
import {Link, Redirect} from 'react-router-dom';
import {
  Countdown,
  LoadingSymbol,
  TeamManager,
  PointsManager,
} from '../../components';
import {SidebarLayout} from '../../layouts';
import {useDashboardInfo} from '../../hooks';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {Helmet} from 'react-helmet';
import {UpcomingEvent} from '../../hooks/useDashboardInfo';
import {eventTimeString, EventTypeMarker} from '../../shared/events';

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;

  margin-top: 100px;
  text-align: center;

  animation: var(--page-animation);

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
`;

const card = css`
  padding: 20px;
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: var(--card-shadow);

  transition: 100ms ease-out;
`;

const AnnouncementCardContainer = styled.div`
  ${card}
`;

const EventCardContainer = styled(Link)`
  ${card}

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

  a {
    color: var(--wineLight);
  }

  a:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

interface AnnouncementCardProps {
  title: string;
  description: string;
  url?: string;
}

const AnnouncementCard = ({title, description, url}: AnnouncementCardProps) => {
  return (
    <AnnouncementCardContainer>
      <EventCardHeader>
        <h4>{title}</h4>
      </EventCardHeader>
      <EventCardDescription>{description}</EventCardDescription>
      {url && (
        <EventCardDescription>
          <a href={url} target='_blank' rel='noopener noreferrer'>
            {url}
          </a>
        </EventCardDescription>
      )}
    </AnnouncementCardContainer>
  );
};

interface UpcomingEventProps {
  event: UpcomingEvent;
}

const EventCard = ({event}: UpcomingEventProps) => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const truncate = (str: string) =>
    str.length > 200 ? `${str.slice(0, 197)}...` : str;

  return (
    <EventCardContainer to={`/dashboard/schedule/${event.id}`}>
      <EventCardHeader>
        <EventTypeMarker type={event.type} />
        <h4>{event.title}</h4>
      </EventCardHeader>
      <EventCardTime>
        {eventTimeString(timezone, event.startTime, event.endTime)}
      </EventCardTime>
      <EventCardDescription>{truncate(event.description)}</EventCardDescription>
    </EventCardContainer>
  );
};

export default () => {
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

  if (dashboard == null) {
    return (
      <SidebarLayout>
        <Content>
          <h1>Something went wrong. Please refresh the page.</h1>
        </Content>
      </SidebarLayout>
    );
  }

  const user = dashboard.user;
  const events = dashboard.upcomingEvents;
  const announcements = dashboard.announcements;

  if (!user.checkedIn) {
    return <Redirect to='/dashboard/checkin' />;
  }

  return (
    <SidebarLayout>
      <Helmet title='cuHacking 2021: Snowed In' />
      <Content>
        <MainSection>
          <Greeting>Hey, {user.firstName}!</Greeting>
          <Subtitle>
            You currently have <span>{user.points}</span>{' '}
            {user.points === 1 ? 'point' : 'points'}.
          </Subtitle>
          <Subsection>
            <h2>Recent Announcements</h2>
            <CardSection>
              {announcements.length === 0 ? (
                <p>(No announcements)</p>
              ) : (
                announcements.map((announcement, index) => (
                  <AnnouncementCard
                    key={index}
                    title={announcement.title}
                    description={announcement.description}
                    url={announcement.url}
                  />
                ))
              )}
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
          <TeamManager />
          <PointsManager />
        </SideSection>
      </Content>
    </SidebarLayout>
  );
};
