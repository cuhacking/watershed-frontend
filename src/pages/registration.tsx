import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/button'
import { colors, shadows } from '../shared/constants';

const theme = 'dark';

const Container = styled.div`
  display: flex;
  padding: 2rem;
  max-width: 1200px;
  border-radius: 8px;
  background-color: ${theme === 'dark' 
    ? colors.spaceGrey : colors.white };
  margin:auto;
  transition: box-shadow 300ms ease;
  box-shadow: ${shadows.primary};

  &:hover {
    box-shadow: ${shadows.hover}
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function Registration() {
  const [step, setStep] = useState(0);

  const personalInformation = () => {
    return (
      <FormContainer>
        <h3>Personal information</h3>
      </FormContainer>
    )
  }

  const currentStep = () => {
    switch(step) {
      case 0: return personalInformation();
    };
  };
 
  // const 

  return (
    <Container>
      {currentStep()}
    </Container>
  );
}

export default Registration;