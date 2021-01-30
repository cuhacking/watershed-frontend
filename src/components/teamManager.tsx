import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import styled, {css} from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {Button, Input, LoadingSymbol} from '../components';
import {useDashboardInfo} from '../hooks';

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

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

const ActionBox = styled.div`
  ${glowingButton}
  margin-bottom: 20px;
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

const TeamList = styled.div`
  margin: 20px;
  width: 100%;
`;

const TeamMember = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  text-align: left;
  width: 100%;
  margin-bottom: 5px;
  span {
    color: var(--wine);
  }
`;

const InvitedMember = styled(TeamMember)`
  opacity: 0.5;
`;

const miniText = css`
  font-size: 0.75rem;
  text-align: right;
`;

const MiniButton = styled.button`
  ${normalizeButton}
  ${miniText}
  color: var(--wineLight);

  &:hover {
    text-decoration: underline;
  }
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

const Tooltip = styled.p`
  font-size: 0.75rem;
  text-align: left;
  margin: -5px 0 20px;
`;

const TeamManager = () => {
  const {
    createTeam,
    joinTeam,
    leaveTeam,
    sendInvite,
    revokeInvite,
    dashboard,
  } = useDashboardInfo();
  const [isLoading, setLoading] = useState(false);
  const [view, setView] = useState<'default' | 'createTeam' | 'invite'>(
    'default'
  );
  const [teamName, setTeamName] = useState('');
  const [inputError, setInputError] = useState<string>();
  const [username, setUsername] = useState('');

  const handleCreateTeam = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setInputError(undefined);

    if (teamName == '') {
      setLoading(false);
      return setInputError('Please enter a team name.');
    }

    if (teamName.length < 5) {
      setLoading(false);
      return setInputError('Minimum 5 characters.');
    }

    const success = await createTeam(teamName);

    if (success) {
      setView('default');
      setTeamName('');
    }

    setLoading(false);
  };

  const handleSubmitInvite = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setLoading(true);
    setInputError(undefined);

    if (username == '') {
      setLoading(false);
      return setInputError('No username provided.');
    }

    const success = await sendInvite(username);

    if (!success) {
      setLoading(false);
      return setInputError('Invalid username.');
    }

    setView('default');
    setUsername('');
    setLoading(false);
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingSymbol color='var(--wine)' />
      </LoadingContainer>
    );
  }

  switch (view) {
    case 'createTeam':
      return (
        <Container>
          <Card>
            <form onSubmit={handleCreateTeam}>
              <StyledInput
                onChange={(event: any) => setTeamName(event.target.value)}
                value={teamName}
                label='Team Name'
                name='teamName'
                error={inputError}
                displayLabel
                forceLabel
                required
              />

              <Button kind='button' color='var(--wineLight)'>
                Create Team
              </Button>
            </form>
            <TextButton onClick={() => setView('default')}>Cancel</TextButton>
          </Card>
        </Container>
      );
    case 'invite':
      return (
        <Container>
          <Card>
            <form onSubmit={handleSubmitInvite}>
              <StyledInput
                onChange={(event: any) => setUsername(event.target.value)}
                value={username}
                label='Email or Discord Username'
                name='username'
                error={inputError}
                displayLabel
                forceLabel
                required
              />
              <Tooltip>
                Email or Discord username of the user you would like to invite.
                <br />
                <br />
                Discord username must include four-digit tag. i.e. User#1234{' '}
              </Tooltip>
              <Button kind='button' color='var(--wineLight)'>
                Send Invite
              </Button>
            </form>
            <TextButton onClick={() => setView('default')}>Cancel</TextButton>
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
            {dashboard!.user.invites.length > 0 && (
              <Card style={{marginTop: 20}}>
                <Subtitle>Invites</Subtitle>
                <TeamList>
                  {dashboard!.user.invites.map((invite) => (
                    <TeamMember key={invite.uuid}>
                      {invite.teamName}
                      <MiniButton
                        onClick={async () => {
                          setLoading(true);
                          await joinTeam(invite.uuid);
                          setLoading(false);
                        }}
                      >
                        Join
                      </MiniButton>
                    </TeamMember>
                  ))}
                </TeamList>
              </Card>
            )}
          </Container>
        );
      }

      console.log('Dash: ', dashboard!.user.team);

      return (
        <Container>
          {/* <Link to='/dashboard/submit'>
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
          </Link> */}
          <Card>
            <EyebrowText>Team</EyebrowText>
            <Subtitle>{dashboard!.user.team.name}</Subtitle>
            <TeamList>
              <TeamMember>
                <div>
                  {dashboard!.user.firstName}
                  <span> (you)</span>
                </div>
                <MiniButton
                  onClick={async () => {
                    setLoading(true);
                    await leaveTeam();
                    setLoading(false);
                  }}
                >
                  Leave
                </MiniButton>
              </TeamMember>
              {dashboard!.user.team.members
                .filter((member) => member.uuid !== dashboard!.user.uuid)
                .map((member) => (
                  <TeamMember key={member.uuid}>
                    <div>
                      {member.name}
                      <span>@{member.discordUsername}</span>
                    </div>
                  </TeamMember>
                ))}
              {dashboard!.user.team.invites.map((invite) => (
                <InvitedMember key={invite.uuid}>
                  <div>
                    {invite.firstName}
                    {invite.discordUsername && (
                      <span>@{invite.discordUsername}</span>
                    )}
                  </div>
                  <MiniButton
                    onClick={async () => {
                      setLoading(true);
                      await revokeInvite(invite.uuid);
                      setLoading(false);
                    }}
                  >
                    Revoke
                  </MiniButton>
                </InvitedMember>
              ))}
            </TeamList>
            {dashboard!.user.team.members.length < 4 && (
              <Button
                kind='button'
                color='var(--wineLight)'
                action={() => setView('invite')}
              >
                Invite
              </Button>
            )}
          </Card>
        </Container>
      );
  }
};

export default TeamManager;
