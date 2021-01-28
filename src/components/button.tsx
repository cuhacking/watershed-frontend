import React from 'react';
import styled, {css} from 'styled-components';
import {Link} from 'react-router-dom';
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

const StyledLink = styled(Link)`
  ${genericButton}
`;

const StyledIcon = styled(FontAwesomeIcon)`
  margin-left: 10px;
  margin-top: -2px;
  margin-right: -5px;
`;

interface ButtonProps {
  kind: 'anchor' | 'button' | 'link';
  children?: React.ReactNode;
  className?: string;
  external?: boolean;
  disabled?: boolean;
  link?: string;
  color: string;
  action?: () => void;
}

const Button = (props: ButtonProps) => {
  if (props.kind === 'anchor') {
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

  if (props.kind === 'button') {
    const {action, ...rest} = props;
    return (
      <StyledButton onClick={action} {...rest}>
        {props.children}
      </StyledButton>
    );
  }

  return (
    <StyledLink to={props.link ?? '/'} {...props}>
      {props.children}
    </StyledLink>
  );
};

export default Button;
