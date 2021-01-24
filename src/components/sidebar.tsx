import React from 'react';
import styled from 'styled-components';
import {Link, useRouteMatch} from 'react-router-dom';
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
} from '../assets/img/icons';

const Container = styled.div`
  flex-shrink: 0;
  width: 350px;
  min-height: 100vh;

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

const appendBase = (path: string) => `/dashboard${path}`;

interface ButtonProps {
  icon: React.FC;
  children: React.ReactNode;
  link: string;
}

const Button = ({icon: Icon, children, link}: ButtonProps) => (
  <StyledLink to={link} selected={useRouteMatch(link) !== null}>
    <Icon />
    {children}
  </StyledLink>
);

const Sidebar = () => {
  return (
    <Container>
      <StyledLogo />
      <Section>
        <Button icon={TilesIcon} link={appendBase('/')}>
          Dashboard
        </Button>
        <Button icon={CameraIcon} link={appendBase('/stage')}>
          Main Stage
        </Button>
      </Section>
      <Section>
        <SectionHeader>STUFF</SectionHeader>
        <Button icon={CalendarIcon} link={appendBase('/schedule')}>
          Schedule
        </Button>
        <Button icon={SuitcaseIcon} link={appendBase('/stage')}>
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
      <Section>
        <SectionHeader>(SPONSOR)</SectionHeader>
        <Button icon={GavelIcon} link={appendBase('/sponsors/judging')}>
          Judging
        </Button>
      </Section>
      <Section>
        <SectionHeader>(ADMIN)</SectionHeader>
        <Button icon={BellIcon} link={appendBase('/admin/send-notifications')}>
          Send Notifications
        </Button>
        <Button icon={PencilIcon} link={appendBase('/admin/edit-schedule')}>
          Edit Schedule
        </Button>
        <Button icon={GraphIcon} link={appendBase('/admin/stats')}>
          Statistics
        </Button>
        <Button icon={HundredIcon} link={appendBase('/admin/generate-points')}>
          Generate Points
        </Button>
      </Section>
    </Container>
  );
};

export default Sidebar;
