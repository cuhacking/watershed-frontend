import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {EventType} from '../hooks/useEvents';
import {format, utcToZonedTime} from 'date-fns-tz';
import {LoadingSymbol} from '../components';

export const eventColor = (type: EventType) => {
  if (type === 'sponsor') {
    return '#FDCB58';
  } else if (type === 'key-times') {
    return '#AA8ED6';
  } else if (type === 'workshops') {
    return '#78B159';
  } else if (type === 'social-events') {
    return '#55ACEE';
  } else {
    return '#DC2E44';
  }
};

export const eventTypeName = (type: EventType) => {
  if (type === 'sponsor') {
    return 'Sponsor Event';
  } else if (type === 'key-times') {
    return 'Key Event';
  } else if (type === 'workshops') {
    return 'Workshop';
  } else if (type === 'social-events') {
    return 'Social Activity';
  } else {
    return 'Activity';
  }
};

export const eventTimeString = (tz: string, start: Date, end?: Date) => {
  if (end == null) {
    return format(utcToZonedTime(start, tz), 'HH:mm');
  } else {
    // en dash
    return `${format(utcToZonedTime(start, tz), 'HH:mm')}–${format(
      utcToZonedTime(end, tz),
      'HH:mm'
    )}`;
  }
};

export const EventTypeMarker = styled.div<{type: EventType}>`
  width: 16px;
  height: 16px;
  border-radius: 100%;
  background: ${({type}) => eventColor(type)};
  margin-right: 8px;
`;

export const EventDetailRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: 4px 0;
`;

export const EventDetailText = styled.div`
  line-height: 16px;
`;

export const EventIcon = styled(FontAwesomeIcon)`
  margin-right: 8px;
  width: 16px !important;
`;

const EventLoadingContainer = styled.div`
  display: flex;
  align-self: center;
  justify-self: center;
  margin-top: 25vh;
`;

export const EventLoading = () => {
  return <EventLoadingContainer>
    <LoadingSymbol color='var(--wine)' />
  </EventLoadingContainer>;
};
