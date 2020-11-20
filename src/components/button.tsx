import React from "react";
import styled from "styled-components";

const DisabledButton = styled.div`
  background: grey;
`;

const Normalbutton = styled.button`
  background: #315a96;
  border-radius: 16px;
  border-style: none;
  font-size: 14px;
  font-family: "Work Sans";
  font-weight: 200;
  font-style: normal;
  font-weight: normal;
  padding: 8px 16px;
  color: white;
  margin-right: 5px;
`;
const Blackbutton = styled.button`
  background: #21273f;
  border-radius: 16px;
  border-style: none;
  font-size: 14px;
  font-family: "Work Sans";
  font-weight: 200;

  font-style: normal;
  font-weight: normal;
  padding: 8px 16px;
  color: white;
  margin-right: 5px;
`;

interface ButtonProps {
  disabled?: boolean;
  name: string;
  black?: boolean;
  link?: string;
}

const Button = (props: ButtonProps) => {
  if (props.disabled) {
    return <DisabledButton>Button</DisabledButton>;
  } else if (props.black) {
    return <Blackbutton>{props.name}</Blackbutton>;
  } else {
    return (
      <Normalbutton>
        <a href={props.link}>{props.name}</a>
      </Normalbutton>
    );
  }
};

export default Button;
