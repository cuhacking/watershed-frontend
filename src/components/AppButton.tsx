import React from "react";
import styled, { css } from "styled-components";
import { colors, shadows } from "../shared/constants";
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

  &:hover {
    box-shadow: ${shadows.hover};
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    border-radius: 2rem;
  }
`;

const PrimaryButton = styled.button<ButtonProps>`
  ${buttonStyles}
  background-color: ${themeElement(colors.snow, colors.ikeaBlue)};
  color: ${themeElement(colors.spaceGrey, colors.white)};

  &:hover {
    background-color: ${themeElement(colors.spaceDark, colors.white)};
    color: ${themeElement(colors.snow, colors.spaceGrey)};
  }
`;

const SecondaryButton = styled.button<ButtonProps>`
  ${buttonStyles}
  background-color: ${themeElement(colors.ikeaBlue, colors.spaceGrey)};
  color: ${colors.white};

  &:hover {
    background-color: ${themeElement(colors.spaceDark, colors.white)};
    color: ${themeElement(colors.snow, colors.spaceGrey)};
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
  ...other
}: ButtonProps) => (
  <div
    style={{
      padding: `${padded ? "1.5rem" : 0}`,
      width: expanded ? "100%" : "unset",
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
