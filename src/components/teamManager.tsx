import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import styled, {css} from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {Button, Input, LoadingSymbol} from '../components';
import {useDashboardInfo} from '../hooks';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 20px;
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
`;

const glowingButton = css`
  border-radius: 8px;
  padding: 20px;
  width: 100%;

  background: var(--action-gradient);
  color: var(--white);

  text-align: left;
  transition: 100ms ease-out;
  box-shadow: var(--card-shadow);

  &:hover {
    cursor: pointer;
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

const ActionBox = styled.div`
  ${glowingButton}
`;

const LargeActionText = styled.div`
  font-family: var(--primary-font);
  font-size: 2.25rem;
`;

const EyebrowText = styled.p`
  margin: 0;
  font-size: 0.75rem;
  color: var(--wine);
`;

const Subtitle = styled.h4`
  margin: 0;
  font-size: 1.4rem;
`;

const TeamList = styled.div``;

const TeamMember = styled.div`
  span {
    color: var(--wine);
  }
`;

const miniText = css`
  font-size: 0.75rem;
  text-align: right;
`;

const LeaveButton = styled.button`
  ${normalizeButton}
  ${miniText}
  color: var(--wineLight);
`;

const InvitedText = styled.div`
  ${miniText}
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
  const {createTeam, dashboard} = useDashboardInfo();
  const [isLoading, setLoading] = useState(false);
  const [view, setView] = useState<'default' | 'createTeam' | 'invite'>(
    'default'
  );
  const [teamName, setTeamName] = useState('');
  const [teamNameError, setTeamNameError] = useState<string>();
  const [username, setUsername] = useState('');

  const handleSubmitInvite = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setLoading(true);

    if (teamName == '') {
      setLoading(false);
      return setTeamNameError('Please enter a team name.');
    }

    if (teamName.length < 5) {
      setLoading(false);
      return setTeamNameError('Minimum 5 characters.');
    }

    const success = await createTeam(teamName);

    console.log(success);

    if (success) {
      setView('default');
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
    case 'createTeam':
      return (
        <Container>
          <Card>
            <form onSubmit={handleSubmitInvite}>
              <StyledInput
                onChange={(event: any) => setTeamName(event.target.value)}
                value={teamName}
                label='Team Name'
                name='teamName'
                error={teamNameError}
                displayLabel
                forceLabel
                required
              />

              <Button kind='button' color='var(--wineLight)'>
                Create Team
              </Button>
            </form>
            <TextButton>Cancel</TextButton>
          </Card>
        </Container>
      );
    case 'invite':
      return (
        <Container>
          <Card>
            <form onSubmit={handleSubmitInvite}>
              <StyledInput
                onChange={(event: any) => setTeamName(event.target.value)}
                value={teamName}
                label='Email or Discord Username'
                name='username'
                error={'asd'}
                displayLabel
                forceLabel
                required
              />

              <Button kind='button' color='var(--wineLight)'>
                Create Team
              </Button>
            </form>
            <TextButton>Cancel</TextButton>
          </Card>
        </Container>
      );
    default:
      if (dashboard!.user.team == null) {
        return (
          <Container>
            <ActionButton onClick={() => setView('createTeam')}>
              <FontAwesomeIcon icon={faPlus} size='1x' />
              Create Team
            </ActionButton>
          </Container>
        );
      }

      console.log('Dash: ', dashboard!.user.team);

      return (
        <Container>
          <Link to='/dashboard/submit'>
            <ActionBox>
              All done with hacking?
              <LargeActionText>
                Submit
                <br />
                your
                <br />
                hack!
              </LargeActionText>
            </ActionBox>
          </Link>
          <Card>
            <EyebrowText>Team</EyebrowText>
            <Subtitle>{dashboard!.user.team.name}</Subtitle>
            <TeamList>
              {/* <TeamMember >
                  {dashboard!.user.firstName}
                  <span>@{member.discordUsername}</span>
                  <LeaveButton onClick={() => {}}>Leave</LeaveButton>
                </TeamMember> */}
              {dashboard!.user.team.members.map((member) => (
                <TeamMember key={member.uuid}>
                  {member.name}
                  <span>@{member.discordUsername}</span>
                  <LeaveButton onClick={() => {}}>Leave</LeaveButton>
                </TeamMember>
              ))}
            </TeamList>
            {dashboard!.user.team.members.length < 4 && (
              <Button kind='button' color='var(--wineLight)'>
                Invite
              </Button>
            )}
          </Card>
        </Container>
      );
  }
};

export default TeamManager;
