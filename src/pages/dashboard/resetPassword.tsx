import Input from '../../components/Input';
import Button from '../../components/AppButton';
import React, {useEffect, useReducer, useState} from 'react';
import {Redirect} from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const ResetPasswordCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const PasswordForm = styled.form`
  display: flex;
  flex-direction: column;
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
  const [passwordForm, setPasswordForm] = useReducer(formReducer, emptyForm);

  const formIsOk = (): boolean =>
    passwordForm.password !== '' &&
    passwordForm.confirmPassword === passwordForm.password;

  useEffect(() => {
    try {
      const url = window.location.search;
      const params = new URLSearchParams(url);
      const token = params.get('token');

      if (token) {
        setResetToken(token);
      }
    } catch (err) {
      // redirect to home
    }
  }, []);

  const handleFormChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setPasswordForm([name, value]);
  };

  const submitNewPassword = () => {
    console.log('call backend api');
  };

  return (
    <Container>
      <ResetPasswordCard>
        <h3>Please enter your new password</h3>
        <PasswordForm>
          <Input
            onChange={handleFormChange}
            type='password'
            name='password'
            value={passwordForm.password}
            placeHolder='Last name'
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
            placeHolder='Last name'
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
          <Button
            disabled={!formIsOk}
            onClick={() => submitNewPassword()}
            value='submit'
          >
            Submit
          </Button>
        </PasswordForm>
      </ResetPasswordCard>
    </Container>
  );
};
