import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useDashboardInfo, useInterval} from '../hooks';
import {parseDuration} from '../shared/util';

const StyledCountdown = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;

  padding: 16px;

  width: 100%;

  background: var(--white);

  border: 1px solid var(--wine);
  box-sizing: border-box;
  box-shadow: 0px 0px 4px rgba(19, 1, 1, 0.25);
  border-radius: 8px;

  color: var(--wine);
`;

const Timer = styled.span`
  font-size: 36px;
  font-family: var(--primary-font-mono);
`;

enum Status {
  NotYetStarted,
  Started,
  Ended,
}

const calcTimeRemaining = (times: {
  start: string;
  end: string;
}): {time: string; status: Status} => {
  if (!times.start || !times.end)
    return {time: '99:99:99', status: Status.NotYetStarted};

  const now = new Date().toISOString();

  const startDiff = Math.max(Date.parse(times.start) - Date.parse(now), 0);
  if (startDiff > 0) {
    return {
      status: Status.NotYetStarted,
      time: parseDuration(startDiff),
    };
  }

  const endDiff = Math.max(Date.parse(times.end) - Date.parse(now), 0);
  if (endDiff > 0) {
    return {
      status: Status.Started,
      time: parseDuration(endDiff),
    };
  }
  return {
    status: Status.Ended,
    time: '00:00:00',
  };
};

const Countdown = () => {
  const {dashboard} = useDashboardInfo();
  const [dateString, setDateString] = useState(String.fromCodePoint(160));
  const [status, setStatus] = useState(Status.NotYetStarted);

  useEffect(() => {
    const timeData = calcTimeRemaining({
      start: dashboard!.startTime,
      end: dashboard!.endTime,
    });

    setDateString(timeData.time);
    setStatus(timeData.status);
  }, []);

  useInterval(() => {
    const timeData = calcTimeRemaining({
      start: dashboard!.startTime,
      end: dashboard!.endTime,
    });

    setDateString(timeData.time);
    setStatus(timeData.status);
  }, 1000);

  if (status !== Status.Ended) {
    return (
      <StyledCountdown>
        <span>
          {status === Status.NotYetStarted
            ? 'Hackathon starts '
            : 'Hacking ends '}
          in
        </span>
        <Timer>{dateString}</Timer>
      </StyledCountdown>
    );
  }

  return (
    <StyledCountdown>
      <span>Hackathon ended</span>
      <Timer>{dateString}</Timer>
    </StyledCountdown>
  );
};

export default Countdown;
