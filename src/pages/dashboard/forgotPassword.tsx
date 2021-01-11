import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const ResetPasswordCard = styled.div`
  display: flex;
  flex-direction: column;
`;

const PasswordForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export default () => {
  const [resetToken, setResetToken] = useState('');

  useEffect(() => {
    try {
      const url = window.location.search;
      const params = new URLSearchParams(url);
      const token = params.get('token');

      if (token) {
        setResetToken(token);
      }
    } catch (err) {
      <Redirect to='/' />;
    }
  }, []);

  return (
    <Container>
      <ResetPasswordCard>
        <h3>Please enter your new password</h3>
        <PasswordForm></PasswordForm>
      </ResetPasswordCard>
    </Container>
  );
};
