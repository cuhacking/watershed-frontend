import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: var(--wineDark);
  display: flex;
  padding: 1rem;
`;

const CheckInContainer = styled.div`
`;

const CheckIn = () => {
  const [step, setStep] = useState(0);

  return (
    <Container>
      <CheckInContainer>

      </CheckInContainer>
    </Container>
  );
};

export default CheckIn;
