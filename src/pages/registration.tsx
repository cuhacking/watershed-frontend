import React from "react";
import Button from "../components/button";
import styled from "styled-components";
import Navbar from "../components/registration/navbar";
import IconDark from "../assets/Icon Dark.svg";

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  flex-direction: column;
  font-style: "DM Sans";
  font-size: 26px;
`;
const Subtitle = styled.div`
  font-size: 14px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
`;

function Registration() {
  return (
    <div>
      <Navbar></Navbar>
      <Center>
        <img src={IconDark} />
        Welcome, hackers!
        <Subtitle>choose an option below to get started</Subtitle>
        <Buttons>
          <Button name="login" link="#"></Button>
          <Button name="register" />
          <Button name="login with discord" black />
        </Buttons>
      </Center>
    </div>
  );
}

export default Registration;
