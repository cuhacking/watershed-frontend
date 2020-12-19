import React from 'react';
import styled, {css} from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons';

const genericButton = css`
  background: var(--wine);
  border: 0px;
  color: var(--white);
  font-size: 1rem;
  user-select: none;
  border-radius: 24px;
  padding: 8px 24px;
  flex-grow: 0;
  font-family: var(--primary-font);
  cursor: pointer;

  border: 2px solid var(--wine);
  transition: 0.1s ease-in;

  @media only screen and (min-width: 700px) {
    &:hover {
      background-color: var(--white);
      color: var(--wine) !important;
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
}

const Button = (props: ButtonProps) => {
  if (props.external) {
    return (
      <StyledAnchor
        target='_blank'
        rel='noopener noreferrer external'
        href={props.link}
        {...props}
      >
        {props.children}
        <StyledIcon icon={faExternalLinkAlt} size='1x' />
      </StyledAnchor>
    );
  }

  return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default Button;
