import React from 'react';
import styled, {keyframes} from 'styled-components';
import {Redirect} from 'react-router-dom';
import {SidebarLayout} from '../../layouts';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import {useAuth} from '../../hooks';

const Spacer = styled.div`
  height: 10vh;
`;

const fade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const FormContainer = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  animation: ${fade} 0.2s cubic-bezier(0.33, 1, 0.68, 1) 1;
`;

const Title = styled.h1``;

const Input = styled.input`
  border: 0;
  height: 48px;
  border-bottom: 1px solid;
  margin-top: 16px;
  font-size: 1.1em;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 64px;
  background: linear-gradient(
      307.69deg,
      rgba(254, 205, 125, 0.5) 0%,
      rgba(255, 255, 255, 0) 96.5%
    ),
    linear-gradient(0deg, #89072e, #89072e);
  border: 0;
  border-radius: 8px;
  margin-bottom: 16px;
  cursor: pointer;
  color: var(--white);
  font-family: var(--secondary-font);
  font-size: 16px;
`;

export default () => {
  const {request, user} = useAuth();
  const [name, setName] = React.useState<string>('');

  const [result, setResult] = React.useState<string | null>(null);

  const send = () => {
    request('/api/points', {
      method: 'POST',
      body: JSON.stringify({value: parseInt(name)}),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.text())
      .then((text) => setResult(text));
  };

  if (user?.role !== 2) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <SidebarLayout>
      <Spacer />
      <FormContainer>
        <Title>Generate a Points Code</Title>
        <Input
          placeholder='Number of Points'
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
        />

        <SubmitButton onClick={() => send()}>Generate Points</SubmitButton>

        {result && <p>Your Code: {result}</p>}
      </FormContainer>
    </SidebarLayout>
  );
};
