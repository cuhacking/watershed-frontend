import Input from '../../components/Input';
import Button from '../../components/AppButton';
import React, {useState} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: var(--spaceDark);
  padding: 1rem;
`;

const ResetPasswordCard = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: auto;
  padding: 2rem;
  background-color: var(--spaceGrey);
  border-radius: 1rem;
  box-shadow: var(--hover);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PasswordForm = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

export default () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleFormChange = (e: any) => {
    const value = e.target.value;
    setEmail(value);
  };

  const emailIsValid = (): boolean => {
    return email !== '';
  };

  const submitResetEmail = () => {
    const requestBody = {
      email,
    };
    fetch('/api/auth/reset', {
      method: 'POSt',
      body: JSON.stringify(requestBody),
    }).then((res) => {
      setEmailSent(true);
    });
  };

  return (
    <Container>
      <ResetPasswordCard>
        <h3>Enter the email linked to your cuHacking account</h3>
        <PasswordForm>
          <Input
            onChange={handleFormChange}
            type='email'
            name='email'
            value={email}
            placeHolder='Email'
            displayLabel
            padded
            grow
            required={true}
          ></Input>
        </PasswordForm>
        {emailSent && (
          <b style={{marginBottom: '1rem'}}>
            An email should arrive soon with instructions to reset your password
            if the email address is linked to an account
          </b>
        )}
        <Button
          style={{
            marginLeft: 'auto',
            marginRight: 0,
          }}
          disabled={!emailIsValid()}
          onClick={() => submitResetEmail()}
          value='submit'
        >
          Submit
        </Button>
      </ResetPasswordCard>
    </Container>
  );
};
