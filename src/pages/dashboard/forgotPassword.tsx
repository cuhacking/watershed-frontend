import Input from '../../components/Input';
import Button from '../../components/AppButton';
import React, {useState} from 'react';
import styled from 'styled-components';
import {ModalLayout} from '../../layouts';
import {Helmet} from 'react-helmet';

const PasswordForm = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 1rem;
`;

const Container = styled.div`
  width: 600px;

  @media (max-width: 769px) {
    width: 100%;
  }
`;

export default () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleFormChange = (e: any) => {
    const value = e.target.value;
    setEmail(value);
  };

  const emailIsValid = (): boolean => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email !== '' && emailRegex.test(String(email).toLowerCase());
  };

  const submitResetEmail = () => {
    const requestBody = {
      email,
    };
    fetch('/api/auth/reset', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }).then((res) => {
      setEmailSent(true);
      setEmail('');
    });
  };

  return (
    <ModalLayout>
      <Container>
        <Helmet>Forgot password</Helmet>
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
              marginTop: '1rem',
            }}
            disabled={!emailIsValid()}
            onClick={(e: any) => {
              e.preventDefault();
              submitResetEmail();
            }}
            value='submit'
          >
            Submit
          </Button>
        </PasswordForm>
      </Container>
    </ModalLayout>
  );
};
