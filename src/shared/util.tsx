import styled, {css} from 'styled-components';
import {themeElement} from './theme';

const alignStyles = css`
  display: flex;
  align-items: center;
`;

export const Desktop = styled.span`
  ${alignStyles};
  @media (max-width: 768px) {
    display: none;
  }
  @media (min-width: 769px) {
    display: flex;
  }
`;

export const Mobile = styled.span`
  ${alignStyles};
  @media (max-width: 768px) {
    display: flex;
  }
  @media (min-width: 769px) {
    display: none;
  }
`;

export const Required = styled.div`
  position: absolute;
  height: 4px !important;
  width: 4px !important;
  right: 0.5rem;
  top: 0.5rem;
  border-radius: 100%;
  background-color: var(${themeElement('--wineLight', '--wine')});
  transition: opacity 300ms ease;
`;

export const parseDuration = (millis: number) => {
  const hours = Math.floor(millis / 60 / 60 / 1000);
  const minutes = Math.floor((millis - hours * 60 * 60 * 1000) / 60 / 1000);
  const seconds = Math.floor(millis / 1000) % 60;

  const hourString = `${hours}`.padStart(2, '0');
  const minuteString = `${minutes}`.padStart(2, '0');
  const secondsString = `${seconds}`.padStart(2, '0');

  return `${hourString}:${minuteString}:${secondsString}`;
};
