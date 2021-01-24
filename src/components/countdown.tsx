import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

const StyledCountdown = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;

  padding: 16px;

  width: 250px;
  height: 101px;
  left: 25px;
  top: 0px;

  background: var(--coolWhite);

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

const formattedDate = (currentDate: string) => {
  if (!currentDate) return '';
  const now = new Date().toISOString();
  const r = new Date(Math.max(Date.parse(currentDate) - Date.parse(now), 0))
    .toISOString()
    .match(/\d\d:\d\d:\d\d/)
    ?.toString();
  return r?.length === 1 ? r : '00:00:00';
};

const Countdown = () => {
  const [startDate, setStartDate] = useState('');
  const [dateString, setDateString] = useState('');

  // need to fetch date from server, plan to replace this default value with it
  useEffect(() => {
    setStartDate(new Date(Date.now() + 10000).toISOString());
    setDateString(formattedDate(new Date(Date.now() + 10000).toISOString()));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const s = formattedDate(startDate);
      setDateString(s);
    }, 1000);
  }, [dateString]);
  return (
    <StyledCountdown>
      <span>Hackathon starts in</span>
      <Timer>{dateString}</Timer>
    </StyledCountdown>
  );
};

export default Countdown;
