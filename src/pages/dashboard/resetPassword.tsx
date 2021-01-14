import Input from '../../components/Input';
import Button from '../../components/AppButton';
import React, {useEffect, useReducer, useState} from 'react';
import {useHistory} from 'react-router-dom';
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
        'Content-type': 'application/json'
      },
      body: JSON.stringify(requestBody),
    }).then((res) => {
      if (res.status === 200) {
        setResetComplete(true);
      }
    });
  };

  return (
    <Container>
      <ResetPasswordCard>
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
        </PasswordForm>
        {resetComplete && (
          <b style={{marginBottom: '1rem'}}>
            Your password has been reset!
          </b>
        )}
        <Button
          style={{
            marginLeft: 'auto',
            marginRight: 0,
          }}
          disabled={!formIsOk()}
          onClick={() => submitNewPassword()}
          value='submit'
        >
          Submit
        </Button>
      </ResetPasswordCard>
    </Container>
  );
};
