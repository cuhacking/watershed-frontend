import styled, { css } from "styled-components";
import { themeElement } from "./theme";

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
  background-color: var(${themeElement('--wineDark', '--wine')});
  transition: opacity 300ms ease;
`;
