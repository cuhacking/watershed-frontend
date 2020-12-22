import React, {useState} from 'react';
import {Helmet} from 'react-helmet';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {ModalLayout} from '../../layouts';
import {Input} from '../../components';

const LoginForm = styled.form``;

const ErrorMessage = styled.p`
  color: var(--wineDark);
`;

const SubmitButton = styled.button``;

const DiscordButton = styled.button``;

const BackButton = styled.button``;

export default () => {
  const [email, setEmail] = useState('');
  const [passwordA, setPasswordA] = useState('');
  const [passwordB, setPasswordB] = useState('');

  const handleFormChange = (e: any) => {};

  return (
    <ModalLayout>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <p>Create an account below to register for the hackathon! </p>
      <LoginForm>
        <Input
          onChange={handleFormChange}
          type='email'
          name='email'
          value={email}
          placeHolder='Email'
          displayLabel
          padded
          required={true}
        />
        <Input
          onChange={handleFormChange}
          type='password'
          name='password'
          value={passwordA}
          placeHolder='Password'
          displayLabel
          padded
          required={true}
        />
        <Input
          onChange={handleFormChange}
          type='password'
          name='confirmPassword'
          value={passwordB}
          placeHolder='Confirm Password'
          displayLabel
          padded
          required={true}
        />
        <ErrorMessage>This is a test error message.</ErrorMessage>
        <SubmitButton type='submit'>Continue</SubmitButton>
      </LoginForm>
      <BackButton>Choose a different sign up method.</BackButton>
    </ModalLayout>
  );
};
