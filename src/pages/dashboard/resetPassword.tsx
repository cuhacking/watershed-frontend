import Input from '../../components/Input';
import Button from '../../components/AppButton';
import React, {useEffect, useReducer, useState} from 'react';
import {ModalLayout} from '../../layouts';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {Helmet} from 'react-helmet';

const PasswordForm = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 1rem;
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
  const history = useHistory();

  const formIsOk = (): boolean =>
    passwordForm.password !== '' &&
    passwordForm.confirmPassword === passwordForm.password;

  useEffect(() => {
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

  const submitNewPassword = () => {
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
      } else {
        setResetError(true);
      }
    });
  };

  return (
    <ModalLayout>
      <Helmet>Reset password</Helmet>
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
    </ModalLayout>
  );
};
