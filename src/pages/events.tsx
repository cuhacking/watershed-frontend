import React, {useState} from 'react';
import styled, {keyframes} from 'styled-components';
import {MainLayout} from '../layouts';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import {format} from 'date-fns-tz';
import {
  eventTimeString,
  eventTypeName,
  EventTypeMarker,
  EventDetailRow,
  EventDetailText,
  EventIcon,
  EventLoading,
} from '../shared/events';
import {Event as EventData, useEvents} from '../hooks/useEvents';
import Switch from 'react-switch';
import {utcToZonedTime} from 'date-fns-tz/esm';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
`;

const Card = styled.div`
  background-color: var(--warmWhite);

  margin: 50px 0;
  padding: 25px 10px;

  border-radius: 8px;

  width: var(--mobile-width);

  @media only screen and (min-width: 700px) {
    max-width: var(--event-width);
  }
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
  display: flex;
  flex-direction: column;
  animation: ${fade} 0.2s cubic-bezier(0.33, 1, 0.68, 1) 1;
`;

const DateTitle = styled.h1`
  color: var(--indoor);
  padding: 16px;
  margin-bottom: 16px;
  font-weight: normal;
  font-size: 2em;
`;

const EventContainer = styled.div`
  box-sizing: border-box;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: var(--black);

  @media only screen and (min-width: 700px) {
    flex-direction: row;
  }
`;

const EventTitle = styled.h6`
  font-size: 1.2em;
  font-weight: normal;
  margin: 0;
  margin-bottom: 8px;
`;

const EventDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
`;

const EventTime = styled.div`
  width: 120px;
  font-size: 1.05em;
  flex-shrink: 0;
  margin-right: 16px;
`;

const TimeSwitch = styled(Switch)``;

const TimeContainer = styled.label`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;

const TimeText = styled.div`
  line-height: 24px;
  margin-right: 8px;
`;

const TimeAbbr = styled.abbr`
  text-decoration: none;
`;

const Event = ({event, tz}: {event: EventData; tz: string}) => {
  return (
    <EventContainer>
      <EventTime>
        {eventTimeString(tz, event.startTime, event.endTime)}
      </EventTime>
      <EventDetails>
        <EventTitle>{event.title}</EventTitle>
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
      </EventDetails>
    </EventContainer>
  );
};

export default () => {
  const [easternTime, setEasternTime] = useState<boolean>(false);
  const {events} = useEvents();

  if (events == null) {
    return (
      <MainLayout>
        <EventLoading />
      </MainLayout>
    );
  }

  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let timezone = easternTime ? 'America/Toronto' : localTimezone;

  const sorted = events!.sort(
    (a, b) => a.startTime.getTime() - b.startTime.getTime()
  );

  const grouped: {[key: string]: EventData[]} = {};

  // Group events by day
  sorted.forEach((event) => {
    const key = format(
      utcToZonedTime(event.startTime, timezone),
      'EEEE, MMM dd'
    );
    if (grouped[key]) {
      grouped[key].push(event);
    } else {
      grouped[key] = [event];
    }
  });

  return (
    <MainLayout>
      <Content>
        <h1>Our schedule</h1>
        {localTimezone !== 'America/Toronto' && (
          <TimeContainer>
            <TimeText>
              Show times in{' '}
              <TimeAbbr title='Eastern Standard Time'>EST</TimeAbbr>
            </TimeText>
            <TimeSwitch
              checkedIcon={false}
              uncheckedIcon={false}
              onChange={setEasternTime}
              checked={easternTime}
              onColor='#89072E'
              height={24}
              activeBoxShadow='0 0 2px 2px #89072E'
            />
          </TimeContainer>
        )}
        <Card>
          {Object.keys(grouped).map((key) => (
            <EventSection key={key}>
              <DateTitle>{key}</DateTitle>
              {grouped[key].map((event) => (
                <Event key={event.id} event={event} tz={timezone} />
              ))}
            </EventSection>
          ))}
        </Card>
      </Content>
    </MainLayout>
  );
};
