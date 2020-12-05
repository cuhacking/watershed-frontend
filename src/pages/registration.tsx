import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/button'
import { colors } from '../shared/constants';

const theme = 'dark';

const Container = styled.div`
  display: flex;
  padding: 2rem;
  max-width: 1200px;
  border-radius: 8px;
  background-color: ${theme === 'dark' 
    ? colors.ikeaBlue : colors.white };
  margin:auto;
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
        
      </FormContainer>
    )
  }

  return (
    <Container>

      <h3>Personal information</h3>
    </Container>
  );
}

export default Registration;