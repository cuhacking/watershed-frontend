import React from "react";
import styled, { css } from "styled-components";
import { themeElement } from "../shared/theme";

const buttonStyles = css`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-family: "DM Sans", sans-serif;
  font-weight: bold;
  border: none;
  transition: box-shadow 300ms ease, background-color 300ms ease,
    color 300ms ease;
  cursor: pointer;
  justify-content: center;

  &:hover:not(:disabled) {
    box-shadow: var(--hover);
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    border-radius: 2rem;
  }
`;

const PrimaryButton = styled.button<ButtonProps>`
  ${buttonStyles}
  background-color: var(${themeElement('--snow', '--ikeaBlue')});
  color: var(${themeElement('--spaceGrey', '--coolWhite')});

  &:hover:not(:disabled) {
    background-color: var(${themeElement('--spaceDark', '--coolWhite')});
    color: var(${themeElement('--snow', '--spaceGrey')});
  }

  &:disabled {
    color: var(${themeElement('--spaceGrey', '--coolWhite')});
    background-color: var(--parksCanada);
  }
`;

const SecondaryButton = styled.button<ButtonProps>`
  ${buttonStyles}
  background-color: var(${themeElement('--ikeaBlue', '--spaceGrey')});
  color: var(--coolWhite);

  &:hover:not(:disabled) {
    background-color: var(${themeElement('--spaceDark', '--coolWhite')});
    color: var(${themeElement('--snow', '--spaceGrey')});
  }

  &:disabled {
    color: var(--coolWhite);
    background-color: var(--parksCanada);
  }
`;

export type ButtonProps = {
  disabled?: boolean;
  secondary?: boolean;
  children?: React.ReactFragment | HTMLCollection | string;
  onClick?: (e?: React.MouseEvent) => void;
  padded?: boolean;
  expanded?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonComponent = ({
  disabled,
  children,
  onClick,
  secondary,
  padded,
  expanded,
  style,
  ...other
}: ButtonProps) => (
  <div
    style={{
      padding: `${padded ? "1rem" : 0}`,
      width: expanded ? "100%" : "unset",
      ...style
    }}
  >
    {secondary ? (
      <SecondaryButton
        style={{ width: expanded ? "100%" : "unset" }}
        disabled={disabled}
        onClick={onClick}
        {...other}
      >
        {children}
      </SecondaryButton>
    ) : (
      <PrimaryButton
        style={{ width: expanded ? "100%" : "unset" }}
        disabled={disabled}
        onClick={onClick}
        {...other}
      >
        {children}
      </PrimaryButton>
    )}
  </div>
);

export default ButtonComponent;
