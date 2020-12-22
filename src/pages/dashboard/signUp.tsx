import React, {useState} from 'react';
import {Helmet} from 'react-helmet';
import styled from 'styled-components';
import {Link, useHistory} from 'react-router-dom';
import {ModalLayout} from '../../layouts';
import {Input} from '../../components';
import {useAuth} from '../../hooks';

const LoginForm = styled.form``;

const ErrorMessage = styled.p<{visible: boolean}>`
  color: var(--wineDark);

  opacity: ${({visible}) => (visible ? 1 : 0)};
`;

const SubmitButton = styled.button``;

const DiscordButton = styled.button``;

const OptionButton = styled(Link)``;

export default () => {
  const history = useHistory();
  const {signUp} = useAuth();

  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [passwordA, setPasswordA] = useState('');
  const [passwordB, setPasswordB] = useState('');

  const handleFormChange = (event: any) => {
    switch (event.target.name) {
      case 'email':
        return setEmail(event.target.value.trim());
      case 'password':
        return setPasswordA(event.target.value.trim());
      case 'confirmPassword':
        return setPasswordB(event.target.value.trim());
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(false);

    // Compare passwords
    if (passwordA !== passwordB) {
      setError(true);
      return;
    }

    // Create account
    const result = await signUp(email, passwordA);

    if (result instanceof Error) {
      setError(true);
      // TODO: display "something went wrong"
    } else if (!result) {
      setError(true);
    } else {
      history.replace('/registration');
    }
  };

  return (
    <ModalLayout>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <p>Create an account below to register for the hackathon! </p>
      <LoginForm onSubmit={handleSubmit}>
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
        <ErrorMessage visible={error}>
          Either your passwords don't match or an account with that email
          already exists.
        </ErrorMessage>
        <SubmitButton type='submit'>Continue</SubmitButton>
      </LoginForm>
      <OptionButton to='/dashboard/login'>
        I want to log in instead.
      </OptionButton>
    </ModalLayout>
  );
};
