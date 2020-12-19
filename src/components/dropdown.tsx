import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { colors, shadows } from "../shared/constants";
import darkArrow from "../assets/img/arrow-down-dark.svg";
import lightArrow from "../assets/img/arrow-down-light.svg";
import { globalTheme, themeElement } from "../shared/theme";
import Input from "./Input";

const itemStyles = css`
  padding: 0.5rem 0;
  background-color: ${themeElement(colors.spaceGrey, colors.white)};
  width: 100%;
`;

const containerStyles = css`
  box-sizing: border-box;
  border-radius: 0.5rem;
  transition: box-shadow 300ms ease;
`;

const DropdownContainer = styled.div`
  ${containerStyles};
  cursor: pointer;
  display: flex;
  position: relative;
  width: 164px;
  max-width: 200px;
  border: solid 1px ${themeElement(colors.ikeaBlue, colors.snow)};
  color: ${themeElement(colors.white, colors.spaceDark)};
  height: min-content;

  & p {
    color: ${themeElement(colors.snow, colors.ikeaBlue)};
    position: absolute;
    transition: opacity 300ms ease;
    margin: -1rem 0 0 0.5rem;
    font-size: 12px;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      box-shadow: ${shadows.hover};
    }
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
  transform: rotate(180deg);
`;

const IconDown = styled.img`
  transform: rotate(0deg);
`;

const ItemsContainer = styled.div`
  ${containerStyles};
  ${itemStyles};
  position: absolute;
  top: 3rem;
  box-shadow: ${shadows.hover};
  z-index: 4;

  & li {
    padding: 0.5rem 0.5rem;
    list-style-type: none;

    &:hover {
      background-color: ${themeElement(colors.ikeaBlue, colors.snow)};
    }
  }
`;

interface DropdownProps {
  label: string;
  name: string;
  options: string[];
  value: string;
  enableOther?: boolean;
  onClick: Function;
  padded?: boolean;
}

const Dropdown = ({
  name,
  options,
  onClick,
  value,
  label,
  enableOther,
  padded,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [other, setOther] = useState("");
  const dropdownRef = useRef(null);

  function useOuterClick(ref: any) {
    useEffect(() => {
      const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };
  useOuterClick(dropdownRef);

  return (
    <div style={{ padding: `${padded ? "1.5rem" : 0}` }}>
      <DropdownContainer ref={dropdownRef}>
        <p style={{ opacity: `${value ? 1 : 0}` }}>{label}</p>
        <LabelContainer onClick={() => setOpen(!open)}>
          <label>{value || label}</label>
          {open ? (
            <IconUp src={globalTheme === "dark" ? darkArrow : lightArrow} />
          ) : (
            <IconDown src={globalTheme === "dark" ? darkArrow : lightArrow} />
          )}
        </LabelContainer>
        {open && (
          <ItemsContainer>
            {options.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  onClick(name, item);
                  setOpen(!open);
                }}
              >
                {item}
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
                  type="text"
                  value={other}
                  placeHolder="other"
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
