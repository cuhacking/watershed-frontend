import React, {useCallback, useEffect, useState} from 'react';
import styled, {keyframes} from 'styled-components';
import {Link} from 'react-router-dom';
import {SidebarLayout} from '../../layouts';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faStar as SolidStar,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import {faStar as EmptyStar} from '@fortawesome/free-regular-svg-icons';
import {format} from 'date-fns-tz';
import {
  eventTimeString,
  eventTypeName,
  EventTypeMarker,
  EventDetailRow,
  EventDetailText,
  EventIcon,
  EventLoading,
} from '../../shared/events';
import {Event as EventData, useEvents} from '../../hooks/useEvents';
import Switch from 'react-switch';
import {utcToZonedTime} from 'date-fns-tz/esm';

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
  display: flex;
  flex-direction: column;
  animation: ${fade} 0.2s cubic-bezier(0.33, 1, 0.68, 1) 1;
`;

const DateTitle = styled.h1`
  position: sticky;
  top: 0;
  color: var(--indoor);
  padding: 16px;
  margin-bottom: 16px;
  width: 100%;
  background: var(--warmWhite);
  font-weight: normal;
  font-size: 2em;
  z-index: 2;
`;

const EventContainer = styled.div`
  box-sizing: border-box;
  padding: 16px;
  color: var(--black);
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  transition: background 0.1s;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  &:active {
    background: rgba(0, 0, 0, 0.2);
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

const NowTime = styled.div`
  color: var(--wine);
  width: 120px;
  font-size: 1.05em;
  flex-shrink: 0;
  font-weight: bold;
`;

const NowLine = styled.div`
  height: 1px;
  background: var(--wine);
  flex-grow: 1;
  z-index: 1;

  &:before {
    display: block;
    position: relative;
    top: -3px;
    width: 6px;
    height: 6px;
    border-radius: 100%;
    content: '';
    background: var(--wine);
  }
`;

const NowConatiner = styled.div`
  box-sizing: border-box;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EventFavouriteButton = styled(FontAwesomeIcon)`
  margin: 0 32px;
`;

const TimeSwitch = styled(Switch)``;

const TimeContainer = styled.label`
  display: flex;
  flex-direction: row;
  position: sticky;
  cursor: pointer;
  top: 24px;
  z-index: 3;
  margin-bottom: -48px;
  right: calc(50% - 560px);
  align-self: flex-end;
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
    <Link to={`/schedule/${event.id}`}>
      <EventContainer>
        <EventTime>
          {eventTimeString(tz, event.startTime, event.endTime)}
        </EventTime>
        {/* <EventFavouriteButton icon={EmptyStar} /> */}
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
    </Link>
  );
};

const Now = React.forwardRef<HTMLDivElement, {tz: string}>((props, ref) => {
  return (
    <NowConatiner ref={ref}>
      <NowTime>
        NOW ({format(utcToZonedTime(new Date(), props.tz), 'HH:mm')})
      </NowTime>
      <NowLine />
    </NowConatiner>
  );
});

export default () => {
  const [easternTime, setEasternTime] = useState<boolean>(false);
  const [now, setNow] = useState<Date>(new Date());
  const nowRef = useCallback((element: HTMLDivElement | null) => {
    element?.scrollIntoView();
  }, []);

  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let timezone = easternTime ? 'America/Toronto' : localTimezone;

  // Re-render once per minute
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const {events} = useEvents();
  if (events != null) {
    const sorted = events!.sort(
      (a, b) => a.startTime.getTime() - b.startTime.getTime()
    );
    const grouped: {[key: string]: EventData[]} = {};
    let nowId: number | null = null;

    // Group events by day, and find the place to put the "NOW" indicator
    sorted.forEach((event) => {
      if (event.startTime > now && nowId === null) {
        nowId = event.id;
      }
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

    // Don't show now indicator until 2021-01-29 EST or after 2021-02-01
    if (
      new Date() < new Date('2021-01-29T00:00:00.000-05:00') ||
      new Date() > new Date('2021-02-01T00:00:00.000-05:00')
    ) {
      nowId = null;
    }

    return (
      <SidebarLayout>
        <Spacer />
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
        {Object.keys(grouped).map((key) => (
          <EventSection key={key}>
            <DateTitle>{key}</DateTitle>
            {grouped[key].map((event) => (
              <React.Fragment key={event.id}>
                {event.id === nowId && <Now tz={timezone} ref={nowRef} />}
                <Event event={event} tz={timezone} />
              </React.Fragment>
            ))}
          </EventSection>
        ))}
      </SidebarLayout>
    );
  } else {
    return (
      <SidebarLayout>
        <EventLoading />
      </SidebarLayout>
    );
  }
};
