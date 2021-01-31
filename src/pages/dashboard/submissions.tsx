import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {SidebarLayout} from '../../layouts';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import {useDashboardInfo} from '../../hooks';
import {LoadingSymbol} from '../../components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 6rem;
  animation: var(--page-animation);
`;

const Spacer = styled.div`
  height: 10vh;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProjectsDisplay = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 20px;
  grid-column-gap: 20px;

  padding: 20px 0;

  @media only screen and (min-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media only screen and (min-width: 1500px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media only screen and (min-width: 1800px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  @media only screen and (min-width: 2100px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
`;

const SubmitButton = styled(Link)`
  width: 100%;

  border-radius: 8px;
  border: none;
  padding: 16px;
  margin-top: 32px;

  background: var(--action-gradient);
  color: var(--white);

  text-align: center;
  font-size: 1.5rem;
  font-family: var(--primary-font);
  transition: 100ms ease-out;
  box-shadow: var(--card-shadow);

  &:hover {
    cursor: pointer;
    box-shadow: var(--card-shadow-hover);
  }
`;

const ProjectCard = styled(Link)<{cover: string}>`
  position: relative;
  overflow: hidden;

  width: 100%;
  height: 148px;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  border-radius: 8px;
  padding: 20px;

  background-color: var(--wine);
  background-size: cover;

  ${({cover}) =>
    cover
      ? `
  background: url(${cover})
  `
      : ``}

  color: var(--white) !important;
  transition: box-shadow 200ms;

  &:hover {
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
  }

  & h3,
  p {
    margin: 0;
    z-index: 2;
  }
`;

const ProjectOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75));
`;

interface ProjectPreview {
  name: string;
  team: string;
  repo: string;
  cover: string;
}

const Submissions = () => {
  const {dashboard} = useDashboardInfo();
  const [ableToSubmit, setAbleToSubmit] = useState(false);
  const [projects, setProjects] = useState<ProjectPreview[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/submission')
      .then((res) => res.json())
      .then((json) => {
        setProjects(json as ProjectPreview[]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    // hopefully nobody changes their local time
    if (dashboard) {
      const diff = Date.now() - Date.parse(dashboard.endTime);

      if (diff < dashboard.graceTime * 60000) {
        setAbleToSubmit(true);
      }
    }
  }, [dashboard]);

  return (
    <SidebarLayout>
      <Helmet
        titleTemplate={`%s — cuHacking 2021 Dashboard`}
        title='Submissions'
      />
      <Spacer />
      <Container>
        <Header>
          <h2>Submissions</h2>
          <label>Check out what other hackers have built.</label>
        </Header>
        {ableToSubmit && (
          <SubmitButton
            style={{
              color: 'var(--white)',
            }}
            to='/dashboard/submit'
          >
            {dashboard!.user.team && dashboard!.user.team.submission
              ? 'Re-submit'
              : 'Submit your hack!'}
          </SubmitButton>
        )}
        <ProjectsDisplay>
          {isLoading ? (
            <LoadingSymbol color='var(--wine)' />
          ) : (
            projects.map((project, index) => (
              <ProjectCard
                key={index}
                to={`/dashboard/submissions/${encodeURIComponent(
                  project.repo
                )}`}
                cover={project.cover}
              >
                <ProjectOverlay />
                <h3>{project.name}</h3>
                <p>{project.team}</p>
              </ProjectCard>
            ))
          )}
        </ProjectsDisplay>
        <Spacer />
      </Container>
    </SidebarLayout>
  );
};

export default Submissions;
