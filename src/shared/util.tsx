import styled, { css } from "styled-components";

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
