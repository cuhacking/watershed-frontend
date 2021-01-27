import React from 'react';
import styled, {keyframes} from 'styled-components';
import {useParams, Redirect} from 'react-router-dom';
import {SidebarLayout} from '../../layouts';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMapMarkerAlt, faLink} from '@fortawesome/free-solid-svg-icons';
import YouTube from 'react-youtube';
import {
  EventDetailRow,
  EventDetailText,
  eventTimeString,
  EventTypeMarker,
  EventIcon,
  eventTypeName,
  EventLoading,
} from '../../shared/events';
import {Resource as ResourceData, useEvents} from '../../hooks/useEvents';

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

const EventSection = styled.section`
  position: relative;
  width: var(--event-width);
  color: var(--black);
  display: flex;
  flex-direction: column;
  padding: 16px;
  animation: ${fade} 0.2s cubic-bezier(0.33, 1, 0.68, 1) 1;
`;

const EventTitle = styled.h1`
  position: sticky;
  top: 0;
  color: var(--indoor);
  margin-top: 16px;
  margin-bottom: 16px;
  width: 100%;
  background: var(--indoor-white);
  font-weight: normal;
  font-size: 2em;
  z-index: 2;
`;

const EventDescription = styled.p`
  text-align: justify;
`;

const EventTime = styled.div`
  font-size: 1.05em;
  flex-shrink: 0;
  margin-bottom: 8px;
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background: #eeeeee;
  margin: 8px 0;
`;

const ResourcesTitle = styled.h2`
  margin: 0px;
  font-weight: normal;
  margin: 8px 0;
`;

const ResourceIcon = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ResourceName = styled.div``;
const ResourceLink = styled.div`
  text-decoration: underline;
  font-family: var(--primary-font-mono);
`;

const ResourceDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ResourceContainer = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  transition: background 0.1s;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  &:active {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const Resource = (resource: ResourceData) => {
  return (
    <a href={resource.link} target='_blank' rel='noopener noreferrer'>
      <ResourceContainer>
        <ResourceIcon>
          <FontAwesomeIcon icon={faLink} />
        </ResourceIcon>
        <ResourceDetails>
          <ResourceName>{resource.title}</ResourceName>
          <ResourceLink>{resource.link}</ResourceLink>
        </ResourceDetails>
      </ResourceContainer>
    </a>
  );
};

export default () => {
  const {id} = useParams<{id: string}>();
  const {events} = useEvents();

  const event = events?.find((event) => event.id.toString() === id);

  if (event != null) {
    const isStream =
      event.location?.toLocaleLowerCase()?.includes('youtu') === true;

    const videoId = event.location?.split('/')?.pop();

    return (
      <SidebarLayout>
        <Spacer />
        <EventSection>
          {isStream && (
            <YouTube
              videoId={videoId ?? ''}
              opts={{
                width: '100%',
                playerVars: {
                  autoplay: 1,
                },
              }}
              containerClassName='youtubeContainer'
            />
          )}
          <EventTitle>{event.title}</EventTitle>
          <EventTime>
            {eventTimeString(
              'America/Toronto',
              event.startTime,
              event.endTime
            ) + (event.host ? ', Hosted by: ' + event.host : '')}
          </EventTime>
          <EventDetailRow>
            <EventTypeMarker type={event.type} />
            <EventDetailText>{eventTypeName(event.type)}</EventDetailText>
          </EventDetailRow>
          {event.location && (
            <EventDetailRow>
              <EventIcon icon={faMapMarkerAlt} />
              <EventDetailText>{event.locationName}</EventDetailText>
            </EventDetailRow>
          )}
          <EventDescription>{event.description}</EventDescription>
          {event.resources.length > 0 && (
            <>
              <Separator />
              <ResourcesTitle>Resources</ResourcesTitle>
              {event.resources.map((resource) => (
                <Resource key={resource.id} {...resource} />
              ))}
            </>
          )}
        </EventSection>
        <Spacer />
      </SidebarLayout>
    );
  } else if (events != null) {
    return <Redirect to='/dashboard/schedule' />;
  } else {
    return (
      <SidebarLayout>
        <EventLoading />
      </SidebarLayout>
    );
  }
};
