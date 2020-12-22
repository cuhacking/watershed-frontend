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

const OptionButtons = styled.div``;

const OptionButton = styled(Link)``;

export default () => {
  const history = useHistory();
  const {user, signIn} = useAuth();
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormChange = (event: any) => {
    switch (event.target.name) {
      case 'email':
        return setEmail(event.target.value.trim());
      case 'password':
        return setPassword(event.target.value.trim());
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(false);

    const result = await signIn(email, password);

    if (result instanceof Error) {
      setError(true);
      // TODO: display "something went wrong"
    } else if (!result) {
      setError(true);
    } else {
      history.replace('/dashboard');
    }
  };

  return (
    <ModalLayout>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <h1>Welcome back!</h1>
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
          value={password}
          placeHolder='Password'
          displayLabel
          padded
          required={true}
        />
        <ErrorMessage visible={error}>Invalid email or password.</ErrorMessage>
        <SubmitButton type='submit'>Log In</SubmitButton>
      </LoginForm>
      {/* <DiscordButton>Sign in with Discord</DiscordButton> */}
      <OptionButtons>
        <OptionButton to='/dashboard/sign-up'>
          I don't have an account.
        </OptionButton>
        {/* <OptionButton to='/dashboard/forgot-password'>
          I forgot my password.
        </OptionButton> */}
      </OptionButtons>
    </ModalLayout>
  );
};
