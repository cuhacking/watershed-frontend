import React, {useState} from 'react';
import {Helmet} from 'react-helmet';
import styled from 'styled-components';
import {Link, useHistory} from 'react-router-dom';
import {ModalLayout} from '../../layouts';
import {Input, LoadingSymbol} from '../../components';
import {useAuth} from '../../hooks';

const LoginForm = styled.form``;

const ErrorMessage = styled.p<{visible: boolean}>`
  color: var(--wineDark);

  opacity: ${({visible}) => (visible ? 1 : 0)};
`;

const SubmitButton = styled.button``;

const OAuthButtons = styled.div`
  display: block;
`;

const DiscordButton = styled.a`
  display: block;
`;

const GitHubButton = styled.a`
  display: block;
`;

const OptionButtons = styled.div``;

const OptionButton = styled(Link)``;

export default () => {
  const history = useHistory();
  const {signIn} = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    setLoading(true);
    setError(null);

    switch (await signIn(email, password)) {
      case 'ok':
        setLoading(false);
        return history.replace('/dashboard');
      case 'expected-failure':
        setLoading(false);
        return setError('Your email or password is incorrect.');
      case 'error':
        setLoading(false);
        return setError('Something went wrong, please try again later.');
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
        <ErrorMessage visible={error !== null}>{error ?? 'sas'}</ErrorMessage>
        {isLoading ? (
          <LoadingSymbol />
        ) : (
          <SubmitButton type='submit'>Log In</SubmitButton>
        )}
      </LoginForm>
      <OAuthButtons>
        <strong>OR</strong>
        <DiscordButton href='/api/auth/discord'>
          Sign in with Discord
        </DiscordButton>
        <GitHubButton href='/api/auth/github'>Sign in with GitHub</GitHubButton>
      </OAuthButtons>{' '}
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
