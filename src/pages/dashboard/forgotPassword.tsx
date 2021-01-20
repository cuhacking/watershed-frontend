import Input from '../../components/Input';
import Button from '../../components/AppButton';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {ModalLayout} from '../../layouts';
import {Helmet} from 'react-helmet';
import {useAuth} from '../../hooks';
import {useHistory, Link} from 'react-router-dom';
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

export default () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tempEmail, setTempEmail] = useState('');
  const history = useHistory();
  const {user} = useAuth();

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  });

  const handleFormChange = (e: any) => {
    const value = e.target.value;
    setEmail(value);
  };

  const emailIsValid = (): boolean => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email !== '' && emailRegex.test(String(email).toLowerCase());
  };

  const submitResetEmail = () => {
    setIsLoading(true);

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
      setTempEmail(email);
      setIsLoading(false);
      setEmailSent(true);
      setEmail('');
    });
  };

  return (
    <ModalLayout>
      <Container>
        <Helmet>
          <title>Forgot password</title>
        </Helmet>
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
          {emailSent && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
              <b style={{marginBottom: '1rem'}}>
                An email will be sent to {tempEmail} with instructions to reset
                your password if it is linked to an account
              </b>
              <Link style={{color: 'var(--snow)'}} to='/'>
                <b>
                  Go back to home page
                </b>
              </Link>
            </div>
          )}
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '1rem',
            }}
          >
            <Button
              disabled={!emailIsValid()}
              onClick={(e: any) => {
                e.preventDefault();
                submitResetEmail();
              }}
              value='submit'
            >
              Submit
            </Button>
          </div>
        </PasswordForm>
      </Container>
    </ModalLayout>
  );
};
