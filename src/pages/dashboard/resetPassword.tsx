import Input from '../../components/Input';
import Button from '../../components/AppButton';
import React, {useEffect, useReducer, useState} from 'react';
import {ModalLayout} from '../../layouts';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {Helmet} from 'react-helmet';
import {useAuth} from '../../hooks';
import {LoadingSymbol} from '../../components';

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

interface PasswordForm {
  password: string;
  confirmPassword: string;
}

const emptyForm: PasswordForm = {
  password: '',
  confirmPassword: '',
};

const formReducer = (state: PasswordForm, entry: any[]) => ({
  ...state,
  [entry[0]]: entry[1],
});

export default () => {
  const [resetToken, setResetToken] = useState('');
  const [resetComplete, setResetComplete] = useState(false);
  const [passwordForm, setPasswordForm] = useReducer(formReducer, emptyForm);
  const [resetError, setResetError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const {user} = useAuth();

  const formIsOk = (): boolean =>
    passwordForm.password !== '' &&
    passwordForm.confirmPassword === passwordForm.password;

  useEffect(() => {
    if (user) {
      history.push('/');
    }

    const url = window.location.search;
    const params = new URLSearchParams(url);
    const token = params.get('token');

    if (token) {
      setResetToken(token);
    } else {
      history.push('/');
    }
  }, []);

  const handleFormChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setPasswordForm([name, value]);
  };

  const finishReset = () => {
    setPasswordForm(['password', '']);
    setPasswordForm(['confirmPassword', '']);
    setIsLoading(false);
  };

  const submitNewPassword = () => {
    setIsLoading(true);

    const requestBody = {
      token: resetToken,
      password: passwordForm.password,
    };
    console.log(requestBody);
    fetch('/api/auth/performReset', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }).then((res) => {
      if (res.status === 200) {
        setResetComplete(true);
        finishReset();
      } else {
        setResetError(true);
        finishReset();
      }
    });
  };

  return (
    <ModalLayout>
      <Container>
        <Helmet>
          <title>Reset password</title>
        </Helmet>
        <h3>Enter your new password</h3>
        <PasswordForm>
          <Input
            onChange={handleFormChange}
            type='password'
            name='password'
            value={passwordForm.password}
            placeHolder='Password'
            displayLabel
            padded
            grow
            required={true}
          ></Input>
          <Input
            onChange={handleFormChange}
            type='password'
            name='confirmPassword'
            value={passwordForm.confirmPassword}
            placeHolder='Confirm password'
            displayLabel
            padded
            grow
            required={true}
            error={
              passwordForm.password === passwordForm.confirmPassword
                ? ''
                : `Passwords don't match`
            }
          ></Input>
          {isLoading && (
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <LoadingSymbol />
            </div>
          )}
          {resetComplete && (
            <b style={{marginBottom: '1rem'}}>Your password has been reset!</b>
          )}
          {resetError && (
            <b style={{marginBottom: '1rem', color: 'var(--wineDark)'}}>
              There was an error updating your password, please try again later
            </b>
          )}
          <Button
            style={{
              marginLeft: 'auto',
              marginRight: 0,
              marginTop: '1rem',
            }}
            disabled={!formIsOk()}
            onClick={(e: any) => {
              e.preventDefault();
              submitNewPassword();
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
