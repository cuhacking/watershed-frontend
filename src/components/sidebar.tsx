import React from 'react';
import styled from 'styled-components';
import {Link, useRouteMatch, useHistory} from 'react-router-dom';
import {useAuth} from '../hooks';
import {ReactComponent as WordLogo} from 'assets/img/word-and-year-logo-white.svg';
import {
  TilesIcon,
  CameraIcon,
  CalendarIcon,
  SuitcaseIcon,
  TrophyIcon,
  GalleryIcon,
  RanksIcon,
  GavelIcon,
  BellIcon,
  PencilIcon,
  GraphIcon,
  HundredIcon,
  ExitIcon,
} from '../assets/img/icons';

const Container = styled.div`
  position: relative;
  flex-shrink: 0;
  width: var(--sidebar-width);
  min-height: 100vh;
  position: fixed;

  background-color: var(--wineDark);
  color: var(--white);
`;

const StyledLogo = styled(WordLogo)`
  margin: 50px 30px;
`;

const StyledLink = styled(Link)<{selected?: boolean}>`
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px 32px;

  font-size: 1.125rem;

  transition: background-color 100ms ease-out;

  ${({selected}) =>
    selected
      ? `
          background-color: #ffffff22;
          font-weight: 600;

          &::before {
            display: block;
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            width: 4px;
            background-color: var(--white);
          } 
        `
      : `
          &:hover {
            background-color: #ffffff11;
          }
        `}

  svg {
    margin-right: 20px;
  }
`;

const Section = styled.div`
  margin-bottom: 50px;
`;

const SectionHeader = styled.h4`
  margin: 0;
  margin-bottom: 8px;
  padding-left: 32px;
  color: var(--vanilla);

  font-family: var(--primary-font);
  font-size: 1.25em;
  font-weight: 700;
`;

const SignOutButton = styled.button`
  background: none;
  padding: 0;
  border: none;
  font-family: var(--secondary-font);
  color: var(--white);

  position: absolute;
  bottom: 32px;
  display: flex;
  align-items: center;
  padding: 8px 32px;
  width: 100%;

  font-size: 1.125rem;

  transition: background-color 100ms ease-out;

  &:hover {
    background-color: #ffffff11;
    cursor: pointer;
  }

  svg {
    margin-right: 20px;
  }
`;

interface ButtonProps {
  icon: React.FC;
  children: React.ReactNode;
  link: string;
}

const Button = ({icon: Icon, children, link}: ButtonProps) => (
  <StyledLink
    to={link}
    selected={useRouteMatch({path: link, exact: true}) !== null}
  >
    <Icon />
    {children}
  </StyledLink>
);

const Sidebar = (props: any) => {
  const history = useHistory();
  const {signOut, user} = useAuth();

  const handleSignOut = async () => {
    await signOut();
    history.push('/');
  };

  const appendBase = (path: string) => `/dashboard${path}`;

  return (
    <Container {...props}>
      <Link to='/'>
        <StyledLogo />
      </Link>
      <Section>
        <Button icon={TilesIcon} link={appendBase('/')}>
          Dashboard
        </Button>
      </Section>
      <Section>
        <SectionHeader>EVENT</SectionHeader>
        <Button icon={CalendarIcon} link={appendBase('/schedule')}>
          Schedule
        </Button>
        <Button icon={SuitcaseIcon} link={appendBase('/sponsors')}>
          Sponsors
        </Button>
        <Button icon={TrophyIcon} link={appendBase('/challenges')}>
          Challenges
        </Button>
        <Button icon={GalleryIcon} link={appendBase('/submissions')}>
          Submissions
        </Button>
        <Button icon={RanksIcon} link={appendBase('/leaderboard')}>
          Leaderboard
        </Button>
      </Section>
      {user && user.role > 0 && (
        <Section>
          <SectionHeader>SPONSOR PAGES</SectionHeader>
          <Button icon={GavelIcon} link={appendBase('/sponsors/judging')}>
            Judging
          </Button>
        </Section>
      )}
      {user && user.role > 1 && (
        <Section>
          <SectionHeader>ORGANIZER PAGES</SectionHeader>
          <Button
            icon={BellIcon}
            link={appendBase('/admin/send-notifications')}
          >
            Send Notifications
          </Button>
          <Button icon={PencilIcon} link={appendBase('/admin/edit-schedule')}>
            Edit Schedule
          </Button>
          <Button icon={GraphIcon} link={appendBase('/admin/stats')}>
            Statistics
          </Button>
          <Button
            icon={HundredIcon}
            link={appendBase('/admin/generate-points')}
          >
            Generate Points
          </Button>
        </Section>
      )}
      <SignOutButton onClick={handleSignOut}>
        <ExitIcon />
        Sign Out
      </SignOutButton>
    </Container>
  );
};

export default Sidebar;
