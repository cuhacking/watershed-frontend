import React from 'react';
import styled, {keyframes} from 'styled-components';

const ripple = keyframes`
0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
`;

const Symbol = styled.div<{color: string}>`
  display: inline-block;
  position: relative;
  width: 72px;
  height: 72px;

  & div {
    position: absolute;
    border: 4px solid ${({color}) => color};
    opacity: 1;
    border-radius: 50%;
    animation: ${ripple} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  & div:nth-child(2) {
    animation-delay: -0.5s;
  }
`;

export default (props: {color?: string}) => (
  <Symbol color={props.color ?? "#FFFFFF"}>
    <div />
    <div />
  </Symbol>
);
