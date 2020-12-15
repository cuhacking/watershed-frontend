import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: none;
  background: none;
  padding: 0;

  width: 35px;
  height: 50px;

  &:active {
    opacity: 0.5;
  }

  @media only screen and (min-width: 700px) {
    display: none;
  }
`;
interface ButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default (props: ButtonProps) => {
  if (props.isOpen) {
    return (
      <StyledButton type='button' onClick={props.onClick}>
        <svg
          viewBox='0 0 24 24'
          fillRule='evenodd'
          clipRule='evenodd'
          strokeLinejoin='round'
          strokeMiterlimit='{2}'
        >
          <path fill='none' d='M0 0h24v24H0z' />
          <g fill='#fff'>
            <path d='M18.788 18.788a1.2 1.2 0 000-1.697L6.909 5.212a1.2 1.2 0 10-1.697 1.697l11.879 11.879a1.2 1.2 0 001.697 0z' />
            <path d='M18.788 5.212a1.2 1.2 0 00-1.697 0L5.212 17.091a1.2 1.2 0 101.697 1.697L18.788 6.909a1.2 1.2 0 000-1.697z' />
          </g>
        </svg>
      </StyledButton>
    );
  } else {
    return (
      <StyledButton type='button' onClick={props.onClick}>
        <svg
          viewBox='0 0 24 24'
          fillRule='evenodd'
          clipRule='evenodd'
          strokeLinejoin='round'
          strokeMiterlimit={2}
        >
          <path fill='none' d='M0 0h24v24H0z' />
          <g fill='#fff'>
            <path d='M21.559 12a1.2 1.2 0 00-1.2-1.2h-16.8a1.201 1.201 0 000 2.4h16.8a1.2 1.2 0 001.2-1.2zM21.641 4.999a1.2 1.2 0 00-1.2-1.2h-16.8a1.2 1.2 0 100 2.4h16.8c.662 0 1.2-.538 1.2-1.2zM21.641 19.001c0-.662-.538-1.2-1.2-1.2h-16.8a1.2 1.2 0 000 2.4h16.8a1.2 1.2 0 001.2-1.2z' />
          </g>
        </svg>
      </StyledButton>
    );
  }
};
