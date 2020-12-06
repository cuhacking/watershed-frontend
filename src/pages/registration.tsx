import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/button'
import { colors, shadows } from '../shared/constants';
import darkDrop from '../assets/img/drop-dark.svg';

const theme = 'dark';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 4rem;
  max-width: 100%;
  min-width: 800px;
  border-radius: 16px;
  align-items: center;
  background-color: ${theme === 'dark' 
    ? colors.spaceGrey : colors.white };
  margin:auto;
  transition: box-shadow 300ms ease;
  box-shadow: ${shadows.hover};
/* 
  &:hover {
    box-shadow: ${shadows.hover}
  } */

  @media (max-width: 768px) {
    min-width: 0;
    padding: 1rem 2rem;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0rem;
`;

const InteractionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

function Registration() {
  const [step, setStep] = useState(0);

  const personalInformation = (
    <FormContainer>
      <h3>Personal information</h3>
    </FormContainer>
  );

  const currentStep = () => {
    switch(step) {
      case 0: return personalInformation;
    };
  };
 
  const actions = (
    <InteractionsContainer>
      <Button />
      <Button />
    </InteractionsContainer>
  );

  return (
    <Container>
      <img src={darkDrop} />
      {currentStep()}
      {actions}
    </Container>
  );
}

export default Registration;