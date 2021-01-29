import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import styled, {css} from 'styled-components';
import {HundredIcon} from '../assets/img/icons';
import {Button, Input, LoadingSymbol} from '../components';
import {useDashboardInfo} from '../hooks';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  & > * {
    width: 100%;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 8px;
  padding: 20px;
  background-color: var(--white);
  box-shadow: var(--card-shadow);
`;

const normalizeButton = css`
  background: none;
  border: none;
  padding: 0;
  font-family: var(--secondary-font);
  font-size: 1rem;

  &:hover {
    cursor: pointer;
  }
`;

const glowingButton = css`
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 20px;
  width: 100%;

  background: var(--action-gradient);
  color: var(--white);

  text-align: left;
  transition: 100ms ease-out;
  box-shadow: var(--card-shadow);

  &:hover {
    box-shadow: var(--card-shadow-hover);
  }

  svg {
    margin-right: 0.5em;
  }
`;

const ActionButton = styled.button`
  ${normalizeButton}
  ${glowingButton}
`;

const StyledInput = styled(Input)`
  margin: 10px 0 25px;

  label {
    color: var(--wine);
  }

  input {
    color: var(--indoor);
    border-bottom-color: var(--indoor);

    &:focus {
      border-bottom-color: var(--wine);
    }
  }
`;

const TextButton = styled.button`
  ${normalizeButton}

  margin-top: 15px;
  color: var(--wineLight);

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const TeamManager = () => {
  const {redeemPoints} = useDashboardInfo();
  const [isLoading, setLoading] = useState(false);
  const [view, setView] = useState<'default' | 'enterCode' | 'codeEntered'>(
    'default'
  );
  const [code, setCode] = useState('');
  const [inputError, setInputError] = useState<string>();
  const [pointsRedeemed, setPoints] = useState<number>();

  const handleSubmitCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setInputError(undefined);

    if (code == '') {
      setLoading(false);
      return setInputError('Please enter a code.');
    }

    const result = await redeemPoints(code);

    switch (result.status) {
      case 'success':
        setView('codeEntered');
        setPoints(result.value);
        break;
      case 'invalid':
        setInputError('Invalid code.');
        break;
      case 'redeemed':
        setInputError(`Code has been redeemed.`);
        break;
      case 'error':
        setInputError('Something went wrong.');
    }
    setLoading(false);
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingSymbol color='var(--wine)' />
      </Container>
    );
  }

  switch (view) {
    case 'enterCode':
      return (
        <Container>
          <Card>
            <form onSubmit={handleSubmitCode}>
              <StyledInput
                onChange={(event: any) => setCode(event.target.value)}
                value={code}
                label='Points Code'
                name='code'
                error={inputError}
                displayLabel
                forceLabel
                required
              />

              <Button kind='button' color='var(--wineLight)'>
                Redeem
              </Button>
            </form>
            <TextButton onClick={() => setView('default')}>Cancel</TextButton>
          </Card>
        </Container>
      );
    case 'codeEntered':
      return (
        <Container>
          <Card>
            <p>You received {redeemPoints} points!</p>
            <Button
              kind='button'
              color='var(--wineLight)'
              action={() => {
                setView('default');
                setPoints(undefined);
              }}
            >
              Awesome!
            </Button>
          </Card>
        </Container>
      );
    default:
      return (
        <Container>
          <ActionButton onClick={() => setView('enterCode')}>
            <HundredIcon />
            Redeem a points code
          </ActionButton>
        </Container>
      );
  }
};

export default TeamManager;
