import React, {useState} from 'react';
import {Helmet} from 'react-helmet';
import styled, {css} from 'styled-components';
import {Link, useHistory} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDiscord, faGithub} from '@fortawesome/free-brands-svg-icons';
import {ModalLayout} from '../../layouts';
import {Input, LoadingSymbol} from '../../components';
import {useAuth} from '../../hooks';

const LoginForm = styled.form`
  padding-top: 16px;
`;

const ErrorMessage = styled.p<{visible: boolean}>`
  color: var(--wineLight);
  font-size: 0.8em;
  margin-top: 0;
  opacity: ${({visible}) => (visible ? 1 : 0)};
`;

const OAuthButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8px 0;

  & > * {
    margin: 8px 0;
  }
`;

const buttonStyle = css`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;

  padding: 8px 16px;

  border: none;
  border-radius: calc(0.5em + 8px);

  font-size: 1em;
  font-family: var(--secondary-font);

  transition: box-shadow, 300ms ease, background-color 300ms ease,
    color 300ms ease;

  svg {
    margin-right: 8px;
  }

  @media only screen and (min-width: 700px) {
    &:hover {
      box-shadow: var(--hover);
      background-color: var(--spaceDark);
    }
  }
`;

const LoginButton = styled.button`
  ${buttonStyle}

  background-color :var(--snow);

  @media only screen and (min-width: 700px) {
    &:hover {
      cursor: pointer;
      color: var(--snow);
    }
  }
`;

const DiscordButton = styled.a`
  ${buttonStyle}
  min-width: 215px;
  background-color: #738adb;
`;

const GitHubButton = styled.a`
  ${buttonStyle}
  min-width: 215px;
  background-color: #171515;
`;

const OptionButtons = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

const OptionButton = styled(Link)`
  @media only screen and (min-width: 700px) {
    &:hover {
      text-decoration: underline;
    }
  }
`;

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
        {isLoading ? (
          <LoadingSymbol />
        ) : (
          <>
            <ErrorMessage visible={error !== null}>{error ?? '_'}</ErrorMessage>
            <LoginButton type='submit'>Log In</LoginButton>
          </>
        )}
      </LoginForm>
      <OAuthButtons>
        <strong>OR</strong>
        <DiscordButton href='/api/auth/discord'>
          <FontAwesomeIcon icon={faDiscord} />
          Sign in with Discord
        </DiscordButton>
        <GitHubButton href='/api/auth/github'>
          <FontAwesomeIcon icon={faGithub} />
          Sign in with GitHub
        </GitHubButton>
      </OAuthButtons>
      <OptionButtons>
        {/* <OptionButton to='/dashboard/sign-up'>
          I don't have an account
        </OptionButton> */}
        <OptionButton style={{marginTop: '1rem'}} to='/dashboard/forgot'>
          Reset password
        </OptionButton>
        {/* <OptionButton to='/dashboard/forgot-password'>
          I forgot my password.
        </OptionButton> */}
      </OptionButtons>
    </ModalLayout>
  );
};
