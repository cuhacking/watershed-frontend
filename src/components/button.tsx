import React from 'react';
import styled, {css} from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons';

const genericButton = css<{color: string}>`
  background: ${({color}) => color};
  border: 0px;
  color: var(--white);
  font-size: 1rem;
  user-select: none;
  border-radius: 24px;
  padding: 8px 24px;
  flex-grow: 0;
  font-family: var(--primary-font);
  cursor: pointer;

  border: 2px solid ${({color}) => color};
  transition: 0.1s ease-in;

  @media only screen and (min-width: 700px) {
    &:hover {
      background-color: var(--white);
      color: ${({color}) => color} !important;
      cursor: pointer;
    }
  }
`;

const StyledButton = styled.button`
  ${genericButton}
`;

const StyledAnchor = styled.a`
  ${genericButton}
`;

const StyledIcon = styled(FontAwesomeIcon)`
  margin-left: 10px;
  margin-top: -2px;
  margin-right: -5px;
`;

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  external?: boolean;
  disabled?: boolean;
  link?: string;
  color: string;
}

const Button = (props: ButtonProps) => {
  if (props.link) {
    return (
      <StyledAnchor
        target={props.external ? '_blank' : ''}
        rel='noopener noreferrer external'
        href={props.link}
        {...props}
      >
        {props.children}
        {props.external && <StyledIcon icon={faExternalLinkAlt} size='1x' />}
      </StyledAnchor>
    );
  }

  return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default Button;
