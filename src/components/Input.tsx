import React from 'react';
import {Required} from '../shared/util';
import styled from 'styled-components';
import {themeElement} from '../shared/theme';

const InputContainer = styled.div`
  /* max-width: 320px; */
  min-width: 124px;
  width: 100%;
  position: relative;

  & label {
    color: var(${themeElement('--snow', '--ikeaBlue')});
    position: absolute;
    transition: opacity 300ms ease;
    margin: -14px 0 0 0;
    font-size: 12px;
  }

  & p:last-child {
    color: var(${themeElement('--wineDark', '--wine')});
    position: absolute;
    transition: opacity 300ms ease;
    margin: 4px 0 0 0;
    font-weight: 500;
    font-size: 12px;
  }

  @media (max-width: 768px) {
    width: 100% !important;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  position: relative;
  background-color: transparent;
  color: var(${themeElement('--white', '--spaceDark')});
  border: none;
  border-bottom: solid 1px var(${themeElement('--ikeaBlue', '--spaceGrey')});
  font-size: 1rem;

  &:focus {
    outline: none;
    border-bottom: solid 1px var(${themeElement('--snow', '--ikeaBlue')});
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
  required?: boolean;
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
  required,
  ...rest
}: InputProps) => (
  <InputContainer
    style={{
      width: `${expand ? '100%' : 'unset'}`,
      padding: `${padded ? '1rem' : 0}`,
      ...style,
    }}
  >
    {required && <Required style={{opacity: value ? 0 : 1}}></Required>}
    {displayLabel && (
      <label htmlFor={name} style={{opacity: `${value ? 1 : 0}`}}>
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
      {...rest}
    ></StyledInput>
    {error && <p>{error}</p>}
  </InputContainer>
);

export default InputComponent;
