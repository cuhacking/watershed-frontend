import styled, { css } from "styled-components";

export const colors = {
  white: "#F5F9FF",
  snow: "#C1DAFF",
  ikeaBlue: "#315A96",
  spaceGrey: "#21273F",
  spaceDark: "#040816",
  wine: "#89072E",
  vanilla: "#FECD7D",
  parksCanada: "#3A5154",
  wineDark: "#CA4353",
};

export const shadows = {
  primary: `0px 0px 12px rgba(0, 0, 0, 0.25);`,
  hover: `0px 0px 12px rgba(49, 90, 150, 0.25);`,
};

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
