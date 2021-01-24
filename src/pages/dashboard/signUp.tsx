import React, {useState} from 'react';
import {Helmet} from 'react-helmet';
import styled, {css} from 'styled-components';
import {Link, useHistory} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDiscord, faGithub} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {ModalLayout} from '../../layouts';
import {Input, LoadingSymbol} from '../../components';
import {useAuth} from '../../hooks';

const LoginForm = styled.form``;

const CreateAccountPrompt = styled.p`
  max-width: 300px;
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 1.2em;
`;

const ErrorMessage = styled.p<{visible: boolean}>`
  color: var(--wineLight);
  font-size: 0.8em;
  margin-top: 0;
  opacity: ${({visible}) => (visible ? 1 : 0)};
`;

const SignUpButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 32px 0;

  & > * {
    margin: 8px 0;
  }
`;

const buttonStyle = css`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;

  padding: 8px 16px;
  min-width: 215px;

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

const ContinueButton = styled.button`
  ${buttonStyle}
  min-width: unset;

  background-color: var(--snow);

  @media only screen and (min-width: 700px) {
    &:hover {
      cursor: pointer;
      color: var(--snow);
    }
  }
`;

const EmailButton = styled.button`
  ${buttonStyle}

  background-color: var(--snow);

  @media only screen and (min-width: 700px) {
    &:hover {
      cursor: pointer;
      color: var(--snow);
    }
  }
`;

const DiscordButton = styled.a`
  ${buttonStyle}
  background-color: #738adb;
`;

const GitHubButton = styled.a`
  ${buttonStyle}
  background-color: #171515;
`;

const ToLoginButton = styled(Link)`
  margin-top: 16px;

  @media only screen and (min-width: 700px) {
    &:hover {
      text-decoration: underline;
    }
  }
`;

const BackToOptionsButton = styled.button`
  margin-top: 32px;

  border: none;
  background: none;
  color: var(--coolWhite);

  font-size: 1em;
  font-family: var(--secondary-font);

  @media only screen and (min-width: 700px) {
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

export default () => {
  const [page, setPage] = useState<1 | 2>(1);

  return (
    <ModalLayout>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <CreateAccountPrompt>
        Create an account below to register for the hackathon!{' '}
      </CreateAccountPrompt>
      {page === 1 ? (
        <SignInOptions nextPage={() => setPage(2)} />
      ) : (
        <SignInWithEmail prevPage={() => setPage(1)} />
      )}
    </ModalLayout>
  );
};

const SignInOptions = (props: {nextPage: () => void}) => (
  <>
    <SignUpButtons>
      <EmailButton onClick={props.nextPage}>
        <FontAwesomeIcon icon={faEnvelope} />
        Sign up with Email
      </EmailButton>
      <DiscordButton href='/api/auth/discord'>
        <FontAwesomeIcon icon={faDiscord} />
        Sign in with Discord
      </DiscordButton>
      <GitHubButton href='/api/auth/github'>
        <FontAwesomeIcon icon={faGithub} />
        Sign in with GitHub
      </GitHubButton>
    </SignUpButtons>
    <ToLoginButton to='/dashboard/login'>
      I already have an account.
    </ToLoginButton>
  </>
);

const SignInWithEmail = (props: {prevPage: () => void}) => {
  const history = useHistory();
  const {signUp} = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    setLoading(true);
    setError(null);

    // Compare passwords
    if (passwordA !== passwordB) {
      setLoading(false);
      setError('Passwords do not match.');
      return;
    }

    // Create account
    switch (await signUp(email, passwordA)) {
      case 'ok':
        return history.push('/dashboard/registration');
      case 'expected-failure':
        setLoading(false);
        return setError('This email is already taken.');
      case 'error':
        setLoading(false);
        return setError('Something went wrong, please try again later.');
    }
  };

  return (
    <>
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
        {isLoading ? (
          <LoadingSymbol />
        ) : (
          <>
            <ErrorMessage visible={error !== null}>{error ?? '_'}</ErrorMessage>{' '}
            <ContinueButton type='submit'>Continue</ContinueButton>
          </>
        )}
      </LoginForm>
      <BackToOptionsButton onClick={props.prevPage}>
        Choose a different sign up method.
      </BackToOptionsButton>
    </>
  );
};
