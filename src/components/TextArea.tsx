import React from "react";
import styled from "styled-components";
import { colors } from "../shared/constants";
import { themeElement } from "../shared/theme";

const InputContainer = styled.div`
  width: 100%;

  & label {
    color: ${themeElement(colors.snow, colors.ikeaBlue)};
    transition: opacity 300ms ease;
    margin: 0 0 4px 0;
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

const StyledTextArea = styled.textarea`
  height: 84px;
  width: 100%;
  position: relative;
  background-color: transparent;
  color: ${themeElement(colors.white, colors.spaceDark)};
  border: none;
  border-bottom: solid 1px ${themeElement(colors.ikeaBlue, colors.spaceDark)};
  font-size: 1rem;
  box-sizing: border-box;
  resize: unset;

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
  error?: string;
  padded?: boolean;
} & React.InputHTMLAttributes<HTMLTextAreaElement>;

const TextAreaComponent = ({
  placeHolder,
  onChange,
  value,
  name,
  displayLabel,
  error,
  padded,
  maxLength,
}: InputProps) => {
  const charactersLeft = () =>
    maxLength && value ? `(${maxLength - value?.length} chars left)` : "";

  return (
    <InputContainer
      style={{
        padding: `${padded ? "1.5rem" : 0}`,
      }}
    >
      {displayLabel && (
        <label htmlFor={name} style={{ opacity: `${value ? 1 : 0}` }}>
          {`${placeHolder} ${maxLength ? charactersLeft() : ""}`}
        </label>
      )}
      <StyledTextArea
        id={name}
        onChange={onChange}
        value={value}
        placeholder={placeHolder}
        name={name}
        maxLength={maxLength}
      ></StyledTextArea>
      {error && <p>{error}</p>}
    </InputContainer>
  );
};

export default TextAreaComponent;
