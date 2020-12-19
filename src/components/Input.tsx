import React from "react";
import styled from "styled-components";
import { colors } from "../shared/constants";
import { themeElement } from "../shared/theme";

const InputContainer = styled.div`
  /* max-width: 320px; */
  width: 100%;
  box-sizing: border-box;

  & label {
    color: ${themeElement(colors.snow, colors.ikeaBlue)};
    position: absolute;
    transition: opacity 300ms ease;
    margin: -14px 0 0 0;
    font-size: 12px;
  }

  & p:last-child {
    color: ${themeElement(colors.wineDark, colors.wine)};
    position: absolute;
    transition: opacity 300ms ease;
    margin: 4px 0 0 0;
    font-weight: 500;
    font-size: 12px;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  position: relative;
  background-color: transparent;
  color: ${themeElement(colors.white, colors.spaceDark)};
  border: none;
  border-bottom: solid 1px ${themeElement(colors.ikeaBlue, colors.spaceDark)};
  font-size: 1rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-bottom: solid 1px ${themeElement(colors.snow, colors.ikeaBlue)};
  }
`;

type InputProps = {
  placeHolder?: string;
  value?: string;
  name?: string;
  onChange: (e?: React.MouseEvent) => void;
  displayLabel?: boolean;
  expand?: boolean;
  error?: string;
  padded?: boolean;
  list?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputComponent = ({
  placeHolder,
  onChange,
  value,
  name,
  displayLabel,
  expand,
  error,
  padded,
  list,
  style,
}: InputProps) => (
  <InputContainer
    style={{
      width: `${expand ? "100%" : "auto"}`,
      padding: `${padded ? "1.5rem" : 0}`,
      ...style,
    }}
  >
    {displayLabel && (
      <label htmlFor={name} style={{ opacity: `${value ? 1 : 0}` }}>
        {placeHolder}
      </label>
    )}
    <StyledInput
      id={name}
      list={list}
      onChange={onChange}
      value={value}
      placeholder={placeHolder}
      name={name}
    ></StyledInput>
    {error && <p>{error}</p>}
  </InputContainer>
);

export default InputComponent;
