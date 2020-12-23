import React, {useState, useRef, useEffect} from 'react';
import {Required} from '../shared/util';
import styled, {css} from 'styled-components';
import darkArrow from '../assets/img/arrow-down-dark.svg';
import lightArrow from '../assets/img/arrow-down-light.svg';
import {globalTheme, themeElement} from '../shared/theme';
import Input from './Input';

const itemStyles = css`
  padding: 0.5rem 0;
  background-color: var(${themeElement('--spaceGrey', '--white')});
  width: 100%;
`;

const containerStyles = css`
  border-radius: 0.5rem;
  transition: box-shadow 300ms ease;
`;

const DropdownContainer = styled.div`
  ${containerStyles};
  cursor: pointer;
  display: flex;
  position: relative;
  min-width: 200px;
  border: solid 1px var(${themeElement('--ikeaBlue', '--snow')});
  color: var(${themeElement('--white', '--spaceDark')});
  height: min-content;

  & p {
    color: var(${themeElement('--snow', '--ikeaBlue')});
    position: absolute;
    transition: opacity 300ms ease;
    margin: -1rem 0 0 0.5rem;
    font-size: 12px;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      box-shadow: var(--hover);
    }
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const LabelContainer = styled.div`
  ${containerStyles};
  ${itemStyles}
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0.5rem;
  user-select: none;

  & label {
    margin: 0;
    margin-right: 0.25rem;
  }
`;

const IconUp = styled.img`
  margin-left: 0.5rem;
  transform: rotate(180deg);
`;

const IconDown = styled.img`
  margin-left: 0.5rem;
  transform: rotate(0deg);
`;

const ItemsContainer = styled.div`
  ${containerStyles};
  ${itemStyles};
  position: absolute;
  top: 3rem;
  box-shadow: var(--hover);
  z-index: 4;

  & li {
    padding: 0.5rem 0.5rem;
    list-style-type: none;

    &:hover {
      background-color: var(${themeElement('--ikeaBlue', '--snow')});
    }
  }
`;

interface DropdownOption {
  value: string | boolean;
  label: string;
}

interface DropdownProps {
  label?: string;
  name: string;
  options: DropdownOption[];
  value: string | boolean;
  enableOther?: boolean;
  onClick: Function;
  padded?: boolean;
  small?: boolean;
  required?: boolean;
  grow?: boolean;
}

const Dropdown = ({
  name,
  options,
  onClick,
  value,
  label,
  enableOther,
  padded,
  small,
  required,
  grow,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [other, setOther] = useState('');
  const dropdownRef = useRef(null);

  function useOuterClick(ref: any) {
    useEffect(() => {
      const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }
  useOuterClick(dropdownRef);

  const labelValue = (value: string | boolean) => {
    if (typeof value === 'string') {
      return value;
    } else {
      return value ? 'Yes' : 'No';
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        padding: `${padded ? '1rem' : 0}`,
        flexGrow: grow ? 1 : 0,
      }}
    >
      {required && <Required style={{opacity: value ? 0 : 1}}></Required>}
      <DropdownContainer
        style={{minWidth: small ? `116px` : '200px'}}
        ref={dropdownRef}
      >
        <p style={{opacity: `${value ? 1 : 0}`}}>{label}</p>
        <LabelContainer onClick={() => setOpen(!open)}>
          <label>{labelValue(value) || label}</label>
          {open ? (
            <IconUp
              alt='arrow up'
              src={globalTheme === 'dark' ? darkArrow : lightArrow}
            />
          ) : (
            <IconDown
              alt='arrow down'
              src={globalTheme === 'dark' ? darkArrow : lightArrow}
            />
          )}
        </LabelContainer>
        {open && (
          <ItemsContainer>
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  onClick(name, option.value);
                  setOpen(!open);
                }}
              >
                {option.label}
              </li>
            ))}
            {enableOther && (
              <li
                onClick={() => {
                  if (other) {
                    onClick(name, other);
                  }
                }}
              >
                <Input
                  onChange={(e: any) => {
                    setOther(e.target.value);
                    onClick(name, e.target.value);
                  }}
                  type='text'
                  value={other}
                  placeHolder='Other'
                  expand
                ></Input>
              </li>
            )}
          </ItemsContainer>
        )}
      </DropdownContainer>
    </div>
  );
};

export default Dropdown;
