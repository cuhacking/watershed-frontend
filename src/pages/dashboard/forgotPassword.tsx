import Input from '../../components/Input';
import Button from '../../components/AppButton';
import React, {useState} from 'react';
import styled from 'styled-components';
import {ModalLayout} from '../../layouts';
import {Helmet} from 'react-helmet';

const PasswordForm = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

export default () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleFormChange = (e: any) => {
    const value = e.target.value;
    setEmail(value);
  };

  const emailIsValid = (): boolean => {
    return email !== '';
  };

  const submitResetEmail = () => {
    const requestBody = {
      email,
    };
    fetch('/api/auth/reset', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    }).then((res) => {
      setEmailSent(true);
    });
  };

  return (
    <ModalLayout>
      <Helmet>Forgot password</Helmet>
      <h3>Enter the email linked to your cuHacking account</h3>
      <PasswordForm>
        <Input
          onChange={handleFormChange}
          type='email'
          name='email'
          value={email}
          placeHolder='Email'
          displayLabel
          padded
          grow
          required={true}
        ></Input>
      </PasswordForm>
      {emailSent && (
        <b style={{marginBottom: '1rem'}}>
          An email should arrive soon with instructions to reset your password
          if the email address is linked to an account
        </b>
      )}
      <div style={{
        width: '100%',
        display: 'flex'
      }}>
        <Button
          style={{
            marginLeft: 'auto',
            marginRight: 0,
          }}
          disabled={!emailIsValid()}
          onClick={() => submitResetEmail()}
          value='submit'
        >
          Submit
        </Button>
      </div>
    </ModalLayout>
  );
};
